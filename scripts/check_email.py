"""Check configured email credentials using read-only provider endpoints; sends no email."""
import json
import os
from pathlib import Path
import sys
import urllib.error
import urllib.request

sys.path.insert(0, str(Path(__file__).resolve().parents[1]))
import runtime  # Load the private .env without displaying its contents.


def main():
    configured = 0
    failed = False
    for service, name in (('sendgrid','SENDGRID_API_KEY'), ('smtp2go','SMTP2GO_API_KEY')):
        key = os.environ.get(name)
        if not key:
            continue
        configured += 1
        if service == 'sendgrid':
            request = urllib.request.Request('https://api.sendgrid.com/v3/scopes',
                headers={'Authorization':'Bearer ' + key})
        else:
            request = urllib.request.Request('https://api.smtp2go.com/v3/allowed_senders/view',
                data=b'{}', headers={'X-Smtp2go-Api-Key':key, 'Content-Type':'application/json'})
        try:
            with urllib.request.urlopen(request, timeout=30) as response:
                data = json.load(response)
            if service == 'sendgrid':
                print('SendGrid: authentication OK; mail.send permission:', 'mail.send' in data.get('scopes', []))
            elif data.get('data', {}).get('error'):
                print('SMTP2GO: provider reported an error; check account permissions')
                failed = True
            else:
                print('SMTP2GO: authentication and sender-configuration query OK')
        except urllib.error.HTTPError as error:
            print(service + ': HTTP ' + str(error.code) + '; authentication or endpoint permissions need attention')
            failed = True
        except (urllib.error.URLError, TimeoutError):
            print(service + ': network request failed; credential validity not determined')
            failed = True
    if not configured:
        raise SystemExit('No email keys configured in .env/environment')
    print('No email was sent. Actual delivery also depends on sender verification and account limits.')
    if failed:
        raise SystemExit(1)


if __name__ == '__main__':
    main()
