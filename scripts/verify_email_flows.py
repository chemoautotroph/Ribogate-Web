"""Verify provider adapters, confirmation and reset links without sending email."""
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
            client = app.test_client()
            password = secrets.token_urlsafe(24)
            with patch('WS.auth.send_email') as outbox:
                result = client.post('/signup', data={'email':'mailtest@example.invalid',
                    'password':password, 'confirm_password':password})
                assert result.status_code == 302 and outbox.call_count == 1
                body = outbox.call_args.args[0]
                confirm_url = re.search(r'href="([^"]+)"', body).group(1)
                assert confirm_url.startswith('http://127.0.0.1:8000/confirm/')
                assert client.get(urlsplit(confirm_url).path).status_code == 302
                client.post('/reset_password_request', data={'email':'mailtest@example.invalid'})
                reset_url = re.search(r'href="([^"]+)"', outbox.call_args.args[0]).group(1)
                assert reset_url.startswith('http://127.0.0.1:8000/reset_password/')
                replacement = secrets.token_urlsafe(24)
                assert client.post(urlsplit(reset_url).path, data={'password':replacement,
                    'confirm_password':replacement}).status_code == 302
                assert client.post('/login', data={'email':'mailtest@example.invalid',
                    'password':replacement}).status_code == 302
                assert client.get('/TC').status_code == 200
            print('Email adapters, rejection handling, confirmation and password reset PASSED; no email sent.')
        finally:
            with app.app_context():
                db.session.remove()
                db.engine.dispose()


if __name__ == '__main__':
    main()
