# Reproducing Ribogate Web on a new Windows machine

Original research credit belongs to **Nicholas (Nick) Kamel**. Research affiliation: **Kharma Lab, Concordia University**. This document covers deployment of the archived application, with the packaging changes listed in the README.

## Reproduction target

- Windows 10/11, x64; PowerShell 5.1 or later.
- CPython **3.9.19 x64**, pip **24.0**, setuptools **69.5.1**, wheel **0.43.0**.
- Python package versions and accepted artifact SHA-256 hashes: [`requirements.lock`](requirements.lock).
- The four customized ViennaRNA executables from Nick's TriCleaver commit **443b4f4f7d3f961d3b86a7e764fc9721c34fe591**, pinned by size and SHA-256 in [`vienna-manifest.json`](vienna-manifest.json).
- A modern browser and internet access to GitHub and PyPI during installation. Windows `curl.exe` and `tar.exe` are used to bootstrap Python; both are included in current Windows 10/11 installations. No existing Python, Conda, previous Ribogate folder, database, user account, RNA Python module or locally compiled software is required.

This target restores the TriCleaver web workflow and the archived code. It does not reproduce private historical users/jobs, guarantee identical stochastic design sequences, or turn unfinished legacy features into completed features. Linux/macOS/Windows ARM are not supported by this Windows executable bundle. The historical Python 3.9 runtime is retained for reproducibility; upgrading it requires a separate compatibility test.

## 1. Get the repository and run setup

Download this repository with **Code > Download ZIP**, extract it to a writable directory (for example `C:\Research\Ribogate-Web`), open **PowerShell**, and change into that directory:

```powershell
cd C:\Research\Ribogate-Web
powershell -NoProfile -ExecutionPolicy Bypass -File scripts\setup.ps1
```

If Git is already installed, `git clone https://github.com/chemoautotroph/Ribogate-Web.git` is equivalent to downloading ZIP. For an exact future repeat, keep the ZIP of the same commit or check out the same Git commit; do not assume `main` will remain unchanged.

The setup script downloads and verifies a portable Python runtime into `.python/`, creates `.venv`, installs the hash-locked dependencies, downloads and verifies all four ViennaRNA files, creates a private `.env` and an empty database, tests email adapters without sending mail, and runs a real small TriCleaver job followed by result/structure/export and restart checks. It stops with an error if a step fails. Read the final `Setup verified` message before proceeding. The test uses a temporary database, not the new instance's user data. Setup does not install Python system-wide, modify the system PATH or require administrator access.

