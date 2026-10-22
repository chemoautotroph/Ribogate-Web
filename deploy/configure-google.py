"""Import a Google Web client JSON into TriCleaver's root-only environment file."""
import argparse
import json
import os
from pathlib import Path
import re
import tempfile

CALLBACK = 'https://kharmalab.cloud/tricleaver/auth/google/callback'


def load_client(source):
    document = json.loads(source.read_text(encoding='utf-8-sig'))
    client = document.get('web', {}) if isinstance(document, dict) else {}
    if not isinstance(client, dict):
        raise ValueError('Expected a Google OAuth Web application client JSON.')
    client_id, secret = client.get('client_id', ''), client.get('client_secret', '')
    if not isinstance(client_id, str) or not re.fullmatch(r'[A-Za-z0-9_.-]+\.apps\.googleusercontent\.com', client_id):
        raise ValueError('Expected a Google OAuth Web application client JSON.')
    if not isinstance(secret, str) or not re.fullmatch(r'[A-Za-z0-9_-]{8,256}', secret):
        raise ValueError('Missing or invalid Google client secret.')
    if CALLBACK not in client.get('redirect_uris', []):
        raise ValueError('The Web client JSON must include this redirect URI: ' + CALLBACK)
    return {'RIBOGATE_GOOGLE_CLIENT_ID': client_id, 'RIBOGATE_GOOGLE_CLIENT_SECRET': secret}


def write_environment(environment, values):
    lines = environment.read_text().splitlines()
    lines = [line for line in lines if line.split('=', 1)[0] not in values]
    lines.extend(key + '=' + value for key, value in values.items())
    fd, temporary = tempfile.mkstemp(prefix='.google-env-', dir=environment.parent)
    try:
        with os.fdopen(fd, 'w') as stream:
            stream.write('\n'.join(lines) + '\n')
            stream.flush()
            os.fsync(stream.fileno())
        os.chmod(temporary, 0o600)
        os.replace(temporary, environment)
    finally:
        if os.path.exists(temporary):
            os.unlink(temporary)


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('client_json', type=Path)
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    values = load_client(args.client_json)
    if args.check_only:
        print('Google Web client JSON and TriCleaver callback validated; no secret displayed.')
        return
    if os.geteuid() != 0:
        raise SystemExit('Run with sudo to configure /etc/tricleaver/environment.')
    write_environment(Path('/etc/tricleaver/environment'), values)
    print('Google client configured for TriCleaver. Restart tricleaver-web to activate it.')


if __name__ == '__main__':
    try:
        main()
    except (ValueError, OSError):
        # Never include a JSON parse fragment or secret in console output.
        raise SystemExit('Could not import Google client JSON. Check the Web client type, callback URI and file permissions.')
