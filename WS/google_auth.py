"""Google OIDC sign-in; identities and sessions belong only to this application."""
import hashlib
import os
import posixpath
import re
import secrets
import time
from urllib.parse import unquote, urlsplit

from flask import Blueprint, abort, current_app, flash, redirect, render_template, request, session, url_for
from flask_login import current_user, login_fresh, login_required, login_user
from sqlalchemy import delete, func
from sqlalchemy.exc import IntegrityError

from . import db
from .models import GoogleIdentity, GoogleLoginAttempt, User

google_auth = Blueprint('google_auth', __name__)
DISCOVERY_URL = 'https://accounts.google.com/.well-known/openid-configuration'
ATTEMPT_SECONDS = 600


def configure_google_oauth(app):
    client_id = os.environ.get('RIBOGATE_GOOGLE_CLIENT_ID', '').strip()
    client_secret = os.environ.get('RIBOGATE_GOOGLE_CLIENT_SECRET', '').strip()
    if bool(client_id) != bool(client_secret):
        raise ValueError('Set both RIBOGATE_GOOGLE_CLIENT_ID and RIBOGATE_GOOGLE_CLIENT_SECRET.')
    app.config['GOOGLE_LOGIN_ENABLED'] = bool(client_id and client_secret)
    if not app.config['GOOGLE_LOGIN_ENABLED']:
        return
    scheme, host = app.config['PREFERRED_URL_SCHEME'], app.config['SERVER_NAME']
    if scheme != 'https' and (scheme != 'http' or host.split(':')[0] not in ('localhost', '127.0.0.1')):
        raise ValueError('Google sign-in requires HTTPS except on localhost.')
    from authlib.integrations.flask_client import OAuth
    oauth = OAuth(app)
    app.extensions['tricleaver_google'] = oauth.register(
        name='google', client_id=client_id, client_secret=client_secret,
        server_metadata_url=DISCOVERY_URL,
        client_kwargs={'scope': 'openid email profile', 'code_challenge_method': 'S256', 'timeout': 10},
    )
    # Construct from trusted deployment settings, never forwarded/request headers.
    app.config['GOOGLE_CALLBACK_URL'] = (
        f"{scheme}://{host}{app.config['APPLICATION_ROOT'].rstrip('/')}/auth/google/callback"
    )


def safe_next(value):
    if not isinstance(value, str) or len(value) > 2048:
        return url_for('main.index')
    try:
        parsed = urlsplit(value)
    except ValueError:
        return url_for('main.index')
    prefix = current_app.config['APPLICATION_ROOT'].rstrip('/')
    decoded_path = unquote(parsed.path)
    if (parsed.scheme or parsed.netloc or not value.startswith(prefix + '/')
            or value.startswith('//') or '\\' in value
            or '\\' in decoded_path
            or not (posixpath.normpath(decoded_path) + '/').startswith(prefix + '/')
            or any(ord(c) < 32 or ord(c) == 127 for c in value + decoded_path)):
        return url_for('main.index')
    return value


def digest(value):
    return hashlib.sha256(value.encode('utf-8')).hexdigest()


def provider():
    if not current_app.config.get('GOOGLE_LOGIN_ENABLED'):
        abort(404)
    return current_app.extensions['tricleaver_google']


def fail(message='Google sign-in could not be completed. Please try again.'):
    db.session.rollback()
    flash(message, 'login_fail')
    return redirect(url_for('google_auth.account' if current_user.is_authenticated else 'auth.login'))


@google_auth.get('/account')
@login_required
def account():
    identity = GoogleIdentity.query.filter_by(user_id=current_user.id).first()
    return render_template('account.html', identity=identity, title='TriCleaver account')


@google_auth.post('/auth/google/start')
def start():
    google = provider()
    linking_user = None
    if current_user.is_authenticated:
        if not current_user.password or not login_fresh():
            return fail('Sign in with your password again before linking Google.')
        if GoogleIdentity.query.filter_by(user_id=current_user.id).first():
            return fail('This TriCleaver account already has Google sign-in linked.')
        linking_user = current_user.id
    state = secrets.token_urlsafe(32)
    binding = session.setdefault('_google_binding', secrets.token_urlsafe(32))
    # A new attempt replaces this browser's previous one and removes expired attempts.
    db.session.execute(delete(GoogleLoginAttempt).where(
        (GoogleLoginAttempt.expires_at < time.time()) | (GoogleLoginAttempt.binding_hash == digest(binding))))
    for key in list(session):
        if key.startswith('_state_google_'):
            session.pop(key)
    attempt = GoogleLoginAttempt(state_hash=digest(state), binding_hash=digest(binding),
        expires_at=time.time() + ATTEMPT_SECONDS, user_id=linking_user,
        next_path=safe_next(request.form.get('next')))
    db.session.add(attempt)
    db.session.commit()
    try:
        return google.authorize_redirect(current_app.config['GOOGLE_CALLBACK_URL'],
                                         state=state, prompt='select_account')
    except Exception as error:
        # Exceptions may include authorization codes, tokens or client secrets.
        # Only record the type; never log provider response bodies or request URLs.
        current_app.logger.warning('Google authorization start failed (%s)', type(error).__name__)
        db.session.execute(delete(GoogleLoginAttempt).where(GoogleLoginAttempt.state_hash == digest(state)))
        db.session.commit()
        return fail()


