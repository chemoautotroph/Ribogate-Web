"""Download the pinned upstream executables; never silently accept different bytes."""
import argparse
import hashlib
import json
from pathlib import Path
import os
import sys
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
MANIFEST = ROOT / 'vienna-manifest.json'


def verify_binaries(directory):
    manifest_path = MANIFEST if os.name == 'nt' else Path(directory) / 'linux-manifest.json'
    manifest = json.loads(manifest_path.read_text(encoding='utf-8'))
    for item in manifest['files']:
        path = Path(directory) / item['name']
        if not path.is_file():
            raise RuntimeError(f'Missing {path}. Run python scripts/install_vienna.py')
        data = path.read_bytes()
        if len(data) != item['size'] or hashlib.sha256(data).hexdigest() != item['sha256']:
            raise RuntimeError(f'Checksum mismatch: {path}. Expected the pinned customized executable.')
    return manifest


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--destination', type=Path, default=ROOT / 'vienna_rna_binaries')
    parser.add_argument('--check-only', action='store_true')
    args = parser.parse_args()
    if sys.platform != 'win32':
        parser.error('This reproduction target requires Windows; these are Windows executables.')
    if not args.check_only:
        args.destination.mkdir(parents=True, exist_ok=True)
        for item in json.loads(MANIFEST.read_text())['files']:
            path = args.destination / item['name']
            if path.exists() and hashlib.sha256(path.read_bytes()).hexdigest() == item['sha256']:
                continue
            request = urllib.request.Request(item['url'], headers={'User-Agent': 'Ribogate-Web-installer'})
            with urllib.request.urlopen(request, timeout=120) as response:
                data = response.read()
            if len(data) != item['size'] or hashlib.sha256(data).hexdigest() != item['sha256']:
                raise RuntimeError('Downloaded checksum mismatch: ' + item['name'])
            temporary = path.with_suffix('.download')
            temporary.write_bytes(data)
            os.replace(temporary, path)
            print('Downloaded and verified', item['name'])
    verify_binaries(args.destination)
    print('All four customized ViennaRNA executables match the pinned manifest.')


if __name__ == '__main__':
    main()
