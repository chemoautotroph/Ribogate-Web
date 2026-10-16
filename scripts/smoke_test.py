"""Exercise real customized folding, queued design, results and restart in isolation."""
import argparse
from datetime import datetime, timezone
import io
import json
import os
from pathlib import Path
import platform
import re
import secrets
import socket
import subprocess
import sys
import tempfile
import time
import zipfile

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
import requests


def check(condition, message):
    if not condition:
        raise RuntimeError(message)


def free_port():
    with socket.socket() as sock:
        sock.bind(('127.0.0.1', 0))
        return sock.getsockname()[1]


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--timeout', type=int, default=600)
    parser.add_argument('--report', type=Path, default=ROOT / 'smoke-test-report.json')
    args = parser.parse_args()
    report = {'timestamp_utc': datetime.now(timezone.utc).isoformat(),
              'python': platform.python_version(), 'platform': platform.platform(),
              'mail_sent': False, 'checks': [], 'passed': False}
    server = None
    temporary = tempfile.TemporaryDirectory(prefix='ribogate-smoke-')
    log_path = Path(temporary.name) / 'server.log'
    log = log_path.open('w', encoding='utf-8')
    try:
        from scripts.install_vienna import verify_binaries
        # Deliberately ignore private .env paths/keys; reproduction uses repository assets.
        binary_dir = ROOT / 'vienna_rna_binaries'
        manifest = verify_binaries(binary_dir)
        report['vienna_upstream_commit'] = manifest['upstream_commit']
        from WS.vienna import fold
        for large in (0, 1):
            for strands, sequence in ((1, 'GGGAAACCC'), (2, 'GGGAAA&UUUCCC')):
                constraint = ''.join('&' if base == '&' else '.' for base in sequence)
                result = fold([(sequence, constraint)], large, 37.0, strands, str(binary_dir))
                check(len(result) == 1, 'Customized ViennaRNA output could not be parsed')
        report['checks'].append('All four downloaded executables produced parseable structures and BPPMs')
        port = free_port()
        env = os.environ.copy()
        env.update(RIBOGATE_DATA_DIR=str(Path(temporary.name) / 'data'),
                   RIBOGATE_SECRET_KEY=secrets.token_hex(32),
                   RIBOGATE_HOST='127.0.0.1', RIBOGATE_PORT=str(port),
                   RIBOGATE_SERVER_NAME=f'127.0.0.1:{port}',
                   RIBOGATE_SEND_EMAILS='false', RIBOGATE_NUM_PROCESSES='2',
                   RIBOGATE_VIENNA_PATH=str(binary_dir), PYTHONUNBUFFERED='1')
        base = f'http://127.0.0.1:{port}'

        def start():
            process = subprocess.Popen([sys.executable, str(ROOT / 'runserver.py'),
                                        '--quick-ea=true', '--send-emails=false'],
                                       cwd=ROOT, env=env, stdout=log, stderr=log)
            deadline = time.monotonic() + 45
            while time.monotonic() < deadline:
                check(process.poll() is None, 'Server failed to start; see log')
                try:
                    if requests.get(base + '/login', timeout=2).status_code == 200:
                        return process
                except requests.RequestException:
                    pass
                time.sleep(0.3)
            process.kill()
            process.wait()
            raise RuntimeError('Server startup timed out')

        def stop(process):
            # The only target is the server process started by this test and its children.
            subprocess.run(['taskkill', '/PID', str(process.pid), '/T', '/F'],
                           capture_output=True, check=False)
            process.wait(timeout=20)

        server = start()
        session = requests.Session()
        session.trust_env = False
        email, password = 'smoke@example.invalid', secrets.token_urlsafe(24)
        check(session.get(base + '/TC', allow_redirects=False).status_code == 302,
              'Anonymous TC access was not redirected')
        check(session.post(base + '/signup', data={'email':email, 'password':password,
              'confirm_password':password}, allow_redirects=False).status_code == 302, 'Signup failed')
        check(session.post(base + '/login', data={'email':email, 'password':password},
              allow_redirects=False).status_code == 302, 'Login failed')
        check(session.get(base + '/TC').status_code == 200, 'Authenticated TC page failed')
        page = session.get(base + '/TC/request')
        token = re.search(r'name="csrf_token"[^>]*value="([^"]+)"', page.text)
        check(token is not None, 'No CSRF token in TC form')
        # A short but valid substrate reduces runtime while using real folding and mutations.
        downstream = 'AAGCGUCGUACGUAACGUCAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUAGCUA'
        form = {'csrf_token':token.group(1), 'action':'submit', 'client_step':'1',
                'wt_field':'AAA-' + 'GCG' * 5 + '-' + downstream,
                'mutant_field':'AAA-' + 'GCG' * 6 + '-' + downstream,
                'temperature_field':'37', 'target_environment':'in_vivo',
                'in_vivo_option':'ribozyme_only',
                'cut_sites_field':['GUC','AUC','UUC','AUA','GUA','CUC','UUA','AUU','GUU','CUA','CUU','UUU']}
        step1 = session.post(base + '/TC/process_submission', data=form)
        check(step1.status_code == 200 and 'value="2"' in step1.text, 'TC validation step 1 failed')
        form['client_step'] = '2'
        submitted = session.post(base + '/TC/process_submission', data=form, allow_redirects=False)
        check(submitted.status_code == 302, 'TC submission failed')
        deadline = time.monotonic() + args.timeout
        job = None
        while time.monotonic() < deadline:
            response = session.get(base + '/TC/jobs_summary_json', timeout=10)
            check(response.status_code == 200, 'Job status endpoint failed')
            jobs = response.json()
            if jobs:
                job = jobs[0]
                if job['status'] == 'Completed':
                    break
            check(server.poll() is None, 'Server exited while designing')
            time.sleep(1)
        check(job is not None and job['status'] == 'Completed', 'TC design did not complete before timeout')
        report['checks'].append('Signup, login, CSRF-validated two-step TC submission and scheduler completion')
        job_id = job['id']
        details = session.get(base + f'/TC/job_details?id={job_id}')
        check(details.status_code == 200, 'Result HTML failed')
        data = session.get(base + f'/TC/job_details?id={job_id}', headers={'Accept':'application/json'})
        check(data.status_code == 200, 'Result JSON failed')
        records = data.json()[0]
        check(len(records) > 0, 'No debug designs returned')
        structure_page = session.get(base + records[0]['link'])
        check(structure_page.status_code == 200, 'Structure HTML failed')
        from urllib.parse import urlsplit, parse_qs
        query = parse_qs(urlsplit(records[0]['link']).query)
        query = {name:values[0] for name, values in query.items()}
        query.update(sub_app='TC', state='0')
        structure = session.get(base + '/structures_JSON', params=query)
        check(structure.status_code == 200 and len(structure.json()) == 9, 'Structure JSON failed')
        query['state'] = '1'
        check(session.get(base + '/structures_JSON', params=query).status_code == 200,
              'Changing hybridization state failed')
        # Check every referenced stylesheet/script, not just the HTML response code.
        for page in (details, structure_page):
            for path in set(re.findall(r'(?:src|href)=[\"\'](/static/[^\"\']+)', page.text)):
                check(session.get(base + path).status_code == 200, 'Missing static asset: ' + path)
                if path.endswith('.css'):
                    from urllib.parse import urljoin
                    stylesheet = session.get(base + path).text
                    for asset in re.findall(r'url\([\"\']?([^\"\')]+)', stylesheet):
                        if asset.startswith(('data:', 'http:', 'https:', '//', '#')):
                            continue
                        asset_url = urljoin(base + path, asset)
                        check(session.get(asset_url).status_code == 200, 'Missing CSS image/font: ' + asset)
        workbook = session.get(base + f'/csv?id={job_id}')
        check(workbook.status_code == 200, 'Excel download failed')
        with zipfile.ZipFile(io.BytesIO(workbook.content)) as archive:
            check('xl/workbook.xml' in archive.namelist(), 'Download is not an XLSX workbook')
        report['checks'].append('Nonempty results, structure HTML/JSON/state changes, static assets and valid XLSX export')
        report['tc_debug_results'] = len(records)
        stop(server)
        server = start()
        fresh = requests.Session()
        fresh.trust_env = False
        fresh.post(base + '/login', data={'email':email, 'password':password})
        restored = fresh.get(base + '/TC/jobs_summary_json').json()
        check(restored[0]['status'] == 'Completed', 'Completed job not preserved after restart')
        check(fresh.get(base + f'/csv?id={job_id}').status_code == 200, 'Restored export failed')
        report['checks'].append('Server restart preserves user, completed job and downloadable results')
        report['passed'] = True
    except Exception as error:
        report['error'] = str(error)
        raise
    finally:
        if server is not None and server.poll() is None:
            subprocess.run(['taskkill', '/PID', str(server.pid), '/T', '/F'], capture_output=True)
            server.wait(timeout=20)
        log.close()
        if not report['passed']:
            # Logs belong to the isolated test account, not real users or mail credentials.
            report['server_log_tail'] = log_path.read_text(encoding='utf-8', errors='replace')[-12000:]
        args.report.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
        print('Smoke test ' + ('PASSED' if report['passed'] else 'FAILED') + ': ' + str(args.report))
        temporary.cleanup()


if __name__ == '__main__':
    main()
