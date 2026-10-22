"""Build pinned ViennaRNA 2.3.5 with stdout BPPMs and both loop limits."""
import argparse
import hashlib
import json
import os
from pathlib import Path
import shutil
import subprocess
import tarfile
import urllib.request

ROOT = Path(__file__).resolve().parents[1]
URL = 'https://www.tbi.univie.ac.at/RNA/download/sourcecode/2_3_x/ViennaRNA-2.3.5.tar.gz'
SHA256 = '26b62a00da21bc5597b580ab8fef4e624234ec446d7d3cb0ce22803a5d7074ca'


def replace_once(path, before, after):
    text = path.read_text()
    if text.count(before) != 1:
        raise RuntimeError('Unexpected upstream source: ' + str(path))
    path.write_text(text.replace(before, after))


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument('--build-dir', type=Path, required=True)
    parser.add_argument('--destination', type=Path, default=ROOT / 'vienna_rna_binaries')
    args = parser.parse_args()
    args.build_dir.mkdir(parents=True, exist_ok=True)
    args.destination.mkdir(parents=True, exist_ok=True)
    archive = args.build_dir / 'ViennaRNA-2.3.5.tar.gz'
    if not archive.exists():
        with urllib.request.urlopen(URL, timeout=120) as response:
            archive.write_bytes(response.read())
    if hashlib.sha256(archive.read_bytes()).hexdigest() != SHA256:
        raise RuntimeError('ViennaRNA source checksum mismatch')
    files = []
    for loop_limit in (30, 300):
        build = args.build_dir / ('maxloop-' + str(loop_limit))
        if build.exists():
            raise RuntimeError('Build directory already exists: ' + str(build))
        build.mkdir()
        with tarfile.open(archive) as stream:
            stream.extractall(build, filter='data')
        source = build / 'ViennaRNA-2.3.5'
        # Only output plumbing and the original MAXLOOP customization change.
        for filename, before, array, target in (
            ('RNAfold.c', 'vrna_plot_dp_EPS(filename_dotplot, orig_sequence, pl1, pl2, NULL, VRNA_PLOT_PROBABILITIES_DEFAULT);', 'pl1', 'output'),
            ('RNAcofold.c', '(void)vrna_plot_dp_PS_list(seq, cp, filename_dot, prAB, mfAB, "doof");', 'prAB', 'stdout'),
        ):
            after = ('{\n  fprintf(' + target + ', "BPPM start\\n");\n'
                     '  for (int bp = 0; ' + array + '[bp].i; bp++)\n'
                     '    fprintf(' + target + ', "%d\\t%d\\t%.9f\\n", '
                     + array + '[bp].i, ' + array + '[bp].j, sqrt(' + array + '[bp].p));\n'
                     '  fprintf(' + target + ', "BPPM end\\n");\n}')
            replace_once(source / 'src/bin' / filename, before, after)
        if loop_limit == 300:
            replace_once(source / 'src/ViennaRNA/energy_const.h', '#define MAXLOOP 30', '#define MAXLOOP 300')
        command = ['./configure', '--without-perl', '--without-python', '--without-python3',
                   '--without-swig', '--without-doc', '--without-kinfold', '--without-forester',
                   '--without-svm', '--without-gsl', '--without-check', '--disable-openmp',
                   '--disable-lto', '--disable-shared', 'CFLAGS=-O2 -fcommon']
        log = args.build_dir / ('build-' + str(loop_limit) + '.log')
        with log.open('w') as out:
            subprocess.run(command, cwd=source, stdout=out, stderr=subprocess.STDOUT, check=True)
            subprocess.run(['make', '-j2'], cwd=source, stdout=out, stderr=subprocess.STDOUT, check=True)
        for binary in ('RNAfold', 'RNAcofold'):
            name = binary + ('300' if loop_limit == 300 else '')
            destination = args.destination / name
            shutil.copy2(source / 'src/bin' / binary, destination)
            destination.chmod(0o755)
            files.append({'name': name, 'size': destination.stat().st_size,
                          'sha256': hashlib.sha256(destination.read_bytes()).hexdigest()})
        print('Built MAXLOOP=' + str(loop_limit), flush=True)
    manifest = {'platform': 'Linux', 'version': '2.3.5', 'source_url': URL,
                'source_sha256': SHA256, 'maxloops': [30, 300],
                'upstream_commit': 'ViennaRNA-2.3.5', 'files': files}
    (args.destination / 'linux-manifest.json').write_text(json.dumps(manifest, indent=2) + '\n')


if __name__ == '__main__':
    main()
