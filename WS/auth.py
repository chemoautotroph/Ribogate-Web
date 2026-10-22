from flask import Blueprint, render_template, redirect, url_for, request, flash
from werkzeug.security import generate_password_hash, check_password_hash
from flask_login import login_user, logout_user, login_required, current_user
from .models import User
from . import db
from datetime import datetime
from urllib.parse import urlsplit
import re
from flask import session
from markupsafe import Markup, escape
from itsdangerous import URLSafeTimedSerializer
from .email import send_email
from WS import app
#from flask import session #Needed if we want to use session variable in this module
login_serializer = URLSafeTimedSerializer(app.config['SECRET_KEY']) ####For email confirmation


auth = Blueprint('auth', __name__)

@auth.route('/login')
def login():
    return render_template('login.html')

@auth.route('/signup')
def signup():
    return render_template('signup.html')

@auth.route('/login', methods=['POST'])
def login_post():
    email = request.form.get('email')
    password = request.form.get('password', '')
    remember = True if request.form.get('remember') else False

    user = User.query.filter_by(email=email).first()

    #Check if the user actually exists
    #Take the user-supplied password, hash it, and compare it to the hashed password in the database
    if not user or not check_password_hash(user.password, password):
        flash('Please check your login details and try again.', 'login_fail')
        return redirect(url_for('auth.login')) # if the user doesn't exist or password is wrong, reload the page

    if not user.confirmed:
        resend_url = url_for('auth.resend_confirmation', email=email, _external=True)
        print("resend_url", resend_url)
        flash(Markup('Please confirm your account. <a href="{}">Resend confirmation email.</a>').format(resend_url), 'login_fail')
        return redirect(url_for('auth.login')) # if the user doesn't exist or password is wrong, reload the page
    
    app.session_interface.regenerate(session)
    session.clear()
    login_user(user, remember=remember) #Iif the above check passes, then we know the user has the right credentials

    next_url = request.form.get('next') #If the user came by clicking on the TC or TS button, redirect them to appropriate service
    if next_url:
        parsed = urlsplit(next_url)
        prefix = app.config['APPLICATION_ROOT'].rstrip('/')
        if not parsed.netloc and not parsed.scheme and next_url.startswith(prefix + '/') and not next_url.startswith('//') and chr(92) not in next_url:
            return redirect(next_url)

    #If the user clicked on login page directly, return them to home page
    return redirect(url_for('main.index'))

def send_confirmation_email(user):
    token = login_serializer.dumps(user.email, salt='email-confirm-salt')
    confirm_url = url_for('auth.confirm_email', token=token, _external=True)
    #confirm_url = app.config["CUSTOM_URL_NAME"] + url_for('auth.confirm_email', token=token, _external=False) #!!!!!!!!!!!! Required for Concordia

    html_content = '''
    <html>
    <body>
        <p>Dear User,</p>
        <p>Thank you for registering with Ribogate! Please confirm your email address by clicking the link below:</p>
        <a href="{confirm_url}">Confirm Account</a>
        <p>This link will expire in 24 hours.</p>
        <p>You are receiving this email because you recently signed up for a ribogate account.</p>
        <p>Ribogate is a web service that allows you to design switchable ribozymes.</p>
        <p>If you did not sign up for a Ribogate account, please disregard this message.</p>
        <p>Best regards,</p>
        <p>The Ribogate Team</p>
    </body>
    </html>
    '''
    html_content = html_content.format(confirm_url=confirm_url)
    recipient_email = str(user.email) 
    subject = 'Confirm your ribogate account'
    send_email(html_content, subject, recipient_email)

@auth.route('/signup', methods=['POST'])
def signup_post():
    email = request.form.get('email')
    #name = request.form.get('name') #Kharma doesn't want name as input
    password = request.form.get('password', '')
    confirm_password = request.form.get('confirm_password')
    if not email or not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', email) or len(email)>100 or not 8<=len(password)<=128:
        flash('Enter a valid email and a password between 8 and 128 characters.', 'password_mismatch')
        return redirect(url_for('auth.signup'))

    if password != confirm_password:
        flash('Passwords do not match', 'password_mismatch') #The 2nd entry 'password_mismatch' is used by HTML to differentiate between the two types of messages since they are processed differently on the client side
        return redirect(url_for('auth.signup'))

    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database

    if user: # if a user is found, we want to redirect back to signup page so user can try again
        flash('Email address already exists', 'email_exists')
        return redirect(url_for('auth.signup'))

    #Create new user.
    new_user = User(email=email, name="dummy_name", password=generate_password_hash(password, method='pbkdf2:sha256'))

    if app.config['SEND_EMAILS']: 
        send_confirmation_email(new_user)
        flash('Sign up successful! Please check your email to confirm your account. It may take a few minutes to receive the email. If you do not see it, please check your spam folder.', 'signup_success')
    else:
        flash('Sign up successful!', 'signup_success')
        new_user.confirmed = True
    db.session.add(new_user)
    db.session.commit()



    return redirect(url_for('auth.login'))

