import os
from smtp2go.core import Smtp2goClient
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from WS import app


def validate_email_config():
    if not app.config.get('SEND_EMAILS', False):
        return
    service = os.environ.get('RIBOGATE_EMAIL_SERVICE', 'sendgrid').lower()
    names = {'sendgrid': 'SENDGRID_API_KEY', 'smtp2go': 'SMTP2GO_API_KEY'}
    if service not in names:
        raise ValueError('RIBOGATE_EMAIL_SERVICE must be sendgrid or smtp2go')
    if not os.environ.get(names[service]):
        raise ValueError(names[service] + ' is required when email is enabled')
    if '@' not in os.environ.get('RIBOGATE_EMAIL_FROM', ''):
        raise ValueError('Set RIBOGATE_EMAIL_FROM to a verified sender address')

def send_email(html_content, subject, recipient_email):
    if not app.config.get('SEND_EMAILS', False):
        return
    validate_email_config()
    service = os.environ.get('RIBOGATE_EMAIL_SERVICE', 'sendgrid').lower()
    if app.config['EMAIL_DEBUG']:
        recipient_email = app.config['ADMIN_EMAIL']

    if service == 'smtp2go':
        client = Smtp2goClient(api_key=os.environ['SMTP2GO_API_KEY'])
        payload = {
        'sender': os.environ.get('RIBOGATE_EMAIL_FROM', 'no-reply@localhost'),
        'recipients': [recipient_email],
        'subject': subject,
        'html': html_content}

        response = client.send(**payload)
        if not response.success:
            raise RuntimeError('SMTP2GO rejected the email; check provider account settings')
        return response

    elif service == 'sendgrid':
        message = Mail(
            from_email=os.environ.get('RIBOGATE_EMAIL_FROM', 'no-reply@localhost'),
            to_emails=recipient_email,
            subject=subject,
            html_content=html_content)

        return SendGridAPIClient(os.environ['SENDGRID_API_KEY']).send(message)
