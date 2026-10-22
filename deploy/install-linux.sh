#!/usr/bin/env bash
# First installation only. No iFold, tunnel, firewall, DNS or SSH changes.
set -euo pipefail
umask 077
source_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
package="$source_dir/dist/linux-package"
if [[ $EUID -ne 0 ]]; then echo 'Run this reviewed installer with sudo.' >&2; exit 1; fi
for target in /opt/tricleaver /etc/tricleaver /var/lib/tricleaver-storage /var/lib/tricleaver-data; do
  if [[ -e "$target" ]]; then echo "Refusing to overwrite existing $target" >&2; exit 1; fi
done
for command in python3 systemctl systemd-analyze useradd runuser fallocate mkfs.ext4 tar sha256sum curl ss; do
  command -v "$command" >/dev/null
done
python3 -c 'import sys; assert sys.version_info[:2] == (3,12), "This package requires Python 3.12"'
[[ $(df --output=avail -B1 /var/lib | tail -1) -gt 8589934592 ]]
(cd "$package" && sha256sum --quiet -c SHA256SUMS)
if ss -lntH 'sport = :8000' | grep -q .; then echo 'Port 8000 is already occupied' >&2; exit 1; fi
if getent passwd tricleaver >/dev/null; then echo 'Service account already exists; inspect before installing' >&2; exit 1; fi
install -d -m 0755 /opt/tricleaver /opt/tricleaver/app
install -d -m 0700 /etc/tricleaver /var/lib/tricleaver-storage
install -d -m 0755 /var/lib/tricleaver-data
tar -xzf "$package/application.tar.gz" -C /opt/tricleaver/app --no-same-owner
python3 -m venv --without-pip /opt/tricleaver/venv
PYTHONPATH="$package/pip-26.2.2-py3-none-any.whl" /opt/tricleaver/venv/bin/python -m pip install \
  --no-index --only-binary=:all: --find-links="$package/wheels" --require-hashes \
  -r "$package/requirements-offline.lock"
chmod -R a+rX /opt/tricleaver
useradd --system --user-group --home-dir /var/lib/tricleaver-data --no-create-home --shell /usr/sbin/nologin tricleaver
fallocate -l 4G /var/lib/tricleaver-storage/data.ext4
mkfs.ext4 -q -m 0 /var/lib/tricleaver-storage/data.ext4
install -m 0644 /opt/tricleaver/app/deploy/var-lib-tricleaver-data.mount '/etc/systemd/system/var-lib-tricleaver\x2ddata.mount'
install -m 0644 /opt/tricleaver/app/deploy/tricleaver-web.service /etc/systemd/system/tricleaver-web.service
python3 - <<'PY'
from pathlib import Path
import secrets
p=Path('/etc/tricleaver/environment')
p.write_text('''RIBOGATE_PRODUCTION=true
RIBOGATE_HOST=127.0.0.1
RIBOGATE_PORT=8000
RIBOGATE_SERVER_NAME=kharmalab.cloud
RIBOGATE_URL_SCHEME=https
RIBOGATE_BASE_PATH=/tricleaver
RIBOGATE_DATA_DIR=/var/lib/tricleaver-data
RIBOGATE_VIENNA_PATH=/opt/tricleaver/app/vienna_rna_binaries
RIBOGATE_NUM_PROCESSES=2
RIBOGATE_QUICK_EA=false
RIBOGATE_STORE_JOBS_DAYS=14
RIBOGATE_MAX_JOB_SECONDS=21600
RIBOGATE_MAX_QUEUE_LENGTH=32
RIBOGATE_MAX_SEQUENCE_LENGTH=12000
RIBOGATE_ENABLE_TRUTHSEQER=false
RIBOGATE_SEND_EMAILS=false
RIBOGATE_EMAIL_SERVICE=sendgrid
SENDGRID_API_KEY=
SMTP2GO_API_KEY=
RIBOGATE_EMAIL_FROM=
RIBOGATE_ADMIN_EMAIL=
RIBOGATE_SECRET_KEY='''+secrets.token_hex(32)+'\n')
p.chmod(0o600)
PY
systemctl daemon-reload
systemd-analyze verify tricleaver-web.service 'var-lib-tricleaver\x2ddata.mount'
systemctl start 'var-lib-tricleaver\x2ddata.mount'
chown tricleaver:tricleaver /var/lib/tricleaver-data
chmod 0700 /var/lib/tricleaver-data
install -d -o tricleaver -g tricleaver -m 0700 /var/lib/tricleaver-data/tmp
cd /opt/tricleaver/app
runuser -u tricleaver -- env TMPDIR=/var/lib/tricleaver-data/tmp OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 \
  PYTHONDONTWRITEBYTECODE=1 /opt/tricleaver/venv/bin/python /opt/tricleaver/app/scripts/smoke_test.py \
  --report /var/lib/tricleaver-data/installation-smoke.json --timeout 300
systemctl enable 'var-lib-tricleaver\x2ddata.mount' tricleaver-web.service
systemctl start tricleaver-web.service
for attempt in $(seq 1 30); do
  if curl -fsS --max-time 2 -H 'Host: kharmalab.cloud' http://127.0.0.1:8000/tricleaver/healthz; then
    echo
    echo 'TriCleaver installed and healthy on 127.0.0.1:8000/tricleaver.'
    echo 'Add the Cloudflare published route described in docs/LINUX.md.'
    exit 0
  fi
  sleep 1
done
echo 'Service health check failed; inspect journalctl -u tricleaver-web.' >&2
exit 1
