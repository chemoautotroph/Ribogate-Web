"""Deployment boundaries shared by the development and production entrypoints."""
import os
from collections import defaultdict, deque
import time
from flask import abort, request, session, redirect, url_for, flash
from flask_login import current_user
from flask_wtf.csrf import CSRFProtect
from werkzeug.wrappers import Response


class PathPrefix:
    def __init__(self, application, prefix):
        self.application, self.prefix = application, prefix

    def __call__(self, environ, start_response):
        path = environ.get('PATH_INFO', '')
        if path == self.prefix:
            return Response(status=308, headers={'Location': self.prefix + '/'})(environ, start_response)
        if not path.startswith(self.prefix + '/'):
            return Response('Not found', status=404)(environ, start_response)
        environ['SCRIPT_NAME'] = self.prefix
        environ['PATH_INFO'] = path[len(self.prefix):]
        return self.application(environ, start_response)


def configure_hosting(app):
    from .models import Jobs, User
    prefix = os.environ.get('RIBOGATE_BASE_PATH', '').rstrip('/')
    if prefix and (not prefix.startswith('/') or any(c not in '/abcdefghijklmnopqrstuvwxyz0123456789-_' for c in prefix)):
        raise ValueError('Invalid RIBOGATE_BASE_PATH')
    app.config.update(APPLICATION_ROOT=prefix or '/', SESSION_COOKIE_NAME='tricleaver_session',
        SESSION_COOKIE_PATH=prefix or '/', SESSION_COOKIE_HTTPONLY=True, SESSION_COOKIE_SAMESITE='Lax',
        SESSION_COOKIE_SECURE=app.config['PREFERRED_URL_SCHEME']=='https',
        REMEMBER_COOKIE_NAME='tricleaver_remember', REMEMBER_COOKIE_PATH=prefix or '/',
        REMEMBER_COOKIE_HTTPONLY=True, REMEMBER_COOKIE_SAMESITE='Lax',
        REMEMBER_COOKIE_SECURE=app.config['PREFERRED_URL_SCHEME']=='https',
        MAX_CONTENT_LENGTH=128*1024, MAX_FORM_MEMORY_SIZE=128*1024,
        ENABLE_TRUTHSEQER=os.environ.get('RIBOGATE_ENABLE_TRUTHSEQER','true').lower()=='true',
        MAX_JOB_SECONDS=int(os.environ.get('RIBOGATE_MAX_JOB_SECONDS','21600')),
        MAX_SEQUENCE_LENGTH=int(os.environ.get('RIBOGATE_MAX_SEQUENCE_LENGTH','12000')),
        MAX_QUEUE_LENGTH=int(os.environ.get('RIBOGATE_MAX_QUEUE_LENGTH','32')),
        TRUSTED_HOSTS=[app.config['SERVER_NAME'].split(':')[0]])
    if app.extensions.get('ribogate_hosting'):
        return
    from .google_auth import configure_google_oauth
    configure_google_oauth(app)
    app.extensions['ribogate_hosting'] = True
    if prefix:
        app.wsgi_app = PathPrefix(app.wsgi_app, prefix)
    CSRFProtect(app)
    attempts = defaultdict(deque)

    @app.before_request
    def boundaries():
        if request.path.startswith('/TS') and not app.config['ENABLE_TRUTHSEQER']:
            abort(404)
        if request.path == '/debug_novelty':
            abort(404)
        if request.method == 'POST' and request.path in ('/login','/signup','/reset_password_request','/resend_confirmation','/auth/google/start'):
            # Origin is loopback-only; the limit is deliberately aggregate per endpoint.
            history = attempts[request.path]
            now = time.monotonic()
            while history and history[0] < now-300:
                history.popleft()
            if len(history) >= 100:
                abort(429)
            history.append(now)
        if request.path in ('/structures_JSON','/csv') or request.path.startswith(('/TC/','/TS/')):
            if not current_user.is_authenticated:
                return app.login_manager.unauthorized()
            parameter = None
            if request.path.endswith('/job_details') or request.path == '/csv':
                parameter = 'id'
            elif request.path.endswith('/structures') or request.path == '/structures_JSON':
                parameter = 'job'
            if parameter:
                job = Jobs.query.filter_by(id=request.args.get(parameter,type=int),user_id=current_user.id).first()
                if job is None:
                    abort(404)
            if request.path.endswith('/jobs_summary_json') and request.method == 'POST':
                job = Jobs.query.filter_by(id=request.form.get('job_id_to_delete',type=int),user_id=current_user.id).first()
                if job is None:
                    abort(404)
            if request.path.endswith('/process_submission') and request.method == 'POST':
                if request.form.get('client_step') not in ('1','2'):
                    abort(400, 'Invalid submission step.')
                if request.form.get('client_step') == '2':
                    environment=request.form.get('target_environment')
                    option=request.form.get(environment+'_option') if environment in ('in_vivo','in_vitro') else None
                    choices={'in_vivo':{'ribozyme_only','alen','kharma'},'in_vitro':{'ribozyme_only','default_T7','custom_promoter'}}
                    if environment not in choices or option not in choices[environment]:
                        abort(400, 'Invalid target environment.')
                    import math
                    try:
                        temperature=float(request.form.get('temperature_field',''))
                        if not math.isfinite(temperature): raise ValueError()
                    except ValueError:
                        abort(400, 'Invalid temperature.')
                if Jobs.query.filter(Jobs.status.in_(['Running','Queued'])).count() >= app.config['MAX_QUEUE_LENGTH']:
                    abort(429, 'The job queue is full. Please try again later.')
                if Jobs.query.filter(Jobs.user_id==current_user.id,Jobs.status.in_(['Running','Queued'])).count() >= app.config['MAX_NUM_USER_JOBS']:
                    abort(429, 'You already have a queued or running job.')
                for field in ('wt_field','mutant_field'):
                    if len(request.form.get(field,'')) > app.config['MAX_SEQUENCE_LENGTH']:
                        abort(413, 'Sequence exceeds the service length limit.')
        if not app.config['SEND_EMAILS'] and request.path in ('/reset_password_request','/resend_confirmation'):
            flash('Email delivery is not configured yet. Password reset is currently unavailable.', 'login_fail')
            return redirect(url_for('auth.login'))

    @app.after_request
    def headers(response):
        response.headers['X-Content-Type-Options']='nosniff'
        response.headers['X-Frame-Options']='SAMEORIGIN'
        response.headers['Referrer-Policy']='same-origin'
        if not request.path.startswith('/static/'):
            response.headers['Cache-Control']='no-store'
        return response

    @app.get('/healthz')
    def health():
        return {'service':'tricleaver','status':'ok','email_enabled':app.config['SEND_EMAILS'],
                'google_login_enabled':app.config.get('GOOGLE_LOGIN_ENABLED', False)}
