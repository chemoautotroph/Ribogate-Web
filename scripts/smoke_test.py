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
import signal
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
    parser.add_argument('--lifecycle', action='store_true')
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
        # Parent-side imports must also work when the installed source is read-only.
        os.environ['RIBOGATE_DATA_DIR'] = str(Path(temporary.name) / 'parent-data')
        os.environ['RIBOGATE_SECRET_KEY'] = secrets.token_hex(32)
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
        prefix = '/tricleaver'
        env.update(RIBOGATE_BASE_PATH=prefix, RIBOGATE_PRODUCTION='true' if os.name != 'nt' else 'false',
                   RIBOGATE_URL_SCHEME='http', RIBOGATE_ENABLE_TRUTHSEQER='false',
                   RIBOGATE_STORE_JOBS_DAYS='14', OPENBLAS_NUM_THREADS='1', OMP_NUM_THREADS='1')
        origin = f'http://127.0.0.1:{port}'
        base = origin + prefix

        def csrf(client, path='/login'):
            page=client.get(base+path)
            token=re.search(r'name="csrf_token"[^>]*value="([^\"]+)"',page.text)
            check(token is not None, 'Missing CSRF token: '+path)
            return token.group(1)

        def post(client, path, data):
            data=dict(data,csrf_token=csrf(client))
            return client.post(base+path,data=data,allow_redirects=False)


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
            if os.name == 'nt':
                subprocess.run(['taskkill','/PID',str(process.pid),'/T','/F'],capture_output=True,check=False)
            else:
                process.terminate()
            process.wait(timeout=20)

        server = start()
        session = requests.Session()
        session.trust_env = False
        email, password = 'smoke@example.invalid', secrets.token_urlsafe(24)
        check(session.get(base + '/TC', allow_redirects=False).status_code == 302,
              'Anonymous TC access was not redirected')
        check(post(session, '/signup', {'email':email, 'password':password,
              'confirm_password':password}).status_code == 302, 'Signup failed')
        check(post(session, '/login', {'email':email, 'password':password}).status_code == 302, 'Login failed')
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
        structure_page = session.get(origin + records[0]['link'])
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
            for path in set(re.findall(r'(?:src|href)=[\"\'](/tricleaver/static/[^\"\']+)', page.text)):
                check(session.get(origin + path).status_code == 200, 'Missing static asset: ' + path)
                if path.endswith('.css'):
                    from urllib.parse import urljoin
                    stylesheet = session.get(origin + path).text
                    for asset in re.findall(r'url\([\"\']?([^\"\')]+)', stylesheet):
                        if asset.startswith(('data:', 'http:', 'https:', '//', '#')):
                            continue
                        asset_url = urljoin(origin + path, asset)
                        check(session.get(asset_url).status_code == 200, 'Missing CSS image/font: ' + asset)
        workbook = session.get(base + f'/csv?id={job_id}')
        check(workbook.status_code == 200, 'Excel download failed')
        with zipfile.ZipFile(io.BytesIO(workbook.content)) as archive:
            check('xl/workbook.xml' in archive.namelist(), 'Download is not an XLSX workbook')
        report['checks'].append('Nonempty results, structure HTML/JSON/state changes, static assets and valid XLSX export')
        report['tc_debug_results'] = len(records)
        outsider=requests.Session()
        outsider.trust_env=False
        check(outsider.post(base+'/signup',data={'email':'other@example.invalid','password':password,'confirm_password':password}).status_code==400,'Signup accepted missing CSRF')
        for path in (f'/csv?id={job_id}',f'/TC/job_details?id={job_id}', '/structures_JSON?job='+str(job_id)):
            check(outsider.get(base+path,allow_redirects=False).status_code==302,'Anonymous result access')
        post(outsider,'/signup',{'email':'other@example.invalid','password':password,'confirm_password':password})
        post(outsider,'/login',{'email':'other@example.invalid','password':password})
        for path in (f'/csv?id={job_id}',f'/TC/job_details?id={job_id}', '/structures_JSON?job='+str(job_id)):
            check(outsider.get(base+path,allow_redirects=False).status_code==404,'Cross-user result access')
        check(post(outsider,'/TC/jobs_summary_json',{'job_id_to_delete':job_id}).status_code==404,'Cross-user cancellation')
        check(session.post(base+'/TC/jobs_summary_json',data={'job_id_to_delete':job_id}).status_code==400,'Cancellation accepted missing CSRF')
        check(session.get(base+'/TS').status_code==404,'Unfinished TS route exposed')
        check(session.get(base+'/debug_novelty').status_code==404,'Debug route exposed')
        check(outsider.get(base+'/csv?id=999999').status_code==404,'Invalid result id')
        check(requests.get(origin+'/login').status_code==404,'App served outside mount point')
        check(requests.get(base,allow_redirects=False).status_code==308,'Missing mount redirect')
        for target in ('https://example.invalid/','//example.invalid/','/ifold'):
            response=post(outsider,'/login',{'email':'other@example.invalid','password':password,'next':target})
            check(response.headers.get('Location') not in (target,), 'Unsafe login redirect')
        check('/tricleaver/' in job['link'],'Unprefixed job URL')
        report['checks'].append('Production WSGI mount, CSRF, ownership, cancellation protection, redirect confinement and disabled debug/TS routes')

        stop(server)
        server = start()
        fresh = requests.Session()
        fresh.trust_env = False
        post(fresh, '/login', {'email':email, 'password':password})
        restored = fresh.get(base + '/TC/jobs_summary_json').json()
        check(restored[0]['status'] == 'Completed', 'Completed job not preserved after restart')
        check(fresh.get(base + f'/csv?id={job_id}').status_code == 200, 'Restored export failed')
        report['checks'].append('Server restart preserves user, completed job and downloadable results')
        if args.lifecycle and os.name != 'nt':
            def submit(client):
                data=dict(form, client_step='1', csrf_token=csrf(client,'/TC/request'))
                response=client.post(base+'/TC/process_submission',data=data)
                check(response.status_code==200,'Lifecycle validation failed')
                data['client_step']='2'
                response=client.post(base+'/TC/process_submission',data=data,allow_redirects=False)
                check(response.status_code==302,'Lifecycle submission failed')
                return max(item['id'] for item in client.get(base+'/TC/jobs_summary_json').json())

            def wait_status(client, ident, wanted, seconds=90):
                until=time.monotonic()+seconds
                while time.monotonic()<until:
                    rows=client.get(base+'/TC/jobs_summary_json').json()
                    row=next((item for item in rows if item['id']==ident),None)
                    status=row['status'] if row else 'Absent'
                    if status==wanted: return
                    time.sleep(.3)
                raise AssertionError('Job %s: expected %s, saw %s'%(ident,wanted,status))

            def worker_group():
                output=subprocess.check_output(['ps','-eo','pid,ppid,pgid,stat'],text=True)
                return [int(row.split()[2]) for row in output.splitlines()[1:]
                        if int(row.split()[1])==server.pid]

            def no_live_group(groups):
                for _ in range(30):
                    output=subprocess.check_output(['ps','-eo','pgid,stat'],text=True)
                    if not any(int(row.split()[0]) in groups and not row.split()[1].startswith('Z')
                               for row in output.splitlines()[1:]): return
                    time.sleep(.2)
                raise AssertionError('Worker descendants survived shutdown')

            ident=submit(fresh)
            wait_status(fresh,ident,'Running')
            groups=worker_group()
            check(bool(groups),'No running worker found')
            check(post(fresh,'/TC/jobs_summary_json',{'job_id_to_delete':ident}).status_code==200,'Cancel failed')
            wait_status(fresh,ident,'Absent')
            no_live_group(groups)
            report['checks'].append('Running-job cancellation removes its Linux process group')

            ident=submit(fresh)
            wait_status(fresh,ident,'Running')
            groups=worker_group()
            stop(server)
            no_live_group(groups)
            server=start()
            post(fresh,'/login',{'email':email,'password':password})
            wait_status(fresh,ident,'Completed',args.timeout)
            report['checks'].append('Interrupted running job resumes after restart; previous descendants are gone')

            stop(server)
            env['RIBOGATE_MAX_JOB_SECONDS']='1'
            server=start()
            post(fresh,'/login',{'email':email,'password':password})
            ident=submit(fresh)
            wait_status(fresh,ident,'Timed out')
            time.sleep(2)
            check(not worker_group(),'Timed-out worker still running')
            next_ident=submit(fresh)
            wait_status(fresh,next_ident,'Timed out')
            report['checks'].append('Durable runtime deadline terminates the job and releases the queue')
        report['passed'] = True
    except Exception as error:
        report['error'] = str(error)
        raise
    finally:
        if server is not None and server.poll() is None:
            stop(server)
        log.close()
        if not report['passed']:
            # Logs belong to the isolated test account, not real users or mail credentials.
            report['server_log_tail'] = log_path.read_text(encoding='utf-8', errors='replace')[-12000:]
        args.report.write_text(json.dumps(report, indent=2) + '\n', encoding='utf-8')
        print('Smoke test ' + ('PASSED' if report['passed'] else 'FAILED') + ': ' + str(args.report))
        temporary.cleanup()


if __name__ == '__main__':
    main()
