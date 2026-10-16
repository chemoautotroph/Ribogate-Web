import os
from smtp2go.core import Smtp2goClient
from sendgrid import SendGridAPIClient
from sendgrid.helpers.mail import Mail
from WS import app
api_keys = dict() #!!! HARCODED KEYS. BAD.
api_keys["SMTP2GO"] = os.environ.get("SMTP2GO_API_KEY", "")
api_keys["SendGrid"] = os.environ.get("SENDGRID_API_KEY", "")

#service = "SMTP2GO"
service = "SendGrid"

def send_email(html_content, subject, recipient_email):
    if app.config['EMAIL_DEBUG']:
        recipient_email = app.config['ADMIN_EMAIL']

    if service == "SMTP2GO":
        client = Smtp2goClient(api_key=api_keys["SMTP2GO"]) 
        payload = {
        'sender': os.environ.get('RIBOGATE_EMAIL_FROM', 'no-reply@localhost'),
        'recipients': [recipient_email],
        'subject': subject,
        'html': html_content}

        response = client.send(**payload)

    elif service == "SendGrid":
        message = Mail(
            from_email=os.environ.get('RIBOGATE_EMAIL_FROM', 'no-reply@localhost'),
            to_emails=recipient_email,
            subject=subject,
            html_content=html_content)

        sg = SendGridAPIClient(api_keys["SendGrid"])
        try:
            response = sg.send(message)
        except:
            print("Unable to send email")
