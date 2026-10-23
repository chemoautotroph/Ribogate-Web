# Google sign-in for TriCleaver

TriCleaver uses Google OpenID Connect as its only sign-in method. It uses its own Google OAuth Web client, database, session secret and
`tricleaver_session` cookie with Path `/tricleaver`. It never reads iFold credentials,
users, sessions or jobs. Both applications still share a web origin: Cookie Path is
cookie routing, not a security boundary against JavaScript in another application
on `kharmalab.cloud`.

## Google Cloud configuration

Create a separate **Web application** client named **TriCleaver** in Google Auth
Platform → Clients. It can belong to the existing lab project. Branding, audience
and publishing status are project settings; a separate client does not create a
separate consent-screen brand. Use a separate project if separate branding is needed.

Register this exact **Authorized redirect URI**:

```text
https://kharmalab.cloud/tricleaver/auth/google/callback
```

This server-side flow does not require Authorized JavaScript origins. It requests
only `openid email profile`, without offline access or Google API permissions.
Use an External audience if Google accounts outside the lab's Workspace organization
should be able to sign in. Google exempts requests limited to `openid email profile`
from Testing-mode test-user restrictions; this application uses only those scopes.
If additional scopes are introduced, review the project's test-user and publishing
requirements. See [Google's audience rules](https://support.google.com/cloud/answer/15549945).
The existing Cloudflare `/tricleaver` route covers the callback.

Download the client's JSON to a private location outside the repository. Never put
it, the client secret, authorization codes, ID tokens or access tokens in Git or chat.

## Enable on the existing Linux server

Build and validate the new source in the user-owned checkout:

```sh
.venv/bin/python -m pip install --require-hashes -r requirements-linux.lock
.venv/bin/python scripts/verify_google_oauth.py
.venv/bin/python scripts/package_linux.py
```

Use the already-prepared venv `/home/kaiyu/rna-deploy/tricleaver-venv` on the existing
RNA server. The prepared package is `dist/linux-package`. Protect the downloaded
JSON with mode 0600 and keep it outside the checkout. With a private copy on the VM:

```sh
sudo bash /home/kaiyu/rna-deploy/Ribogate-Web/deploy/update-linux.sh \
  --google-client /home/kaiyu/rna-deploy/tricleaver-private/google-client.json
```

The updater validates the callback in the JSON, copies and verifies the offline
package, creates a new root-owned release and virtual environment, then runs isolated
OAuth and real-design smoke checks as the service account. It refuses active/queued
jobs. It stops TriCleaver briefly, backs up its data and environment, switches the
application/venv paths and restarts the service. Database changes only add
`google_identity` and `google_login_attempt` tables; existing users and jobs remain.

The updater imports only `RIBOGATE_GOOGLE_CLIENT_ID` and
`RIBOGATE_GOOGLE_CLIENT_SECRET` into `/etc/tricleaver/environment` (root, 0600).
The session secret is preserved. The service receives the settings through systemd.
Neither the iFold service nor Cloudflare configuration is changed.

If this application version is already installed, configure credentials separately:

```sh
sudo python3 /opt/tricleaver/app/deploy/configure-google.py /path/to/google-client.json
sudo systemctl restart tricleaver-web
```

When both variables are empty/missing, sign-in is unavailable and the login page
asks users to contact the administrator. An incomplete pair prevents startup so that a
configuration error is visible to the administrator. Non-Linux developers using the
original Windows dependency lock must install the pinned `Authlib==1.9.1` dependency
and configure a Google Web client to enable sign-in on this branch.

## User flow

- A first Google sign-in creates a confirmed TriCleaver account without a password.
- Subsequent Google sign-ins identify the account by Google's immutable `sub`, not
  its email. A verified email change updates the address unless another account
  already uses it.
- An existing email/password account is never merged solely because its email
  matches Google. Start Google sign-in with the same email; after Google verifies
  that identity, enter the previous TriCleaver password once to connect the account.
  This step expires after five minutes or five failed guesses. The account ID and
  existing designs remain unchanged, and the password hash is removed.
- One Google identity can belong to only one TriCleaver account. One TriCleaver
  account can link one Google identity. Successful Google sign-in removes any remaining
  local password hash on an already linked account.
- Email/password sign-in, registration, confirmation and password-reset routes are
  removed. Old sessions and remember-me cookies require a new Google sign-in.
  Google sign-in does not depend on the email-sending API keys.
- This Linux installation began with a fresh database; the old Windows user database
  was not imported. Updates preserve accounts and designs created on the Linux server.

## Validation and rollout

`scripts/verify_google_oauth.py` uses temporary data and a mocked Google HTTP provider,
with real Authlib OAuth processing and real RS256 signatures. It checks PKCE, required
claims, issuer/audience/authorized party/expiry/nonce/signature failures, verified
email, Google-first account migration, removed password endpoints, rejection of old
sessions/remember cookies, stable subjects, CSRF, session rotation, concurrent callback
consumption, expired/replayed/cancelled attempts and application-scoped redirects.
OAuth state expires after ten minutes and is consumed atomically in the database.
Tokens are not retained in application sessions or databases.

The tests do not verify the Google Console configuration or a real Google account's
consent. After deployment, confirm `google_login_enabled: true` at
`/tricleaver/healthz`, open `/tricleaver/login`, complete Google sign-in, check the
Account/Jobs pages, sign out and sign in again. Also verify iFold remains reachable.

## Recovery

Each update prints its `/opt/tricleaver/releases/update-*/backup` directory, containing
the previous app/venv paths, root-only environment and a stopped-service data archive.
An update failure after stopping the service attempts to restore the prior code and
environment automatically. Inspect the service journal if recovery is incomplete.
The added tables are backward compatible, so code rollback need not replace user data.
Clearing both Google variables disables all sign-in; it does not restore password
login. Preserve backups privately. Users migrated to Google no longer have a local
password hash, including after a code-only rollback.

References: [Google OpenID Connect](https://developers.google.com/identity/openid-connect/openid-connect),
[Authlib Flask integration](https://docs.authlib.org/en/latest/oauth2/client/web/flask.html),
[Google button assets](https://developers.google.com/identity/branding-guidelines).
`WS/static/google-signin.svg` is the unmodified light rectangular web button from
Google's official sign-in asset download.