The Python build comes from [Astral's python-build-standalone release 20240726](https://github.com/astral-sh/python-build-standalone/releases/tag/20240726), artifact `cpython-3.9.19+20240726-x86_64-pc-windows-msvc-shared-install_only_stripped.tar.gz`. Its exact URL, size and SHA-256 (`db39a9da42deccdbada78ab3c39fa4d0b1e8957c3cc73447bf400386e0bfb3cc`) are pinned in [`python-manifest.json`](python-manifest.json); this checksum was matched against the publisher's `.sha256` file. The downloaded distribution includes its own license notices. Keep `.python/` with the installation: the virtual environment refers to that runtime.

Alternatively, if Python **3.9.19 x64** is already installed, use its full path from PowerShell:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup.ps1 -PythonExe 'C:\path\to\python.exe'
```

This uses the supplied interpreter to create the isolated venv instead of downloading Python. An existing `.venv` is reused only if the Python version/architecture check passes. To repair an incompatible environment, close its running server and move `.venv` aside before running setup again; do not replace the original research environment. An installation created with `-PythonExe` depends on that interpreter remaining available.

## 2. Start and use the application

From the repository directory:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/start.ps1
```

Keep this terminal running. This branch uses Google-only sign-in: install `Authlib==1.9.1`
in the Windows venv and configure [Google OAuth](docs/GOOGLE_OAUTH.md) with the localhost
callback `http://127.0.0.1:8000/auth/google/callback`. Visit
**http://127.0.0.1:8000/login**, sign in with Google, and open **TriCleaver**.
There is no bundled default account or password. Email keys are only for notifications.

For a real design, enter WT/mutant sequences with the repeat region between two dashes, e.g. `upstream-GCGGCGGCG...-downstream`. The flanking regions must match and the mutant must have more repeats. Example sequences are included in `WS/TC/`. Continue to step 2, choose temperature, environment and cut-site motifs, then submit. The scheduler processes the queue automatically. When complete, open the job, inspect structures and download the Excel workbook.

Normal mode uses the original **300 individuals / 200 generations** and can take hours or days. To check the UI interactively with **8 individuals / 4 generations**:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/start.ps1 -Quick
```

Quick-mode results are for verifying installation, not scientific use. Stop the server with Ctrl+C before switching modes. Use only one server process per database; its scheduler runs inside that process.

## 3. Customized ViennaRNA: exact source, download and verification

The stock ViennaRNA installer or Python package is not an equivalent replacement. The archived code expects probability-matrix delimiters in console output and both MAXLOOP=30 and MAXLOOP=300 versions. [Nick's upstream setup notes](https://github.com/nickkamel/TriCleaver/blob/443b4f4f7d3f961d3b86a7e764fc9721c34fe591/README.md#setup) describe these modifications.

The setup downloads from this immutable source directory:

https://github.com/nickkamel/TriCleaver/tree/443b4f4f7d3f961d3b86a7e764fc9721c34fe591/vienna_rna_binaries

| File | SHA-256 |
| --- | --- |
| RNAFold.exe | `d1cb85135056ab2d15f2939dc535b6078e255c78f3241d318f6720732faea263` |
| RNACofold.exe | `d856a1cf64cd41890548054d7ee41e0a613e700735128b645bba4d8b8ad7fbcb` |
| RNAFold300.exe | `05e73eb2b663c449ca01cdcbc8f0f33a39279b1808592145e346e88f2f8a08ff` |
| RNACofold300.exe | `ccf89c802974c0582f13d0d1ee4b71319e42ba25b9d493f283a7b37d1129aac3` |

Exact raw URLs, byte sizes and upstream Git blob hashes are also in `vienna-manifest.json`. The binaries are downloaded into `vienna_rna_binaries/` and ignored by Git. They are verified again on server startup.

For the commands below, use the virtual environment's Python:

```powershell
.\.venv\Scripts\python.exe scripts/install_vienna.py
.\.venv\Scripts\python.exe scripts/install_vienna.py --check-only
```

For a different binary location, run `scripts/install_vienna.py --destination 'D:\RibogateTools\ViennaRNA'`, then set `RIBOGATE_VIENNA_PATH=D:/RibogateTools/ViennaRNA` in `.env`. The same hashes are required. Manual downloads are also accepted if all four exact files are present and pass the check.

For long-term recovery, keep a private offline copy of the verified files and downloaded dependency artifacts. A commit-pinned URL prevents silent version drift but cannot guarantee that an external host will exist forever. The installer fails rather than accepting an unverified replacement.

## 4. Email: provide your keys privately

Edit the generated `.env` in a text editor. It is ignored by Git. Do not put keys in README files, issues, command-line arguments or screenshots. One provider is sufficient.

SendGrid example:

```dotenv
RIBOGATE_SEND_EMAILS=true
RIBOGATE_EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=your-private-key
RIBOGATE_EMAIL_FROM=your-verified-sender@example.org
RIBOGATE_SERVER_NAME=127.0.0.1:8000
RIBOGATE_URL_SCHEME=http
```

SMTP2GO alternative:

```dotenv
RIBOGATE_SEND_EMAILS=true
RIBOGATE_EMAIL_SERVICE=smtp2go
SMTP2GO_API_KEY=your-private-key
RIBOGATE_EMAIL_FROM=your-verified-sender@example.org
```

The sender address/domain must be verified and allowed by the chosen provider. The API key must have sending permission and the account must have usable quota. See the [SendGrid authorization documentation](https://www.twilio.com/docs/sendgrid/api-reference/how-to-use-the-sendgrid-v3-api/authorization) and [SMTP2GO authentication/sender setup](https://developers.smtp2go.com/docs/getting-started).

Check configured keys without sending messages:

```powershell
.\.venv\Scripts\python.exe scripts/check_email.py
```

A key restricted to sending may not be allowed to query the read-only endpoint; an endpoint permission failure alone does not prove the key is invalid. The script never prints keys, sender lists or account contents. Successful authentication is not an inbox-delivery test.

Restart after changing `.env`. Job-completion notifications use the selected provider. Sign-in and account creation
use Google and do not require email delivery. Local confirmation and password reset
are no longer available on this branch.

If accessing the app from another computer, replace `RIBOGATE_SERVER_NAME` with the hostname and port that recipients can actually reach. Set `RIBOGATE_HOST=0.0.0.0` only when LAN access is intended. `127.0.0.1` links work only on the server itself. For an HTTPS reverse proxy, set `RIBOGATE_URL_SCHEME=https` and use its external hostname in `RIBOGATE_SERVER_NAME`.

## 5. Configuration and persistence

The repository-root `.env` is loaded automatically. Variables already set in the process environment override it; CLI flags override the corresponding defaults.

| Setting | Default / purpose |
| --- | --- |
| `RIBOGATE_SECRET_KEY` | Unique value generated by setup; keep stable for signed links/cookies |
| `RIBOGATE_HOST` | `127.0.0.1` |
| `RIBOGATE_PORT` | `8000` |
| `RIBOGATE_SERVER_NAME` | Hostname and port used in links; must match how users access the service |
| `RIBOGATE_URL_SCHEME` | `http` |
| `RIBOGATE_NUM_PROCESSES` | `2` in the generated `.env`; increase for larger machines |
| `RIBOGATE_VIENNA_PATH` | Repository's `vienna_rna_binaries/` |
| `RIBOGATE_DATA_DIR` | Repository's `instance/`; contains SQLite DB, sessions and logs |
| `RIBOGATE_SEND_EMAILS` | `false` |
| `RIBOGATE_EMAIL_SERVICE` | `sendgrid` or `smtp2go` |
| `RIBOGATE_EMAIL_FROM` | Your verified sender address |
| `RIBOGATE_ADMIN_EMAIL` | Optional administrator address |

Start from any working directory using `scripts/start.ps1`; paths resolve relative to the repository. Startup initializes missing database tables, verifies executables and validates email settings. If no secret is configured, a generated secret is persisted in `instance/secret_key` instead of changing on every restart.

To migrate existing users/jobs, stop the old server, privately back up its complete `instance/` directory and `.env`, restore them in the new checkout, then start the same code/environment. The smoke test always uses a separate temporary directory. This public repository deliberately contains no historical personal data. Pickled job objects are tied to the application source layout, so restore only trusted backups with the same code version. Back up `.env` privately alongside the database if signed tokens need to remain valid.

## 6. Acceptance checks and recorded evidence

Run setup without `-SkipSmoke`, or rerun these checks manually:

```powershell
.\.venv\Scripts\python.exe -m pip check
.\.venv\Scripts\python.exe scripts/install_vienna.py --check-only
.\.venv\Scripts\python.exe scripts/verify_email_flows.py
.\.venv\Scripts\python.exe scripts/smoke_test.py
```

`smoke_test.py` starts its own server on a free localhost port with email disabled and an isolated temporary database. It exercises all four actual folding binaries, an isolated Google identity/session fixture, the real CSRF-protected submission form, scheduler calculation, nonempty results, structure data/state switching, referenced JS/CSS URLs, XLSX download and persistence after server restart. It terminates its own server and writes `smoke-test-report.json` locally. The default job deadline is 600 seconds; use `--timeout 1200` on a slower machine.

`verify_email_flows.py` mocks provider calls and checks both adapters, rejection handling and mounted job-notification links. It never contacts a mail provider or sends mail. Real delivery requires the settings above and has not been asserted by these tests.

See [`docs/VALIDATION.md`](docs/VALIDATION.md) for the tested environment and scope. Quick-mode end-to-end verification confirms the installation path; it does not validate the scientific quality of a full 300-by-200 evolutionary run or test browser rendering visually.

## 7. Troubleshooting and legacy boundaries

| Symptom | Action |
| --- | --- |
| `curl.exe` / `tar.exe` not found | Use a current Windows 10/11 installation, or provide Python 3.9.19 x64 with `-PythonExe` |
| Wrong Python / architecture | Use Python 3.9.19 x64, or let setup download the pinned runtime |
| PyPI/hash installation error | Check internet access and repository lockfile integrity; keep hash verification enabled |
| Missing DLL / executable will not start | Use Windows x64 and the exact four files; rerun setup/verification and inspect antivirus quarantine |
| Missing executable / checksum mismatch | Rerun `install_vienna.py`; do not substitute stock ViennaRNA |
| Login page works, job does not finish | Inspect `instance/server_logs.txt`; verify binaries and rerun the smoke test |
| Google sign-in unavailable | Configure both Google client settings and check the registered callback in [Google OAuth](docs/GOOGLE_OAUTH.md) |
| Google callback points to wrong machine | Correct server name/scheme and the registered redirect URI, preserve secret key, restart |
| CPU or memory pressure | Lower `RIBOGATE_NUM_PROCESSES`; full jobs can be expensive |
| Port already in use | Change both `RIBOGATE_PORT` and `RIBOGATE_SERVER_NAME` |
| Configuration edits seem ignored | Restart; inspect process environment overrides without publishing keys |

TruthSeqEr source is preserved, but the supplied snapshot contains unfinished TS presentation routes/templates (including the TS result/structure path). It is not covered by the TriCleaver acceptance claim. BLAST is disabled in the original startup configuration and requires a separately selected database to enable; no BLAST database is needed for the reproduced default workflow. The archived `WS/tri_cleaver_cli.py` is a legacy stub, not the supported launch command; use `runserver.py` or Nick's separate upstream CLI release.

The startup command serves the original single-process local web application. GitHub Pages cannot execute Flask, SQLite jobs or Windows executables. Internet-facing production hosting requires a separately reviewed hosting configuration; this installation guide verifies local Windows operation.
