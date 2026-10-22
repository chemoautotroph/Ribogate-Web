'''
Interfaces with a customized version of Vienna RNA.
This code could be modified to interface with other folders, so look as they output 1) a base-pairing probability matrix (BPPM) and 2) a MFE dot-bracket structure
'''

import subprocess
import os
import re
from pathlib import Path
from collections import defaultdict

def parse_dot_bracket(dot_bracket):
    '''
    Parses a dot bracket string into an adjacency dictionary. 
    The adj dict is currently unused 
    '''

    partners = dict()
    strands = dot_bracket.split('&')
    num_strands = len(strands)

    pairs = list()
    bracket_stack = list()
    for strand_id, strand in enumerate(strands):
        for base_id,bracket_char in enumerate(strand):
            base_name = (strand_id, base_id+1)
            if bracket_char == "(":
                bracket_stack.append(base_name)
            else:
                if bracket_char == ")":
                    partner = bracket_stack.pop()
                elif bracket_char == ".": #Unpaired
                    partner = (None, None)

                pairs.append((partner,base_name)) #non symmetric and out of order (for example, if we have (...), the () pair will be added after the dots
                partners[base_name] = partner
                if bracket_char != ".": #we don't want symmetry for the dummy (None, None) values
                    partners[partner] = base_name #symmetry
    return partners

def fold(tasks, bool_300, folding_temp, num_strands, vienna_path):
    '''
    Calls a modified version of Vienna via subprocess and parses the results that would be outputted to the console.
    Normally, Vienna generates a dot.ps file storing the square root of the probabibility of two nucleotides being paired.
    Only pairs of nucleotides with a pairing probability exceeding a certain threshold are saved the file.
    However, writing all these dot.ps files to the disk and reading them becomes a massive bottleneck.
    Therefore, I modified the C source code of Vienna to output these probabilites to the console instead of the file.
    This was an ugly hack but it worked.
    I also added delimters such as "BPPM_START" and "BPPM_END" to the Vienna source to make parsing the output easier.

    TO DO: Configure and use the Vienna Python bindings instead of the above approach (I remember having trouble doing this on Windows)
    Also, before committing to the bindings, do a performance A/B test because this is a critical bottleneck of the EA.

    I wanted to define vienna_path as a global variable in app.config, 
    This seems to initially work, but after a while app.config['VIENNA_PATH'] becomes undefined. 
    I think the cause is the multi-processing, but its difficult to debug.
    Therefore I pass vienna_path as a parameter, which is uglier. 

    If 1 strand is selected, RNAFold is used.
    If 2 strands are selected, RNACofold is used.

    One issue with Vienna is that that by default loops are limited to 30 nucleotides.
    This causes the EA to design fictitious ribogates by exploiting this limitation.
    Therefore, I changed the MAXLOOP parameter to 300 in energy_const.h and recompiled the source code
    However, this version is a few times slower than the MAXLOOP = 30.
    I'm not sure if this is because largers loops are slower to fold or because I compiled the source in a suboptimal way.
    Therefore, I have do versions of RNAFold and RNACofold: the vanilla version and the '300' version.
    '''

    if os.name != 'nt':
        return fold_linux(tasks, bool_300, folding_temp, num_strands, vienna_path)
    input_data = ''
    for task in tasks:
        seq        = task[0]
        constraint = task[1]
        input_data = input_data + seq + "\n" + constraint + "\n"
    input_data     = input_data[:-1] #Get rid of the last newline

    if bool_300 == 1:
        str300   = '300'
    else:
        str300   = ''
    if num_strands == 1:
        app_name = "\\RNAfold"
    else:
        app_name = "\\RNACofold"

    p1 = subprocess.Popen([vienna_path + app_name + str300 + ".exe","-p","-C","--noPS","--bppmThreshold=1e-5", "--temp=" + str(folding_temp)], stdin=subprocess.PIPE,stdout=subprocess.PIPE)   
    
    input_data    = str.encode(input_data)
    results       = p1.communicate(input=input_data)[0]
    #results_lines = results.split('\r\n')
    results_lines = results.decode().split('\r\n')
    results_lines = results_lines[:-1] #Get rid of the last newline

    results_starts = list()
    for line_idx, line in enumerate(results_lines):
        if line == "Secondary structure":
            results_starts.append(line_idx)
    results_starts.append(len(results_lines)) #Adds a virtual start id for what would be the next result

    num_results = len(results_starts) - 1

    processed_results = list()
    for i in range(num_results):
        result_lines = results_lines[results_starts[i]:results_starts[i+1]]
        #print(result_lines)

        mfe_db       = result_lines[1]
        mfe_ad       = parse_dot_bracket(mfe_db) #Currently unused
        mfe_energy   = float(result_lines[3])
        if num_strands == 1:
            ens_div      = float(result_lines[-1])

        for line_idx, line in enumerate(result_lines):
            if line == "BPPM start":
                bppm_start_line_idx = line_idx + 1
            if line == "BPPM end":
                bppm_end_line_idx   = line_idx - 1

        #print(bppm_start_line, bppm_end_line)
        bppm     = defaultdict(int)
        adj_dict   = dict()
        #num_bases = len(seq) #This will fail for variable length sequences like the case of verification tasks with variable length inputs
        num_bases = len(tasks[i][0]) 
        for i in range(num_bases):
            adj_dict[i + 1] = list()
        for line_idx in range(bppm_start_line_idx, bppm_end_line_idx + 1):
            line = result_lines[line_idx]
            split = line.split('\t')
            base_id1 = int(split[0])
            base_id2 = int(split[1])
            prob = float(split[2]) ** 2 #The values given in the ps file are the sqrt of the probability
            bppm[(base_id1, base_id2)] = prob
            bppm[(base_id2, base_id1)] = prob
            adj_dict[base_id1].append(base_id2)
            adj_dict[base_id2].append(base_id1)
        for base_id1 in adj_dict.keys():
            paired_sum = 0
            for base_id2 in adj_dict[base_id1]:
                paired_sum += bppm[(base_id1, base_id2)]
            unpaired_prob = 1 - paired_sum

            bppm[(base_id1, None)]  = unpaired_prob
            bppm[(None, base_id1 )] = unpaired_prob

        if num_strands == 1:
            processed_results.append((mfe_db, bppm, mfe_ad, mfe_energy, ens_div))
        else:
            processed_results.append((mfe_db, bppm, mfe_ad, mfe_energy)) #RNA CoFold doesn't output an ensemble diversity value
    return processed_results


