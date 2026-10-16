def single_nucleotide_constraint_lut(constraint_char):
    '''
    Look up table storing the allowed values a single nucleotide can assume given certain constraints
    '''

    lut = dict()
    lut['A'] = ['A']
    lut['U'] = ['U']
    lut['G'] = ['G']
    lut['C'] = ['C']
    lut['N'] = ['A', 'U', 'G', 'C']
    lut['H'] = ['A', 'U', 'C']

    return lut[constraint_char]

def paired_nucleotide_constraint_lut(constraint_char_0, constraint_char_1, bool_mismatch):
    '''
    Look up table storing the allowed values a pair of nucleotide can assume given certain constraints
    If a mismatch is specified, the values must be non-complementary
    '''

    lut = dict()
    lut[('N', 'N', False)] = ['GC', 'CG', 'GU', 'UG', 'AU', 'UA']
    lut[('N', 'N', True )] = ['GA', 'AG', 'GG', 'UU', 'CC', 'AA', 'AC', 'CA', 'UC', 'CU']
    lut[('G', 'N', False)] = [bp for bp in lut[('N', 'N', 0)] if bp[0] == 'G'] 
    lut[('H', 'N', False)] = [bp for bp in lut[('N', 'N', 0)] if bp[0] != 'G']
    lut[('N', 'H', False)] = [bp for bp in lut[('N', 'N', 0)] if bp[1] != 'G'] 
    lut[('G', 'C', False)] = ['GC'] 
    lut[('G', 'U', False)] = ['GU']
    lut[('C', 'G', False)] = ['CG'] 
    lut[('U', 'G', False)] = ['UG'] 
    lut[('U', 'A', False)] = ['UA'] 
    lut[('A', 'U', False)] = ['AU'] 
    lut[('N', 'C', False)] = ['GC'] 
    lut[('N', 'U', False)] = ['GU', 'AU'] 
    lut[('N', 'A', False)] = ['UA'] 
    lut[('N', 'G', False)] = ['UG', 'CG'] 
    lut[('N', 'G', True )] = ['AG', 'GG'] 
    lut[('N', 'C', True )] = ['AC', 'CC', 'UC'] 
    lut[('N', 'A', True )] = ['AA', 'CA', 'GA'] 

    return lut[(constraint_char_0, constraint_char_1, bool_mismatch)]

def generate_folding_constraint_string(seq_len, constrained_base_ids):
    '''
    Builds a constraint string to be used with Vienna RNA

    Parameters:
        seq_len (int): Length of the sequence to which the constraint applies
        constrained_base_ids (list of ints): Ids of the bases to be constrained as unpaired

    Returns:
        constraint (string): String where 'x' denotes corresponding base is forced unpaired and '.' denotes no constraint
    '''

    constraint = ''
    for b in range(1, seq_len + 1): #We add the +1 here because the constrained_base_ids are 1-indexed
        if b in constrained_base_ids:
            constraint += 'x'
        else:
            constraint += '.'
    return constraint



#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO REMOVE THIS FUNCTION ONCE IVE REMOVED ALL DEPENDENCIES
from .utility import prefix_sum #TO DO: Remove this after removing build_map
def build_map(lengths, bool1_idx): #whether the global coordinate system is 1-indexed or 0-indexed
    '''
    Consider a sequence of sum(lengths) length partitioned into len(lengths) subsequences where the length of subsequence i is lengths[i]
    An element in the sequence has a global position within that sequence as well as a local position within its subsequence
    This function builds maps between these local and global coordinates 

    Parameters: 
        lengths (list of ints): Lengths of the subsequences
        bool1_idx (int): Whether we want the global id to start at 0 or 1

    Returns:
        map_forward_h (list of lists): ith entry stores the global ids of the elements of the ith subsequence
        map_forward (dict): stores the global id (int) of a subsequence element in the form (subsequence id, local id within that subsequence)
        map_reverse (dict): stores the (subsequence id, local id) corresponding to a given global id
    '''

    map_forward = dict()
    map_forward_h = list() #Hierarchical
    map_reverse = dict()
    p_sum = prefix_sum(lengths)
    p_sum0 = [0] + p_sum
    if bool1_idx == 1:
        p_sum0 = [p + 1 for p in p_sum0]

    for i in range( len(p_sum) ): #for each segment
        seg_ids_global = list() #FH
        for local_id, global_id in enumerate( range(p_sum0[i], p_sum0[i + 1]) ):
            map_forward[(i, local_id)] = global_id #Foward map #ith segment, "local" ith base within segment
            map_reverse[global_id] = (i, local_id) 
            seg_ids_global.append(global_id)  
        map_forward_h.append(seg_ids_global) 
    return (map_forward_h, map_forward, map_reverse)



