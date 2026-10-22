"""Exercise real Authlib/JWT verification against a mock Google HTTP provider.

Uses a temporary application database. Never signs in to Google or reads production data.
"""
import argparse
import base64
from concurrent.futures import ThreadPoolExecutor
import hashlib
import importlib.util
import json
import os
from pathlib import Path
import re
import secrets
import sys
import tempfile
import time
import unittest
from unittest.mock import patch
from urllib.parse import parse_qs, urlencode, urlsplit

ROOT = Path(__file__).resolve().parents[1]
sys.path.insert(0, str(ROOT))
TEMP = tempfile.TemporaryDirectory(prefix='tricleaver-oauth-test-')
os.environ.update(RIBOGATE_DATA_DIR=TEMP.name, RIBOGATE_SECRET_KEY=secrets.token_hex(32),
    RIBOGATE_BASE_PATH='/tricleaver', RIBOGATE_SERVER_NAME='kharmalab.cloud',
    RIBOGATE_URL_SCHEME='https', RIBOGATE_GOOGLE_CLIENT_ID='test-tricleaver.apps.googleusercontent.com',
    RIBOGATE_GOOGLE_CLIENT_SECRET='test-only-client-secret', RIBOGATE_SEND_EMAILS='false')

import requests
from joserfc import jwt
from joserfc.jwk import RSAKey
from werkzeug.security import generate_password_hash
from runserver import configure_app
from WS import db
from WS.models import GoogleIdentity, GoogleLoginAttempt, Jobs, User
from WS.google_auth import configure_google_oauth, digest, safe_next

app = configure_app([])
app.config['TESTING'] = True
BASE = 'https://kharmalab.cloud'
PREFIX = '/tricleaver'
CLIENT_ID = os.environ['RIBOGATE_GOOGLE_CLIENT_ID']
CALLBACK = BASE + PREFIX + '/auth/google/callback'
KEY = RSAKey.generate_key(2048, parameters={'kid': 'mock-google-key'})
OTHER_KEY = RSAKey.generate_key(2048, parameters={'kid': 'mock-google-key'})


