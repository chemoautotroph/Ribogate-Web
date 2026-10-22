# Ribogate Web deployment archive

**Original research credit: Nicholas (Nick) Kamel.**

Research affiliation: Kharma Lab, Concordia University.

This repository archives the existing Ribogate Flask web application, including **TriCleaver** and **TruthSeqEr**, solely to preserve the web interface and simplify future deployment. Nick's public [TriCleaver repository](https://github.com/nickkamel/TriCleaver) contains the command-line algorithm release but does not include the web application files archived here.

**Original research credit for TriCleaver and the associated Ribogate web application belongs to Nicholas (Nick) Kamel. The owner of this archive claims no authorship of, or research credit for, the original work.** This repository is a deployment archive, not an official upstream release.

## Provenance and attribution

- The original TriCleaver research software and associated Ribogate web application are attributed to **Nicholas Kamel**. Related public algorithm repository: https://github.com/nickkamel/TriCleaver.
- Research laboratory: **Kharma Lab, Concordia University**, as identified by the repository custodian. This attribution does not imply institutional endorsement or determine legal ownership.
- This snapshot was supplied from the local `Desktop/Ribogate` project on 2026-10-16. That directory contained no Git history, so its upstream commit and complete copyright ownership could not be established.
- The archive owner's role is limited to preserving the supplied files and making the deployment packaging changes documented below. These changes do not establish authorship of the original software.
- Existing third-party notices in bundled JavaScript, CSS and fonts are retained; those components remain subject to their respective terms.
- No project-wide license was supplied with this local snapshot. This archive does not grant a new license or establish redistribution rights. Attribution is not a substitute for permission. Copyright remains with the respective rights holders; confirm applicable permissions before reuse or redistribution.

## What this snapshot contains

Flask routes, HTML templates, static assets, authentication, SQLite models, a background job scheduler, TriCleaver and TruthSeqEr code, and sample input sequences. This is a legacy research application, not a hardened production service.

It differs from the public TriCleaver CLI: this snapshot uses an extended hammerhead template and different reporting defaults. Do not assume its design results reproduce the CLI release. Algorithm defaults are preserved here.

## Linux hosting

The Linux port supports Ubuntu 24.04 / Python 3.12 and mounts the application at
`https://kharmalab.cloud/tricleaver`. See [Linux installation and operations](docs/LINUX.md).
Native ViennaRNA 2.3.5 is built from checksum-pinned source with both MAXLOOP=30
and MAXLOOP=300, preserving the legacy folding model. The Linux dependency lock,
single-process Waitress web service, bounded serial workers, and systemd installation
are separate from the Windows packaging below. Original scientific defaults remain
300 individuals and 200 generations; verification uses 8 individuals and 4 generations.

## Reproduce on a new Windows machine

The supported target is **Windows x64 with Python 3.9.19**. Follow the complete [installation and recovery guide](INSTALL.md), including prerequisites, exact downloads, email configuration, acceptance checks and troubleshooting.

Download/clone this repository, open PowerShell in its directory, and run:

```powershell
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/setup.ps1
powershell -NoProfile -ExecutionPolicy Bypass -File scripts/start.ps1
```

Setup downloads and verifies a [pinned portable CPython 3.9.19 runtime](python-manifest.json) (no existing Python, Conda or administrator installation needed), creates an isolated environment, installs [hash-locked packages](requirements.lock), downloads and verifies [the four exact customized ViennaRNA binaries](vienna-manifest.json) from Nick's commit-pinned upstream repository, initializes private configuration/database, and runs a small real TriCleaver job through result export and restart verification. No manual copying from the original machine is required.

Open http://127.0.0.1:8000/signup, create your own account and log in. No account, password, email API key or historical user data is shipped. For email, add your own verified sender and provider key to the private `.env` as described in [INSTALL.md](INSTALL.md#4-email-provide-your-keys-privately). `.env` is loaded automatically; process environment variables override it.

Normal runs retain the original 300-individual / 200-generation configuration. Setup verification uses 8 individuals / 4 generations, actual folding executables and a temporary database. The reproduced target is the **TriCleaver web workflow**; legacy TruthSeqEr source is included, with its unfinished presentation routes documented in the installation guide. Algorithm randomness means installation reproducibility is not a promise of identical design sequences on every run.

## Packaging changes and exclusions

- Replaced embedded email credentials and Flask secret with environment configuration.
- Made host, port, ViennaRNA path, BLAST path and administrator address configurable; defaults bind to localhost with email disabled.
- Converted nonportable local wheel paths to package version pins.
- Excluded user databases, sessions, historical jobs, pickle data, logs, generated outputs, caches, IDE artifacts and thesis PDFs.
- Fixed an undefined email body variable in the SMTP2GO branch.
- Added persistent configuration, automatic table initialization, provider selection/validation and absolute job-completion links.
- Added exact upstream executable URLs/checksums, hash-locked dependencies, Windows setup/start scripts and isolated end-to-end verification.
- Corrected deployment blockers in job retention imports and EA insertion/final-status bookkeeping; made worker count configurable without changing scientific defaults.
- Restored missing version-matched theme images and font fallback; [third-party sources and notices](docs/THIRD_PARTY.md) are recorded separately.
- Replaced an unavailable landing-page background image reference with a CSS gradient; all research algorithm defaults remain unchanged.

Original local data is not part of this repository. Back up databases separately and privately. Run the server as a single application process: its scheduler starts inside that process, and running multiple copies can duplicate scheduling. Internet deployment requires a separate review of authentication, authorization, CSRF protection and deployment architecture; the bundled development server should be used for local access.

## Validation scope

See [the recorded validation](docs/VALIDATION.md). A clean Python environment passed actual folding, signup/login, a queued quick TriCleaver run, results/structure data, Excel export and restart persistence. Email adapters, confirmation and password reset are verified with mocked delivery. Full-size scientific runs, actual inbox delivery, visual browser rendering, unfinished TS presentation routes, BLAST and production hosting are outside this acceptance test.
