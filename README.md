# Ribogate Web deployment archive

This repository preserves the local Flask web application containing **TriCleaver** and **TruthSeqEr**, for reproducible setup and future deployment. It is a deployment archive, not the official upstream release or a claim of original authorship.

## Provenance and attribution

- The original TriCleaver research software and associated Ribogate web application are attributed to **Nicholas Kamel**. Related public algorithm repository: https://github.com/nickkamel/TriCleaver.
- Research laboratory: **Kharma Lab, Concordia University**, as identified by the repository custodian. This attribution does not imply institutional endorsement or determine legal ownership.
- This snapshot was supplied from the local `Desktop/Ribogate` project on 2026-10-16. That directory contained no Git history, so its upstream commit and complete copyright ownership could not be established.
- Repository maintainer: **chemoautotroph**, preserving and adapting the supplied project for deployment. Original algorithm and interface authorship is not claimed by this maintainer.
- Existing third-party notices in bundled JavaScript, CSS and fonts are retained; those components remain subject to their respective terms.
- No project-wide license was supplied with this local snapshot. This archive does not grant a new license or establish redistribution rights. Attribution is not a substitute for permission. Copyright remains with the respective rights holders; confirm applicable permissions before reuse or redistribution.

## What this snapshot contains

Flask routes, HTML templates, static assets, authentication, SQLite models, a background job scheduler, TriCleaver and TruthSeqEr code, and sample input sequences. This is a legacy research application, not a hardened production service.

It differs from the public TriCleaver CLI: this snapshot uses an extended hammerhead template and different reporting defaults. Do not assume its design results reproduce the CLI release. Algorithm defaults are preserved here.

## Windows setup (PowerShell)

Use Python 3.9, matching the supplied environment. Create and activate an isolated environment, then:

```powershell
pip install -r requirements.txt
$env:RIBOGATE_SECRET_KEY = 'set-a-long-random-value'
$env:RIBOGATE_VIENNA_PATH = 'C:\path\to\ViennaRNA'
python create_db.py
python runserver.py --server-name=127.0.0.1:8000 --send-emails=false
```

Open http://127.0.0.1:8000/signup to create your own account, log in, then visit `/TC`. Email is disabled by default; new accounts are confirmed locally. No account or password is shipped.

The customized `RNAFold.exe`, `RNACofold.exe`, `RNAFold300.exe`, and `RNACofold300.exe` must exist at `RIBOGATE_VIENNA_PATH`. The upstream CLI repository documents and supplies these customized binaries; normal ViennaRNA binaries may not provide the console probability output expected here. Binaries are not included in this archive.

Set `RIBOGATE_PORT` to change the port and include the same port in `--server-name`. Environment variables are documented in `.env.example`; that file is documentation and is not automatically loaded. For email, configure sender and service keys explicitly and enable `--send-emails=true`.

## Packaging changes and exclusions

- Replaced embedded email credentials and Flask secret with environment configuration.
- Made host, port, ViennaRNA path, BLAST path and administrator address configurable; defaults bind to localhost with email disabled.
- Converted nonportable local wheel paths to package version pins.
- Excluded user databases, sessions, historical jobs, pickle data, logs, generated outputs, caches, IDE artifacts and thesis PDFs.
- Fixed an undefined email body variable in the SMTP2GO branch.

Original local data is not part of this repository. Back up databases separately and privately. Run the server as a single application process: its scheduler starts inside that process, and running multiple copies can duplicate scheduling. Internet deployment requires a separate review of authentication, authorization, CSRF protection and deployment architecture; the bundled development server should be used for local access.

## Validation scope

Source compilation and clean-database web smoke checks are performed during packaging. Full scientific design runs, outbound email, BLAST and production hosting are not validated by this archive.