class GoogleOAuthTests(unittest.TestCase):
    def setUp(self):
        with app.app_context():
            db.drop_all()
            db.create_all()
        app.config['GOOGLE_LOGIN_ENABLED'] = True
        self.client = app.test_client()
        self.codes = {}
        self.exchanges = []
        self.omit_id_token = False
        self.token_timeout = False
        self.mock = patch.object(requests.sessions.Session, 'send', autospec=True, side_effect=self.send)
        self.mock.start()
        self.addCleanup(self.mock.stop)

    def send(self, http_session, request, **kwargs):
        url = request.url
        if url == 'https://accounts.google.com/.well-known/openid-configuration':
            payload = {'issuer': 'https://accounts.google.com',
                'authorization_endpoint': 'https://accounts.google.com/o/oauth2/v2/auth',
                'token_endpoint': 'https://oauth2.googleapis.com/token',
                'jwks_uri': 'https://www.googleapis.com/oauth2/v3/certs',
                'id_token_signing_alg_values_supported': ['RS256']}
        elif url == 'https://www.googleapis.com/oauth2/v3/certs':
            payload = {'keys': [KEY.as_dict(private=False)]}
        elif url == 'https://oauth2.googleapis.com/token':
            if self.token_timeout:
                raise requests.exceptions.Timeout('mock token timeout')
            fields = parse_qs(request.body.decode() if isinstance(request.body, bytes) else request.body)
            flow, claims, key = self.codes[fields['code'][0]]
            self.exchanges.append(fields)
            self.assertEqual(fields['redirect_uri'], [CALLBACK])
            verifier = fields['code_verifier'][0]
            challenge = base64.urlsafe_b64encode(hashlib.sha256(verifier.encode()).digest()).rstrip(b'=').decode()
            self.assertEqual(challenge, flow['code_challenge'][0])
            payload = {'access_token': 'mock-access-token-never-store', 'token_type': 'Bearer',
                       'expires_in': 3600, 'id_token': jwt.encode({'alg': 'RS256', 'kid': 'mock-google-key'}, claims, key)}
            if self.omit_id_token:
                payload.pop('id_token')
                payload['userinfo'] = claims
        else:
            raise AssertionError('Unexpected provider request: ' + url)
        response = requests.Response()
        response.status_code = 200
        response._content = json.dumps(payload).encode()
        response.headers['Content-Type'] = 'application/json'
        response.url = url
        response.request = request
        return response

    def get(self, path, client=None):
        return (client or self.client).get(PREFIX + path, base_url=BASE)

    def csrf(self, client=None, path='/login'):
        response = self.get(path, client)
        self.assertEqual(response.status_code, 200)
        return re.search(r'name="csrf-token" content="([^"]+)"', response.text).group(1)

    def start(self, client=None, next_path=''):
        client = client or self.client
        response = client.post(PREFIX + '/auth/google/start', base_url=BASE,
            headers={'Referer': BASE + PREFIX + '/login'},
            data={'csrf_token': self.csrf(client), 'next': next_path})
        self.assertEqual(response.status_code, 302, response.text[:300])
        self.assertTrue(response.location.startswith('https://accounts.google.com/'), response.location)
        return parse_qs(urlsplit(response.location).query)

    def finish(self, flow, changes=None, key=KEY, client=None, remove=()):
        claims = {'iss': 'https://accounts.google.com', 'aud': CLIENT_ID,
            'sub': 'google-person-1', 'email': 'person@gmail.com', 'email_verified': True,
            'name': 'Test Person', 'iat': int(time.time()), 'exp': int(time.time()) + 300,
            'nonce': flow['nonce'][0]}
        claims.update(changes or {})
        for name in remove:
            claims.pop(name, None)
        code = secrets.token_urlsafe(12)
        self.codes[code] = (flow, claims, key)
        return self.get('/auth/google/callback?' + urlencode({'state': flow['state'][0], 'code': code}), client)

    def local_user(self, email='person@gmail.com', confirmed=True):
        with app.app_context():
            user = User(email=email, name='Existing user', confirmed=confirmed,
                        password=generate_password_hash('test-password-123'))
            db.session.add(user)
            db.session.commit()
            return user.id

    def password_login(self, email='person@gmail.com'):
        response = self.client.post(PREFIX + '/login', base_url=BASE,
            headers={'Referer': BASE + PREFIX + '/login'}, data={
            'csrf_token': self.csrf(), 'email': email, 'password': 'test-password-123'})
        self.assertEqual(response.location, PREFIX + '/')

    def logout(self):
        self.client.post(PREFIX + '/logout', base_url=BASE,
                         headers={'Referer': BASE + PREFIX + '/account'},
                         data={'csrf_token': self.csrf(path='/account')})

    def assert_anonymous(self):
        with self.client.session_transaction(path=PREFIX + '/', base_url=BASE) as session:
            self.assertNotIn('_user_id', session)

    def test_button_csrf_and_disabled_mode(self):
        for path in ('/login', '/signup'):
            self.assertIn('Continue with Google', self.get(path).text)
            self.assertIn(PREFIX + '/auth/google/start', self.get(path).text)
        self.assertEqual(self.client.post(PREFIX + '/auth/google/start', base_url=BASE).status_code, 400)
        self.assertEqual(self.get('/auth/google/start').status_code, 405)
        app.config['GOOGLE_LOGIN_ENABLED'] = False
        self.assertNotIn('Continue with Google', self.get('/login').text)
        self.assertEqual(self.get('/auth/google/callback?state=x').status_code, 404)
        with patch.dict(os.environ, {'RIBOGATE_GOOGLE_CLIENT_SECRET': ''}):
            with self.assertRaises(ValueError):
                configure_google_oauth(app)

    def test_existing_database_and_jobs_are_preserved(self):
        user_id = self.local_user()
        with app.app_context():
            job = Jobs(user_id=user_id, status='Completed', type='TC')
            db.session.add(job)
            db.session.commit()
            job_id = job.id
            password = User.query.one().password
            GoogleLoginAttempt.__table__.drop(db.engine)
            GoogleIdentity.__table__.drop(db.engine)
            db.create_all()
            self.assertEqual(User.query.one().id, user_id)
            self.assertEqual(User.query.one().password, password)
            self.assertEqual(Jobs.query.one().id, job_id)
            self.assertEqual(Jobs.query.one().user_id, user_id)

    def test_private_client_configuration_import(self):
        spec = importlib.util.spec_from_file_location('configure_google', ROOT / 'deploy/configure-google.py')
        module = importlib.util.module_from_spec(spec)
        spec.loader.exec_module(module)
        folder = Path(TEMP.name)
        source, environment = folder / 'test-client.json', folder / 'test-environment'
        source.write_text(json.dumps({'web': {'client_id': CLIENT_ID,
            'client_secret': 'test-only-client-secret', 'redirect_uris': [CALLBACK]}}))
        environment.write_text('RIBOGATE_SECRET_KEY=preserve-existing-session-key\nRIBOGATE_GOOGLE_CLIENT_ID=old\n')
        module.write_environment(environment, module.load_client(source))
        content = environment.read_text()
        self.assertIn('RIBOGATE_SECRET_KEY=preserve-existing-session-key\n', content)
        self.assertEqual(content.count('RIBOGATE_GOOGLE_CLIENT_ID='), 1)
        self.assertEqual(environment.stat().st_mode & 0o777, 0o600)
        source.write_text(json.dumps({'web': {'client_id': CLIENT_ID,
            'client_secret': 'test-only-client-secret', 'redirect_uris': [BASE + '/ifold/callback']}}))
        with self.assertRaises(ValueError):
            module.load_client(source)
        source.write_text('{"web":[]}')
        with self.assertRaises(ValueError):
            module.load_client(source)

    def test_authorization_and_cookie_isolation(self):
        flow = self.start()
        self.assertEqual(flow['client_id'], [CLIENT_ID])
        self.assertEqual(flow['redirect_uri'], [CALLBACK])
        self.assertEqual(flow['response_type'], ['code'])
        self.assertEqual(set(flow['scope'][0].split()), {'openid', 'email', 'profile'})
        self.assertEqual(flow['code_challenge_method'], ['S256'])
        self.assertNotIn('access_type', flow)
        cookie = self.client.get_cookie('tricleaver_session', domain='kharmalab.cloud', path=PREFIX)
        self.assertTrue(cookie.secure and cookie.http_only)
        self.assertEqual(cookie.same_site, 'Lax')
        self.assertIsNone(self.client.get_cookie('ifold_session', domain='kharmalab.cloud', path='/ifold'))
        self.assertEqual(self.client.get('/ifold', base_url=BASE).status_code, 404)

    def test_new_user_repeat_login_subject_and_password_fallback(self):
        flow = self.start(next_path=PREFIX + '/account')
        old_cookie = self.client.get_cookie('tricleaver_session', domain='kharmalab.cloud', path=PREFIX).value
        response = self.finish(flow)
        self.assertEqual(response.location, PREFIX + '/account')
        new_cookie = self.client.get_cookie('tricleaver_session', domain='kharmalab.cloud', path=PREFIX).value
        self.assertNotEqual(old_cookie, new_cookie)
        with app.app_context():
            user = User.query.one()
            original_id = user.id
            self.assertIsNone(user.password)
            self.assertTrue(user.confirmed)
            self.assertEqual(GoogleIdentity.query.one().user_id, user.id)
        with self.client.session_transaction(path=PREFIX + '/', base_url=BASE) as session:
            self.assertEqual(session['_user_id'], str(original_id))
            self.assertNotIn('mock-access-token', repr(dict(session)))
            self.assertFalse(any(k.startswith('_state_google_') for k in session))
        self.assertEqual(self.get('/TC/jobs_summary').status_code, 200)
        self.logout()
        self.assert_anonymous()
        self.password_login_attempt = self.client.post(PREFIX + '/login', base_url=BASE,
            headers={'Referer': BASE + PREFIX + '/login'},
            data={'csrf_token': self.csrf(), 'email': 'person@gmail.com', 'password': 'anything'})
        self.assertEqual(self.password_login_attempt.location, PREFIX + '/login')
        response = self.finish(self.start(), changes={'email': 'new-email@gmail.com'})
        self.assertEqual(response.location, PREFIX + '/')
        with app.app_context():
            self.assertEqual(User.query.one().id, original_id)
            self.assertEqual(User.query.one().email, 'new-email@gmail.com')

    def test_wrong_browser_state_expiry_cancel_and_replay(self):
        flow = self.start()
        stranger = app.test_client()
        self.finish(flow, client=stranger)
        self.assertEqual(len(self.exchanges), 0)
        self.get('/auth/google/callback?state=not-the-state&code=bad')
        self.assertEqual(len(self.exchanges), 0)
        self.assertEqual(self.finish(flow).location, PREFIX + '/')
        self.finish(flow)
        self.assertEqual(len(self.exchanges), 1)
        self.logout()
        flow = self.start()
        with app.app_context():
            GoogleLoginAttempt.query.update({'expires_at': time.time() - 1})
            db.session.commit()
        self.finish(flow)
        self.assert_anonymous()
        self.assertEqual(len(self.exchanges), 1)
        flow = self.start()
        self.get('/auth/google/callback?' + urlencode({'state': flow['state'][0], 'error': 'access_denied'}))
        self.finish(flow)
        self.assertEqual(len(self.exchanges), 1)

    def test_rejects_invalid_signed_claims_and_signature(self):
        cases = [({'iss': 'https://attacker.example'}, (), KEY),
                 ({'aud': 'ifold-client.apps.googleusercontent.com'}, (), KEY),
                 ({'azp': 'another-client'}, (), KEY),
                 ({'exp': int(time.time()) - 300}, (), KEY),
                 ({'iat': int(time.time()) + 600}, (), KEY),
                 ({'nonce': 'different'}, (), KEY),
                 ({'nonce_supported': False}, ('nonce',), KEY),
                 ({'email_verified': False}, (), KEY),
                 ({'email_verified': 'true'}, (), KEY),
                 ({'sub': ''}, (), KEY), ({}, ('exp',), KEY),
                 ({}, ('iss',), KEY), ({}, ('aud',), KEY), ({}, ('iat',), KEY),
                 ({}, (), OTHER_KEY)]
        for changes, removed, key in cases:
            with self.subTest(changes=changes, removed=removed, wrong_key=(key is OTHER_KEY)):
                self.client = app.test_client()
                response = self.finish(self.start(), changes, key, remove=removed)
                self.assertEqual(response.location, PREFIX + '/login')
                self.assert_anonymous()
                with app.app_context():
                    self.assertEqual(User.query.count(), 0)

    def test_existing_email_requires_explicit_authenticated_link(self):
        user_id = self.local_user()
        self.finish(self.start())
        self.assert_anonymous()
        with app.app_context():
            self.assertEqual(GoogleIdentity.query.count(), 0)
            self.assertEqual(User.query.one().id, user_id)
        self.password_login()
        self.finish(self.start(), changes={'email': 'different@gmail.com'})
        with app.app_context():
            self.assertEqual(GoogleIdentity.query.count(), 0)
        response = self.finish(self.start())
        self.assertEqual(response.location, PREFIX + '/account')
        with app.app_context():
            self.assertEqual(GoogleIdentity.query.one().user_id, user_id)
            self.assertIsNotNone(User.query.one().password)
        self.logout()
        self.finish(self.start())
        with self.client.session_transaction(path=PREFIX + '/', base_url=BASE) as session:
            self.assertEqual(session['_user_id'], str(user_id))

    def test_provider_timeout_and_unsigned_userinfo_fail_closed(self):
        self.token_timeout = True
        self.assertEqual(self.finish(self.start()).location, PREFIX + '/login')
        self.assert_anonymous()
        self.token_timeout = False
        self.omit_id_token = True
        self.assertEqual(self.finish(self.start()).location, PREFIX + '/login')
        self.assert_anonymous()
        with app.app_context():
            self.assertEqual(User.query.count(), 0)

    def test_unconfirmed_email_and_changed_login_session(self):
        self.local_user(confirmed=False)
        self.finish(self.start())
        self.assert_anonymous()
        with app.app_context():
            self.assertFalse(User.query.one().confirmed)
            self.assertEqual(GoogleIdentity.query.count(), 0)
            User.query.one().confirmed = True
            db.session.commit()
        flow = self.start()
        self.password_login()
        self.finish(flow)
        self.assertEqual(len(self.exchanges), 1)
        with app.app_context():
            self.assertEqual(GoogleIdentity.query.count(), 0)

    def test_concurrent_callbacks_consumed_once(self):
        flow = self.start()
        value = self.client.get_cookie('tricleaver_session', domain='kharmalab.cloud', path=PREFIX).value
        clients = [app.test_client(), app.test_client()]
        for client in clients:
            client.set_cookie('tricleaver_session', value, domain='kharmalab.cloud', path=PREFIX)
        with ThreadPoolExecutor(max_workers=2) as pool:
            responses = list(pool.map(lambda c: self.finish(flow, client=c), clients))
        self.assertEqual(sorted(r.location for r in responses), [PREFIX + '/', PREFIX + '/login'])
        self.assertEqual(len(self.exchanges), 1)
        with app.app_context():
            self.assertEqual(User.query.count(), 1)

    def test_redirects_confined_to_tricleaver(self):
        with app.test_request_context(base_url=BASE, environ_overrides={'SCRIPT_NAME': PREFIX}):
            for value in ('https://attacker.example', '//attacker.example', '/ifold',
                          '/tricleaver/../ifold', '/tricleaver/%2e%2e/ifold',
                          '/tricleaver/%5cattacker', '/tricleaver/\r\nx',
                          'http://[', None):
                self.assertEqual(safe_next(value), PREFIX + '/', value)
            self.assertEqual(safe_next(PREFIX + '/account'), PREFIX + '/account')
        response = self.finish(self.start(next_path='https://attacker.example'))
        self.assertEqual(response.location, PREFIX + '/')


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--report', type=Path)
    args = parser.parse_args()
    suite = unittest.defaultTestLoader.loadTestsFromTestCase(GoogleOAuthTests)
    result = unittest.TextTestRunner(verbosity=2).run(suite)
    if args.report:
        args.report.write_text(json.dumps({'passed': result.wasSuccessful(),
            'tests_run': result.testsRun, 'failures': len(result.failures), 'errors': len(result.errors),
            'provider': 'mock HTTP with real Authlib, PKCE and signed RS256 tokens',
            'live_google_login_tested': False}, indent=2) + '\n')
    TEMP.cleanup()
    return 0 if result.wasSuccessful() else 1


if __name__ == '__main__':
    raise SystemExit(main())
