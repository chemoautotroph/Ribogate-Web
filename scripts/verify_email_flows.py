"""Verify notification adapters and job links without sending email."""
import os
from pathlib import Path
import re
import secrets
import sys
import tempfile
from unittest.mock import Mock, patch
from urllib.parse import urlsplit

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))


def main():
    with tempfile.TemporaryDirectory(prefix='ribogate-email-test-') as directory:
        # Isolate test data and override every credential before application imports.
        os.environ.update(RIBOGATE_DATA_DIR=directory, RIBOGATE_SECRET_KEY=secrets.token_hex(32),
                          RIBOGATE_BASE_PATH='/tricleaver', RIBOGATE_URL_SCHEME='http',
                          RIBOGATE_GOOGLE_CLIENT_ID='', RIBOGATE_GOOGLE_CLIENT_SECRET='',
                          SENDGRID_API_KEY='test-placeholder', SMTP2GO_API_KEY='test-placeholder',
                          RIBOGATE_EMAIL_FROM='sender@example.invalid', RIBOGATE_EMAIL_SERVICE='sendgrid')
        from runserver import configure_app
        from WS import app, db
        from WS.email import send_email
        configure_app(['--server-name=127.0.0.1:8000', '--send-emails=true'])
        app.config['TESTING'] = True
        with app.app_context():
            db.create_all()
        try:
            with patch('WS.email.SendGridAPIClient') as provider:
                send_email('<p>test</p>', 'test', 'recipient@example.invalid')
                assert provider.return_value.send.call_count == 1
            os.environ['RIBOGATE_EMAIL_SERVICE'] = 'smtp2go'
            with patch('WS.email.Smtp2goClient') as provider:
                provider.return_value.send.return_value = Mock(success=True)
                send_email('<p>test</p>', 'test', 'recipient@example.invalid')
                assert provider.return_value.send.call_args.kwargs['sender'] == 'sender@example.invalid'
                provider.return_value.send.return_value = Mock(success=False)
                try:
                    send_email('<p>test</p>', 'test', 'recipient@example.invalid')
                except RuntimeError:
                    pass
                else:
                    raise AssertionError('Provider rejection was not reported')
            from WS.models import User, Jobs, GoogleIdentity
            from WS.scheduler import send_job_completion_email
            with app.app_context(), patch('WS.scheduler.send_email') as outbox:
                user=User(email='mailtest@example.invalid',name='Mail test',password=None,confirmed=True)
                db.session.add(user)
                db.session.flush()
                db.session.add(GoogleIdentity(user_id=user.id,subject='mail-test-google',email=user.email))
                job=Jobs(user_id=user.id,type='TC',status='Completed')
                db.session.add(job)
                db.session.commit()
                send_job_completion_email(job)
                assert outbox.call_count==1
                body, subject, recipient=outbox.call_args.args
                job_url=re.search(r'href="([^"]+)"',body).group(1)
                assert job_url=='http://127.0.0.1:8000/tricleaver/TC/job_details?id='+str(job.id)
                assert recipient==user.email
            client=app.test_client()
            for path in ('/reset_password_request','/resend_confirmation','/confirm/token','/reset_password/token'):
                assert client.get('/tricleaver'+path).status_code==404
            print('Notification adapters, rejection handling and mounted job links PASSED; no email sent.')
        finally:
            with app.app_context():
                db.session.remove()
                db.engine.dispose()


if __name__ == '__main__':
    main()
