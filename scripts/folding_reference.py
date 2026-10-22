"""Capture Windows results or compare all native folding modes against them."""
import argparse
import importlib.util
import json
import random
from pathlib import Path

ROOT = Path(__file__).resolve().parents[1]
spec = importlib.util.spec_from_file_location('folding_adapter', ROOT / 'WS/vienna.py')
adapter = importlib.util.module_from_spec(spec)
spec.loader.exec_module(adapter)


def cases():
    rng = random.Random(20261022)
    sequences = ['GGGAAACCC', 'GGGGGGGG' + 'A' * 45 + 'GGGGGGGGAAACCCCCCCC' + 'A' * 45 + 'CCCCCCCC']
    sequences += [''.join(rng.choice('ACGU') for _ in range(n)) for n in (20, 50, 100, 180)]
    for large in (0, 1):
        for strands in (1, 2):
            for temperature in (20, 37, 60):
                for seq in sequences:
                    if strands == 2:
                        seq = seq[:len(seq)//2] + '&' + seq[len(seq)//2:]
                    for constrained in (False, True):
                        constraint = ''.join('&' if base == '&' else ('x' if constrained and i % 7 == 0 else '.')
                                             for i, base in enumerate(seq))
                        yield {'large':large, 'strands':strands, 'temperature':temperature,
                               'sequence':seq, 'constraint':constraint}


def result(case):
    raw = adapter.fold([(case['sequence'],case['constraint'])], case['large'], case['temperature'],
                       case['strands'], str(ROOT / 'vienna_rna_binaries'))[0]
    return {'structure':raw[0], 'energy':raw[3], 'diversity':raw[4] if len(raw)>4 else None,
            'bppm':{str(a)+','+str(b):p for (a,b),p in raw[1].items()}}


def main():
    parser = argparse.ArgumentParser()
    parser.add_argument('mode', choices=['capture', 'compare'])
    parser.add_argument('reference', type=Path)
    args = parser.parse_args()
    if args.mode == 'capture':
        records = [{'case':case, 'result':result(case)} for case in cases()]
        args.reference.write_text(json.dumps(records), encoding='utf-8')
        print('Captured', len(records), 'Windows folding cases')
    else:
        maximum = 0
        records = json.loads(args.reference.read_text())
        for index, record in enumerate(records):
            got, expected = result(record['case']), record['result']
            for key in ('structure','energy','diversity'):
                if got[key] != expected[key]:
                    raise AssertionError((index, key, got[key], expected[key], record['case']))
            for key in got['bppm'].keys() | expected['bppm'].keys():
                difference = abs(got['bppm'].get(key,0)-expected['bppm'].get(key,0))
                maximum = max(maximum,difference)
                if difference > 1e-6:
                    raise AssertionError((index,key,difference))
        print(json.dumps({'passed':True,'cases':len(records),'max_bppm_delta':maximum}))


if __name__ == '__main__':
    main()
