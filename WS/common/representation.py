import numpy as np
from ..folding_constraints import single_nucleotide_constraint_lut, paired_nucleotide_constraint_lut
from ..utility import prefix_sum, arg_sort


class SCC():
    def __init__(self, name, strands, positions, constraints, mismatches=[]):
        self.name = name
        self.size = len(name) #1 for unpaired, 2 for paired
        self.strands = strands
        self.positions = positions
        if self.size == 2:
            self.constraints = list(zip(constraints[0], constraints[1][::-1]))
        elif self.size == 1:
            self.constraints = list(constraints[0])

        self.length = len(self.constraints)
        self.mismatches = mismatches
        self.bccs = list()
             
class Segment():
    def __init__(self, name, length, strand, pos, seq):
        self.name = name
        self.length = length
        self.strand = strand
        self.pos = pos
        self.seq = seq

################

def determine_segment_positions(segment_names):
    '''
    Determines the positions of an ordered list of segments with respect to the 5' end of the strand
        
    Parameters:
        segment_names (list of strings)
            
    Returns:
        segment_positions (dict). Maps segment names to their (0-indexed) position w.rt. to 5' end of strand
        
    '''
    segment_positions = dict()
    position = 0
    for name in segment_names:
        segment_positions[name] = position
        position += 1
            
    return segment_positions

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO CLEAN THIS UP BY CHANGING THE update_bccs function
def initialize_sequence(sccs):
    '''
    DESCRIPTION IN PROGRESS

    build_sccs generates SCCs with no blank bccs. If this is the first generation, update_bccs will sample them from the corresponding set of valid nucleotide assigments.
    '''

    for scc in sccs:
        scc.bccs = update_bccs(None, scc.length, scc.valid_nucs)
    return sccs


def update_bccs(old_bccs, length, valid_nucs):
    '''
    Updates a list of base connected components (BCCs)
    If the provided bccs == None, assigns random valid nucleotides for each BCC
    Otherwise, only assigns random nucleotides to BCCs that violate their constraint

    Parameters:
        old_bccs (list of BCC objects): The BCCs of the previous generation. Value is None if this is the first generation
        length (int): The number of elements in the BCC (i.e. number of bases or base-pairs)
        valid_nucs (list of list of strings): Each entry in the list is a list of allowed nucleotide / nucleotide pairs that the corresponding bcc in the bccs list can assume
            
    Returns:
        bccs (list of BCC objects): The updated list of BCCs
    '''

    bccs = list()

    #This condition is true only during the first generation (EA initialization)
    if old_bccs == None:            
        for i in range(length):
            bccs.append( np.random.choice(valid_nucs[i]) )
        return bccs
        
    assert(len(old_bccs) == length) #I'm assuming this will fail during the post processing rzbs extension

    #Handle bccs that may become invalid when an RzBS mutation changes the set of valid assignments
    for i in range(length):
        if old_bccs[i] not in valid_nucs[i]:
            bccs.append( np.random.choice(valid_nucs[i]) )
        else:
            bccs.append(old_bccs[i])
    return bccs

def determine_valid_nucleotide_assignments(constraints, mismatches, length, size):
    '''
    Based on the SCC's constraints, generates a set of valid nucleotide assignments

    Parameters:
        constraints (list of pairs / chars): If the SCC is of size 1 (unpaired), each element in the constraints list is a single character representing the constraint of an unpaired nucleotide. If the SCC is of size 2 (paired), each element is a pair representing the pairs of constraints of a pair of nucleotides
        mismatches (list of ints): A list of positions where we want to the nucleotides to be non-complementary. Only applicable to SCCs of size 2
        length (int): Number of elements (bases / base-pairs) in the SCC
        size (int): Whether the SCC represented an isolated segment (size 1) or a pair of reverse complementary segments (size 2)

    Returns:
        valid_nucs (list of list of strings): List of allowed nucleotide / nucleotide pair characters for each nucleotide / nucleotide pair in the constraint 
    '''

    valid_nucs = list()
    for i in range( length ):
        if size == 1: #unpaired                
            cur_valid = single_nucleotide_constraint_lut( constraints[i] )
        else:
            bool_mismatch = i in mismatches
            cur_valid = paired_nucleotide_constraint_lut( constraints[i][0], constraints[i][1], bool_mismatch )
        valid_nucs.append( cur_valid )
    return valid_nucs

def build_bcc_to_scc_map(lengths):
    '''
    Builds a positional map from nucleotide connected components to segment connected components to be used by the mutation operator.

    Parameters:
        lengths (list of ints): The number of nucleotide connected components in each segment connected component

    Returns:
        bcc_to_scc (dict): map from a 0-indexed scalar integer representing the global id of a bcc to a pair of integers representing the scc that contains it and its local id within that scc
    '''
    num_sccs = len(lengths)

    bcc_to_scc = dict()
    p_sum = [0] + prefix_sum(lengths)

    for scc_id in range(num_sccs):
        #local_id is the position of the ncc within the scc
        #global_id is the position of the ncc when the sccs are treated as a single contiguous element
        for local_id, global_id in enumerate( range(p_sum[scc_id], p_sum[scc_id+1]) ):
            bcc_to_scc[global_id] = (scc_id, local_id) 
    return bcc_to_scc

