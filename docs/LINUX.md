# TriCleaver on Linux

Target: Ubuntu 24.04 x86-64, system Python 3.12. Production address:
`https://kharmalab.cloud/tricleaver`. Original research and Ribogate application credit:
Nicholas Kamel, Kharma Lab, Concordia University.

## What changed

- Native ViennaRNA **2.3.5**, matching the original Windows executable version.
  Both MAXLOOP=30 and MAXLOOP=300 are compiled. The only source changes are the
  original loop limit and writing the probability list to stdout instead of a plot
  file. MFE output is parsed by a Linux adapter; the original Windows adapter remains.
- Linux Python packages are pinned separately in `requirements-linux.lock`.
  Scientific NumPy/SciPy versions are retained; scikit-learn is patched to 1.5.2.
  The web and HTTP libraries were updated to fix the dependency audit findings.
- A single Waitress web process serves the app. A serial dispatcher starts each
  design in its own Linux process group, with spawn-based multiprocessing, cancellation,
  a durable six-hour deadline, failure states and restart recovery.
- The `/tricleaver` mount applies to HTML, AJAX, assets, result links and emails.
  Cookies are scoped to the application. CSRF protects mutations, result access
  checks ownership, login redirects stay within the app and debug routes are disabled.
- This deployment exposes TriCleaver. The archived, unfinished TruthSeqEr web routes
  are disabled with `RIBOGATE_ENABLE_TRUTHSEQER=false`.

## Build a new host package

Install the host prerequisites through the host's administrator:
`python3.12-venv`, `build-essential`, `curl`, `tar`, `e2fsprogs` and systemd.
Use a user-owned checkout for the build, not a root shell:

```sh
python3 -m venv .venv
.venv/bin/python -m pip install pip==26.2.2 setuptools==80.9.0 wheel==0.45.1
.venv/bin/python -m pip install --require-hashes --no-build-isolation -r requirements-linux.lock
.venv/bin/python scripts/build_vienna_linux.py --build-dir .linux-build
OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 .venv/bin/python scripts/smoke_test.py --lifecycle
.venv/bin/python scripts/verify_email_flows.py
.venv/bin/python scripts/package_linux.py
sudo bash deploy/install-linux.sh
```

The source download is pinned in `scripts/build_vienna_linux.py`; the generated native
binary manifest records their checksums. An existing build directory is refused.
The offline package validates all artifacts before installing and uses only local
wheels during the privileged installation. The installer refuses existing application
directories and accounts; it is a first-install tool, not an updater. If installation
is interrupted, inspect and resume the completed stages rather than deleting data.

## Existing RNA server

Checkout: `/home/kaiyu/rna-deploy/Ribogate-Web`, branch `linux-hosting`.
The prepared installation command is:

```sh
sudo bash /home/kaiyu/rna-deploy/Ribogate-Web/deploy/install-linux.sh
```

The installer creates only the TriCleaver account, paths and service units. It does
not modify iFold, its database, SSH, the Hyper-V network, firewall, DNS or tunnel.
It runs an isolated real smoke job as the installed service account before enabling
the production service. No test account is added to the production database.

| Setting | Production value |
| --- | --- |
| Service | `tricleaver-web.service`, enabled at boot |
| Identity | `tricleaver`, no login shell or sudo |
| Listener | `127.0.0.1:8000` |
| Application | `/opt/tricleaver/app` (root owned, read-only to service) |
| Python | `/opt/tricleaver/venv` |
| Configuration | `/etc/tricleaver/environment` (root, 0600) |
| Data | `/var/lib/tricleaver-data` (service, 0700) |
| Data volume | 4 GiB ext4 image under `/var/lib/tricleaver-storage`, nodev/nosuid/noexec |
| CPU | 200% maximum, weight 50; two folding workers |
| Memory | high 2 GiB, maximum 3 GiB, no swap |
| Processes | 96 maximum |
| Job limits | 32 total queued/running, one per account, six hours, 12,000 input characters |
| Retention | 14 days; dispatcher removes job records and associated worker logs |

