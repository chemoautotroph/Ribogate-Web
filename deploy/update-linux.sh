#!/usr/bin/env bash
# Update TriCleaver from a locally verified offline package. iFold is untouched.
set -euo pipefail
umask 077
source_dir=$(cd -- "$(dirname -- "${BASH_SOURCE[0]}")/.." && pwd)
package="$source_dir/dist/linux-package"
google_client=''
if [[ $# -gt 0 ]]; then
  if [[ $# -ne 2 || $1 != --google-client ]]; then
    echo 'Usage: sudo bash deploy/update-linux.sh [--google-client /path/to/web-client.json]' >&2
    exit 1
  fi
  google_client=$(realpath -e -- "$2")
fi
[[ $EUID -eq 0 ]] || { echo 'Run this reviewed updater with sudo.' >&2; exit 1; }
[[ -d /opt/tricleaver/app && -d /opt/tricleaver/venv && -f /etc/tricleaver/environment ]]
[[ $(df --output=avail -B1 /opt/tricleaver | tail -1) -gt 8589934592 ]]
if [[ -n $google_client ]]; then
  python3 "$source_dir/deploy/configure-google.py" --check-only "$google_client"
fi
install -d -m 0755 /opt/tricleaver/releases
release=$(mktemp -d /opt/tricleaver/releases/update-XXXXXXXX)
chmod 0755 "$release"
install -d -m 0700 "$release/package" "$release/backup"
cp -R --no-preserve=mode,ownership -- "$package/." "$release/package/"
if [[ -n $google_client ]]; then
  install -m 0600 "$google_client" "$release/backup/google-client.json"
  google_client="$release/backup/google-client.json"
fi
package="$release/package"
(cd "$package" && sha256sum --quiet -c SHA256SUMS)
install -d -m 0755 "$release/app"
python3 - "$package/application.tar.gz" "$release/app" <<'PY'
import sys, tarfile
from pathlib import PurePosixPath
with tarfile.open(sys.argv[1]) as archive:
    for item in archive.getmembers():
        path = PurePosixPath(item.name)
        if not item.isfile() or path.is_absolute() or '..' in path.parts:
            raise SystemExit('Unexpected archive member; update refused.')
    archive.extractall(sys.argv[2], filter='data')
PY
python3 -m venv --without-pip "$release/venv"
PYTHONPATH="$package/pip-26.2.2-py3-none-any.whl" "$release/venv/bin/python" -m pip install \
  --no-index --only-binary=:all: --find-links="$package/wheels" --require-hashes \
  -r "$package/requirements-offline.lock"
chmod -R a+rX "$release/app" "$release/venv"
cd "$release/app"
runuser -u tricleaver -- env TMPDIR=/var/lib/tricleaver-data/tmp OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 \
  PYTHONDONTWRITEBYTECODE=1 "$release/venv/bin/python" scripts/verify_google_oauth.py
runuser -u tricleaver -- env TMPDIR=/var/lib/tricleaver-data/tmp OPENBLAS_NUM_THREADS=1 OMP_NUM_THREADS=1 \
  PYTHONDONTWRITEBYTECODE=1 "$release/venv/bin/python" scripts/smoke_test.py \
  --report /var/lib/tricleaver-data/tmp/update-smoke.json --timeout 300

# Refuse to interrupt queued or running designs. Recheck after stopping admission.
idle_check() {
  python3 - <<'PY'
import sqlite3
con=sqlite3.connect('file:/var/lib/tricleaver-data/db.sqlite?mode=ro',uri=True)
count=con.execute("SELECT count(*) FROM jobs WHERE status IN ('Queued','Running')").fetchone()[0]
con.close()
if count: raise SystemExit('Update postponed: wait for queued/running TriCleaver designs to finish.')
PY
}
idle_check
stopped=0
rollback() {
  trap - ERR
  set +e
  if [[ $stopped -eq 1 ]]; then
    systemctl stop tricleaver-web.service
    for component in app venv; do
      if [[ -e "$release/backup/previous-$component" || -L "$release/backup/previous-$component" ]]; then
        if [[ -L /opt/tricleaver/$component && $(readlink "/opt/tricleaver/$component") == "$release/$component" ]]; then
          unlink "/opt/tricleaver/$component"
        fi
        if [[ ! -e /opt/tricleaver/$component && ! -L /opt/tricleaver/$component ]]; then
          mv -T -- "$release/backup/previous-$component" "/opt/tricleaver/$component"
        fi
      fi
    done
    if [[ -f "$release/backup/environment" ]]; then
      install -m 0600 "$release/backup/environment" /etc/tricleaver/environment
    fi
    systemctl start tricleaver-web.service
  fi
  echo "Update failed. Previous service restored where possible; inspect $release and journalctl -u tricleaver-web." >&2
  exit 1
}
trap rollback ERR
systemctl stop tricleaver-web.service
stopped=1
idle_check
install -m 0600 /etc/tricleaver/environment "$release/backup/environment"
tar -czf "$release/backup/data-before.tar.gz" -C /var/lib/tricleaver-data .
mv -T -- /opt/tricleaver/app "$release/backup/previous-app"
mv -T -- /opt/tricleaver/venv "$release/backup/previous-venv"
ln -s "$release/app" /opt/tricleaver/app
ln -s "$release/venv" /opt/tricleaver/venv
if [[ -n $google_client ]]; then
  python3 /opt/tricleaver/app/deploy/configure-google.py "$google_client"
fi
systemctl start tricleaver-web.service
healthy=0
for attempt in $(seq 1 30); do
  if curl -fsS --max-time 2 -H 'Host: kharmalab.cloud' http://127.0.0.1:8000/tricleaver/healthz; then
    healthy=1
    break
  fi
  sleep 1
done
[[ $healthy -eq 1 ]]
trap - ERR
echo
echo "TriCleaver updated. Previous code, environment and data backup: $release/backup"
echo 'Google sign-in still requires a real browser round trip to verify Google Console configuration.'
