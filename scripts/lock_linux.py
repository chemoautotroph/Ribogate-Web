"""Resolve Linux runtime requirements into a hash lock without auditor dependencies."""
import json
from pathlib import Path
import subprocess
import sys
import urllib.request

ROOT=Path(__file__).resolve().parents[1]
report=ROOT/'dist/linux-resolution.json'
report.parent.mkdir(exist_ok=True)
subprocess.run([sys.executable,'-m','pip','install','--dry-run','--ignore-installed',
               '--report',str(report),'-r',str(ROOT/'requirements-linux.txt')],check=True)
lines=['# Linux / CPython 3.12; pinned PyPI artifacts, including transitive dependencies.']
for item in sorted(json.loads(report.read_text())['install'],key=lambda i:i['metadata']['name'].lower()):
    name,version=item['metadata']['name'],item['metadata']['version']
    with urllib.request.urlopen(f'https://pypi.org/pypi/{name}/{version}/json',timeout=30) as response:
        metadata=json.load(response)
    hashes=sorted({f['digests']['sha256'] for f in metadata['urls'] if not f['yanked']})
    if not hashes: raise RuntimeError(name)
    lines.append(name+'=='+version+' \\')
    lines.extend('    --hash=sha256:'+digest+(' \\' if i<len(hashes)-1 else '') for i,digest in enumerate(hashes))
(ROOT/'requirements-linux.lock').write_text('\n'.join(lines)+'\n')
print('Locked',len(json.loads(report.read_text())['install']),'Linux runtime packages')