@auth.route('/resend_confirmation', methods=['GET','POST'])
def resend_confirmation():
    if request.method == 'GET':
        return render_template('resend_confirmation.html', email=request.args.get('email',''))
    email = request.form.get('email')
    user = User.query.filter_by(email=email).first() # if this returns a user, then the email already exists in database
    if user:
        send_confirmation_email(user)
        flash('Confirmation email resent. Please check your email to confirm your account. It may take a few minutes to receive the email. If you do not see it, please check your spam folder.', 'signup_success')
    else:
        flash('User not found. Confirmation email not sent.', 'login_fail')


    return redirect(url_for('auth.login'))

@auth.route('/confirm/<token>')
def confirm_email(token):
    try:
        email = login_serializer.loads(
            token,
            salt='email-confirm-salt',
            max_age=60*60*24  # Token expires after 24 hours
        )
    except:
        flash('The confirmation link is invalid or has expired.', 'login_fail')
        return redirect(url_for('auth.login'))
    
    user = User.query.filter_by(email=email).first_or_404()
    if user.confirmed:
        flash('Account already confirmed.', 'signup_success')
    else:
        user.confirmed = True
        db.session.commit()
        flash('You have confirmed your account. Thanks!', 'signup_success')
    return redirect(url_for('auth.login'))


@auth.route('/reset_password_request', methods=['GET', 'POST'])
def reset_password_request():
    if request.method == 'POST': #This route will behave differently based on whether the page was accessed via GET (by clicking on link) or POST (by submitting form)
        email = request.form.get('email')
        user = User.query.filter_by(email=email).first()
        if user:
            token = login_serializer.dumps(email, salt='password-reset-salt')
            reset_url = url_for('auth.reset_password', token=token, _external=True)         
            recipient_email = str(user.email)
            send_password_reset_email(recipient_email, reset_url)

            flash('Please check your email for a link to reset your password. It may take a few minutes to receive the email. If you do not see it, please check your spam folder.', 'signup_success')
        else:
            flash('Email address not found', 'login_fail')
        
        return redirect(url_for('auth.login'))
    
    return render_template('reset_password_request.html')

@auth.route('/reset_password/<token>', methods=['GET', 'POST'])
def reset_password(token):
    try:
        email = login_serializer.loads(
            token,
            salt='password-reset-salt',
            max_age=60*60*24  #Token expires after 24 hours
        )
    except:
        flash('The reset link is invalid or has expired.', 'login_fail')
        return redirect(url_for('auth.reset_password_request'))
    
    if request.method == 'POST':
        password = request.form.get('password', '')
        confirm_password = request.form.get('confirm_password')

        if password != confirm_password or not 8 <= len(password) <= 128:
            flash('Passwords do not match. Please try again.', 'password_mismatch')
            return redirect(url_for('auth.reset_password', token=token))
        
        user = User.query.filter_by(email=email).first()
        user.password = generate_password_hash(password, method='pbkdf2:sha256')
        db.session.commit()

        flash('Your password has been updated.', 'signup_success')
        return redirect(url_for('auth.login'))

    return render_template('reset_password.html', token=token)

def send_password_reset_email(email, url):
    html_content = f'''
    <html>
    <body>
        <p>Hello,</p>
        <p>To reset your password, click the following link:</p>
        <a href="{url}">Reset Password</a>
        <p>If you did not request a password reset, please ignore this email.</p>
    </body>
    </html>
    '''
    subject = 'Password Reset Request'
    send_email(html_content, subject, email)

@auth.route('/unconfirmed')
@login_required
def unconfirmed():
    if current_user.confirmed:
        return redirect(url_for('main.index'))
    return 'Please confirm your account!'

@auth.route('/logout', methods=['POST'])
@login_required
def logout():
    logout_user()
    session.clear()
    return redirect(url_for('main.index'))