These are configuration limits. The small smoke workload is not a maximum-load or
out-of-memory/disk-full recovery test. iFold has its own existing resource limits.

## Cloudflare published route

The existing remotely managed tunnel currently has only the iFold path rule.
In the existing `ifold-ubuntu` tunnel, add a **Published application** route:

| Field | Value |
| --- | --- |
| Subdomain | empty |
| Domain | `kharmalab.cloud` |
| Path | `^/tricleaver(/.*)?$` |
| Type | HTTP |
| URL | `127.0.0.1:8000` |

Keep the existing `^/ifold(/.*)?$` → `http://127.0.0.1:3000` rule and the final 404
rule. Do not strip the `/tricleaver` prefix. No new DNS record is needed for this
existing hostname. The VM holds only the tunnel runtime credential; editing published
routes requires the Cloudflare account or a narrowly scoped management token.

Verify `https://kharmalab.cloud/tricleaver/healthz` and the full signup/login/task flow
after adding the route. Loopback health can be checked before the route exists:

```sh
curl -f -H 'Host: kharmalab.cloud' http://127.0.0.1:8000/tricleaver/healthz
```

## Email

Google sign-in is available independently of email delivery. See
[Google OAuth setup and update instructions](GOOGLE_OAUTH.md) for its separate client,
callback URL, existing-account linking and data-preserving Linux updater.

Email is disabled initially. New accounts can log in immediately; users view results
on the Jobs page. The UI explains that email notifications and password-reset emails
are unavailable. To enable email, use `sudoedit /etc/tricleaver/environment`, configure
`RIBOGATE_EMAIL_FROM` with a provider-verified sender, and set **one** provider:

- `RIBOGATE_EMAIL_SERVICE=sendgrid` and `SENDGRID_API_KEY`; or
- `RIBOGATE_EMAIL_SERVICE=smtp2go` and `SMTP2GO_API_KEY`.

Then set `RIBOGATE_SEND_EMAILS=true` and restart the service. Both adapters are available;
only the selected provider requires its key. Keep keys out of Git and chat. Actual inbox
delivery has not been tested; adapter, confirmation and reset tests mock delivery.

## Operations, backup and rollback

```sh
sudo systemctl status tricleaver-web
sudo journalctl -u tricleaver-web -n 100 --no-pager
sudo systemctl restart tricleaver-web
sudo systemctl stop tricleaver-web
```

Stop the service for a consistent backup, then privately archive `/etc/tricleaver`,
`/var/lib/tricleaver-data`, `/opt/tricleaver` and both systemd units. The data contains
user accounts and designs, so do not publish it. Keep the original installation package
and `SHA256SUMS` for code recovery. Backups should be stored off the VM as well.

For rollback of this first installation, disable and stop `tricleaver-web.service`,
then disable and stop `var-lib-tricleaver\x2ddata.mount`, and remove only the newly
added Cloudflare `/tricleaver` route. Retain the application, private configuration
and data image for recovery. iFold stays on its existing port and route.

## Validation

The Linux port passed 144 synthetic folding comparisons against the pinned Windows
executables, covering both loop limits, one/two strands, three temperatures and
unpaired-position constraints. MFE structures, energies and ensemble diversity matched;
maximum probability difference was approximately 5.6e-16. This is tested numerical
agreement, not a proof for every input or a biological validation.

Real 8-individual/4-generation jobs passed signup/login, two-step submission, scheduler,
nonempty results, structure/state data, assets, Excel export, restart persistence,
active cancellation, active-job restart recovery, timeout and queue release. CSRF,
cross-user result/cancellation denial, mounted URLs and disabled debug/TS routes were
also checked. Full 300-individual/200-generation research runs and resource exhaustion
were not part of these deployment checks. See `docs/validation-linux.json` for evidence.
