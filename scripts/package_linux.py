"""Build an offline Linux installation package from the verified source tree."""
import hashlib
import json
from pathlib import Path
import subprocess
import sys
import tarfile
import zipfile
from email.parser import BytesParser

ROOT=Path(__file__).resolve().parents[1]
destination=ROOT/'dist/linux-package'
wheels=destination/'wheels'
wheels.mkdir(parents=True,exist_ok=True)
subprocess.run([sys.executable,'-m','pip','wheel','--require-hashes','--no-build-isolation',
               '-r',str(ROOT/'requirements-linux.lock'),'--wheel-dir',str(wheels)],check=True)
subprocess.run([sys.executable,'-m','pip','download','--no-deps','--only-binary=:all:',
               'pip==26.2.2','--dest',str(destination)],check=True)
lines=['# Offline wheel artifacts; generated from requirements-linux.lock.']
for wheel in sorted(wheels.glob('*.whl')):
    with zipfile.ZipFile(wheel) as archive:
        metadata=BytesParser().parsebytes(archive.read(next(p for p in archive.namelist() if p.endswith('.dist-info/METADATA'))))
    lines.append(metadata['Name']+'=='+metadata['Version']+' --hash=sha256:'+hashlib.sha256(wheel.read_bytes()).hexdigest())
(destination/'requirements-offline.lock').write_text('\n'.join(lines)+'\n')
with tarfile.open(destination/'application.tar.gz','w:gz') as archive:
    for p in sorted(ROOT.rglob('*')):
        relative=p.relative_to(ROOT)
        if any(part in {'.git','.venv','instance','__pycache__','dist','.linux-build'} for part in relative.parts):
            continue
        if p.is_file() and p.suffix not in {'.pyc','.exe','.log'} and not p.name.startswith('.env'):
            archive.add(p,arcname=relative,recursive=False)
paths=[p for p in sorted(destination.rglob('*')) if p.is_file() and p.name!='SHA256SUMS']
(destination/'SHA256SUMS').write_text(''.join(hashlib.sha256(p.read_bytes()).hexdigest()+'  '+str(p.relative_to(destination))+'\n' for p in paths))
print('Offline package:',destination)