#Calculate mutation probs. These will change throughout the EA since the set of valid nucleotide assignments can change due to RzBS mutation
def calculate_mutation_probabilities(bcc_to_scc, sccs):
    num_bccs = len(bcc_to_scc)

    weights = list()
    for i in range(num_bccs):
        (scc_id, bcc_id_loc) = bcc_to_scc[i]
        scc = sccs[scc_id]
        cur_valid = scc.valid_nucs[bcc_id_loc]
        if scc.size == 1: # unpaired
            weight = len(cur_valid) - 1  # -1 because we care about the #of valid bccs that a bcc can mutate into 
        else:
            weight = ( len(cur_valid) - 1 ) / float(2) #/2 because each base pair contains 2 bases
        weights.append(weight)
    denom = sum(weights)
    mutation_prob = [w/float(denom) for w in weights]

    return mutation_prob


################

def generate_segments(sccs, num_strands):
    '''
    Generates segments from segment connected components (SCCs)
    Each SCC specifies either an isolated segment or a pair of reverse complementary segments 

    Parameters:
        sccs (list of SCC objects): The segment connected components
        num_strands (int): Number of strands in the sRz representation (should always be 3)

    Returns:
        segments (list of Segment objects): List of segment objects sorted by strand id first and then by that segment's position within that strand
    '''

    unordered_segments = list()
    for scc in sccs:
        if scc.size == 1: #unpaired
            sequence = ''.join(scc.bccs)
            segment = Segment(scc.name[0], scc.length, scc.strands[0], scc.positions[0], sequence)
            unordered_segments.append(segment)
        elif scc.size == 2:
            sequence_1 = list()
            sequence_2 = list()
            for bcc in scc.bccs:
                sequence_1.append(bcc[0])
                sequence_2.append(bcc[1])
            sequence_2 = sequence_2[::-1]
            sequence_1 = ''.join(sequence_1)
            sequence_2 = ''.join(sequence_2)
            segment_1 = Segment(scc.name[0], scc.length, scc.strands[0], scc.positions[0], sequence_1)
            segment_2 = Segment(scc.name[1], scc.length, scc.strands[1], scc.positions[1], sequence_2)
            unordered_segments += [segment_1, segment_2]
                         
    #Sort segments baesd on their position in their corresponding strand
    segments = list()
    for i in range(num_strands):
        strand_segments = [seg for seg in unordered_segments if seg.strand == i]
        sorted_idxs = arg_sort([seg.pos for seg in strand_segments])
        for idx in sorted_idxs:
            segments.append( strand_segments[idx] )
    return segments


def generate_strands(segments, num_strands):
    '''
    For each strand, concatenates the segment sequences into a single sequence

    Parameters:
        segments (list of Segment objects)
        num_strands (int): Number of strands in the sRz representation (should always be 3 for TC)

    Return:
        strands (list of strings): List containg the sequence of each strand

    '''

    strands = list()
    for sd_id in range(num_strands):
        strand = ''
        strand_segs = [seg for seg in segments if seg.strand == sd_id]
        for seg in strand_segs:
            strand += seg.seq
        strands.append(strand)
    return strands

def build_base_maps(segments):
    '''
    Consider a sequence of sum(lengths) length partitioned into len(lengths) subsequences where the length of subsequence i is lengths[i]
    An element in the sequence has a global position within that sequence as well as a local position within its subsequence
    This function builds maps between these local and global coordinates 

    Parameters: 
        segments (list of Segment objects)

    Returns:
        base_to_seg (dict). Map from integer global nucleotide position to pair (position of the segment within the strand, position of base within that segment) 
        name_to_bases (dict). Map from string segment name to list of nucleotides in that segment in terms of their global posiiton on the strand
    '''

    lengths = [seg.length for seg in segments]
    names = [seg.name for seg in segments]
    num_segs = len(lengths)

    name_to_bases = dict()
    base_to_seg = dict()
    p_sum = [0] + prefix_sum(lengths)
    p_sum = [p + 1 for p in p_sum] #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO: Explain why we 1-index this

    for seg_id in range(num_segs):
        seg_ids_global = list(range(p_sum[seg_id], p_sum[seg_id+1]))
        for local_id, global_id in enumerate(seg_ids_global):
            base_to_seg[global_id] = (seg_id, local_id) 
        name_to_bases[names[seg_id]] = seg_ids_global 

    return base_to_seg, name_to_bases
