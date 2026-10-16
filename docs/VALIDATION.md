# Reproduction validation

Original research credit: **Nicholas (Nick) Kamel**. This records deployment verification, not new research results.

## Environment and method

Validated on **2026-10-16**, Windows 10 x64, build **10.0.19045**, using CPython **3.9.19** and the **54 distributions** pinned in `requirements.lock`.

Two installation paths were exercised:

1. A new venv created from an existing Python 3.9.19 interpreter, with the pinned package versions installed independently of the original Ribogate environment.
2. A separate clean source directory whose path contained spaces, containing only public repository files. The default PowerShell setup downloaded the pinned Astral standalone Python build, created a new venv, installed hash-locked dependencies, downloaded and verified the four upstream ViennaRNA executables, initialized private configuration/database and completed its acceptance checks. No files, users, keys, sessions, database or binaries were copied from the old Ribogate installation. Pip reused cached artifact downloads where available; these remained subject to lockfile hash checks.

The second test ran on the same Windows host, not on an independently provisioned VM or physical machine. It verifies the automated clean-environment path, including the portable interpreter, rather than asserting compatibility with every Windows configuration.

Pinned Python archive SHA-256: `db39a9da42deccdbada78ab3c39fa4d0b1e8957c3cc73447bf400386e0bfb3cc`.

`requirements.lock` SHA-256: `a572a418154d5d50dbba1fd26ebc890051c10b6770958057dae0fcb5e8159eb6`.

Customized ViennaRNA source commit: `443b4f4f7d3f961d3b86a7e764fc9721c34fe591` in `nickkamel/TriCleaver`; exact binary hashes are in `vienna-manifest.json`.

## Checks passed

| Check | Evidence |
| --- | --- |
| Python bootstrap | Downloaded archive matched the pinned upstream checksum; interpreter reported 3.9.19 x64 |
| Dependencies | All locked packages installed; `pip check` reported no broken requirements |
| Folding binaries | All four checksums matched; each executable returned a parseable structure and base-pair probability matrix |
| Authentication | Clean-database signup/login and anonymous-access redirect |
| Input validation | Both real TriCleaver submission steps, including CSRF token |
| Scheduling/calculation | Queued **8-individual / 4-generation** job completed using actual customized folding programs |
| Results | Eight debug results returned, with result HTML/JSON and structural states |
| Download | Returned XLSX parsed as a workbook ZIP containing `xl/workbook.xml` |
| Persistence | After server restart, the test user could log in and retrieve the completed job and workbook |
| Email application flow | Mocked SendGrid/SMTP2GO adapters, provider rejection, confirmation link/account confirmation and password-reset flow passed; no messages sent |

The end-to-end test also checks the JS/CSS files referenced by the result/structure pages. After restoring version-matched missing theme/font files, the final smoke test additionally checks image/font URLs referenced by those stylesheets.

Run `scripts/setup.ps1` on the destination machine to repeat these checks. `scripts/smoke_test.py` produces a local `smoke-test-report.json`; test data is isolated in a temporary directory, and that report is ignored by Git. A sanitized record of the portable-runtime run is retained in [`validation-windows.json`](validation-windows.json).

## Scope

The acceptance target is installation and the **TriCleaver web workflow**. The test does not claim full 300-by-200 scientific convergence, identical random designs, actual mail delivery/inbox receipt, visual browser correctness, public production hosting or BLAST database behavior. TruthSeqEr code is archived but its unfinished legacy result/structure presentation is not part of the passed workflow. These boundaries describe the inherited snapshot and the test scope; the install guide does not promise missing original features.