def resolve_identity(claims, linking_user):
    subject, email = claims.get('sub'), claims.get('email')
    if (claims.get('email_verified') is not True or not isinstance(subject, str)
            or not 1 <= len(subject) <= 255 or not isinstance(email, str)
            or len(email) > 100 or not re.fullmatch(r'[^\s@<>]+@[^\s@<>]+\.[^\s@<>]+', email)):
        raise ValueError('Google did not supply a verified identity.')
    email = email.lower()
    identity = GoogleIdentity.query.filter_by(subject=subject).first()
    same_email = User.query.filter(func.lower(User.email) == email).first()
    if linking_user is not None:
        user = db.session.get(User, linking_user)
        if not user or not user.password or user.email.lower() != email:
            raise ValueError('Choose the Google account with the same email as your TriCleaver account.')
        if identity and identity.user_id != user.id:
            raise ValueError('This Google account is already linked to another TriCleaver account.')
        existing = GoogleIdentity.query.filter_by(user_id=user.id).first()
        if existing and existing.subject != subject:
            raise ValueError('This TriCleaver account already has Google sign-in linked.')
    elif identity:
        user = db.session.get(User, identity.user_id)
        if not user:
            raise ValueError('The linked TriCleaver account is unavailable.')
        if same_email and same_email.id != user.id:
            raise ValueError('This Google email is already used by another TriCleaver account.')
        user.email = email
    elif same_email:
        raise ValueError('This email already has a TriCleaver account. Sign in with your password, '
                         'then open Account to link Google.')
    else:
        user = User(email=email, name=str(claims.get('name') or 'Google user')[:1000],
                    password=None, confirmed=True)
        db.session.add(user)
        db.session.flush()
    if not identity:
        identity = GoogleIdentity(subject=subject, user_id=user.id, email=email)
        db.session.add(identity)
    identity.email = email
    user.confirmed = True
    db.session.commit()
    return user


@google_auth.get('/auth/google/callback')
def callback():
    google = provider()
    state, binding = request.args.get('state', ''), session.get('_google_binding', '')
    if not state or len(state) > 256 or not binding:
        return fail('Google sign-in expired or was not started in this browser. Please try again.')
    # Consume atomically before exchanging the code: simultaneous/replayed callbacks fail.
    claimed = db.session.execute(delete(GoogleLoginAttempt).where(
        GoogleLoginAttempt.state_hash == digest(state),
        GoogleLoginAttempt.binding_hash == digest(binding),
        GoogleLoginAttempt.expires_at >= time.time(),
    ).returning(GoogleLoginAttempt.user_id, GoogleLoginAttempt.next_path)).first()
    db.session.commit()
    if claimed is None:
        return fail('Google sign-in expired or was already used. Please try again.')
    linking_user, next_path = claimed
    if ((linking_user is not None and (not current_user.is_authenticated
            or current_user.id != linking_user or not login_fresh()))
            or (linking_user is None and current_user.is_authenticated)):
        session.pop('_state_google_' + state, None)
        return fail('Your sign-in session changed. Please start Google sign-in again.')
    try:
        # Authlib verifies state, PKCE, signature, issuer, audience, expiry and nonce.
        token = google.authorize_access_token(claims_options={
            'iss': {'essential': True, 'values': ['https://accounts.google.com', 'accounts.google.com']},
            'aud': {'essential': True}, 'exp': {'essential': True},
            'iat': {'essential': True}, 'sub': {'essential': True}, 'nonce': {'essential': True},
        }, leeway=30)
        if not token.get('id_token'):
            raise ValueError('Missing Google ID token')
        claims = token['userinfo']
        if claims.get('iss') not in ('https://accounts.google.com', 'accounts.google.com'):
            raise ValueError('Unexpected issuer')
    except Exception as error:
        session.pop('_state_google_' + state, None)
        current_app.logger.warning('Google authorization callback failed (%s)', type(error).__name__)
        return fail()
    try:
        user = resolve_identity(claims, linking_user)
    except ValueError as error:
        return fail(str(error))
    except IntegrityError:
        return fail('This Google account or email is already linked. Please sign in again.')
    # Provider tokens remain local to this request; only the application user ID is retained.
    current_app.session_interface.regenerate(session)
    session.clear()
    session['_remember'] = 'clear'
    login_user(user, remember=False, fresh=True)
    if linking_user is not None:
        flash('Google sign-in is now linked to your TriCleaver account.', 'signup_success')
        return redirect(url_for('google_auth.account'))
    return redirect(safe_next(next_path))