def fold_linux(tasks, large, temperature, strands, directory):
    """Read the native 2.3.5 CLI output and the patched stdout probability list."""
    name = ('RNAfold' if strands == 1 else 'RNAcofold') + ('300' if large else '')
    payload = ''.join(sequence + '\n' + constraint + '\n' for sequence, constraint in tasks)
    result = subprocess.run(
        [str(Path(directory) / name), '-p', '-C', '--noPS', '--bppmThreshold=1e-5',
         '--temp=' + str(temperature)], input=payload, text=True, capture_output=True,
        timeout=int(os.environ.get('RIBOGATE_FOLD_TIMEOUT', '300')), check=True)
    lines = result.stdout.splitlines()
    starts = [i for i, line in enumerate(lines) if re.fullmatch('[ACGUTN&]+', line)]
    if len(starts) != len(tasks):
        raise RuntimeError('Native ViennaRNA returned an unexpected number of structures')
    starts.append(len(lines))
    outputs = []
    for index, (begin, end) in enumerate(zip(starts, starts[1:])):
        block = lines[begin:end]
        match = re.fullmatch(r'([.()&]+)\s+\(\s*([-+0-9.]+)\)', block[1])
        if not match:
            raise RuntimeError('Invalid native ViennaRNA MFE output')
        structure, energy = match.group(1), float(match.group(2))
        if len(structure.replace('&', '')) != len(tasks[index][0].replace('&', '')):
            raise RuntimeError('Native ViennaRNA structure length mismatch')
        probabilities = defaultdict(int)
        for line in block[block.index('BPPM start') + 1:block.index('BPPM end')]:
            first, second, square_root = line.split()
            a, b = int(first), int(second)
            probabilities[a, b] = probabilities[b, a] = float(square_root) ** 2
        # Retain the legacy indexing, including its unused terminal '&' slot.
        for base in range(1, len(tasks[index][0]) + 1):
            unpaired = 1 - sum(p for (a, b), p in probabilities.items() if a == base and b is not None)
            probabilities[base, None] = probabilities[None, base] = unpaired
        output = (structure, probabilities, parse_dot_bracket(structure), energy)
        if strands == 1:
            diversity = re.search(r'ensemble diversity\s+([-+0-9.]+)', '\n'.join(block))
            if not diversity:
                raise RuntimeError('Missing native ViennaRNA ensemble diversity')
            output += (float(diversity.group(1)),)
        outputs.append(output)
    return outputs

