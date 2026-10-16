from ..utility import avg, flatten
from ..vienna  import fold
from .fitness import calculate_on_off_viability_scores, calculate_mismatch_score
import numpy as np

def coarse_grain_phenotype(bppms, base_to_seg, extension_region_seg_ids, truth_vector, bool_l_segments):
    '''

    Coarse grains multiple base-pairing probability matrices (BPPMs) into their corresponding segment-pair magntiude matrices (SPMMs)
    The switchable ribozyme can be viewed as two components: the ribozyme (Rz) and the extension region (ER).
    We can subdivide the extension region into more fine-grained segments while keeping the ribozyme as a single abstract segment (Rz). This is called a high-level (H) segment partitioning.
    For example, in TS the H segments may be: Rz, OBS1, OBS2. In TC they could be Rz, L0, SENSOR, L1.
    Alternatively, we can subdivide both the extension region and the ribozyme into fine-grained segments. This is called a low-level (L) segment partitioning.
    For example, in TS the L segments could be Stem1A, C1, Stem2A, OBS1, OBS2, Stem2B, C2, etc.
    An SPPM encodes the relative weight of any two L or H segments being paired together.

    Arguments:
        bppms (list of dicts): One base-pairing probability matrix per state. bppm[i,j] stores the probability of nucleotides i and j being paired. bppm[i, None]  stores the probability of nucleotide i being unpaired
        base_to_seg (dict). Map from integer global nucleotide position to pair (position of the segment within the strand, position of base within that segment) 
        extension_region_seg_ids (list of ints): The positions of the extension regon segments in the strand
        truth_vector (boolean list): The target ribozyme condition (0 = inactive, 1 = active) in each state
        bool_l_segments (bool): If true coarse-grains using L-segments; if false uses H-segments. 

    Returns:
        spmms (mun_states X num_segs X num_segs numpy float array): One segment pair magnitude matrix for each state
    '''


    if bool_l_segments:
        num_segs = max( [v[0] for v in base_to_seg.values()]) + 1 
    else:
        num_segs = len(extension_region_seg_ids) + 1
        er_start_seg_id = min(extension_region_seg_ids)

    num_states = len(bppms)
    spmms = np.zeros(( num_states, num_segs, num_segs ))
    for state_id in range(num_states):
        for nucleotide_pair_key, pairing_prob in bppms[state_id].items(): #!!!! dict.items() is super slow if bppm is full!!!
            if None not in nucleotide_pair_key: #Ignore unpaired bases
                #Find the segment of each nucleotide in the pair
                seg1_id = base_to_seg[nucleotide_pair_key[0]][0]
                seg2_id = base_to_seg[nucleotide_pair_key[1]][0]
                if bool_l_segments:
                    if truth_vector[state_id] == 1:
                        #When the target output is 1, only consider interactions between the extension region segments.
                        if seg1_id in extension_region_seg_ids and seg2_id in extension_region_seg_ids:
                            spmms[state_id][seg1_id][seg2_id] += pairing_prob
                    else: #In states that output a 0, consider all possible segment interactions
                        spmms[state_id][seg1_id][seg2_id] += pairing_prob

                else:
                    '''
                    If we coarse-grain using high-level (H) segments, we consider two types of interactions:
                    1) An extension region (ER) segment and another ER segment. These are considered in each state.
                    2) An ER segment and the coarse-grained ribozyme segment. These are only considered in states that output a 0.
                    
                    Instead of keeping track of the specific ribozymes segments (e.g. Stem1A, CoreA, Stem2A, etc.), we treat the ribozyme as a single Rz segment at position 0
                   
                     Given N ER segments, we consider N ER-Rz and N Rz-ER interactions (these are symmetric).
                     .... In other words we treat the ribozyme 
                    Rz-Rz interactions are never considered
                    '''

                    #If at least one of the segs is an extension region (ER) segment
                    if seg1_id in extension_region_seg_ids or seg2_id in extension_region_seg_ids:
                        #Always consider ER-ER interactions regardless of target output
                        if seg1_id in extension_region_seg_ids and seg2_id in extension_region_seg_ids:
                            spmms[state_id][seg1_id - er_start_seg_id + 1][seg2_id - er_start_seg_id + 1] += pairing_prob
                        '''
                        Only consider ER-Rz and Rz-ER interactions if the target output is 0.
                        When accumulating the probabilities, we don't keep track of the specific Rz segment that the ER paired with. 
                        We just treat it as interacting with a coarse ribozyme segment at position 0
                        '''
                        if truth_vector[state_id] == 0:
                            if seg1_id in extension_region_seg_ids and seg2_id not in extension_region_seg_ids: #ER-Rz
                                spmms[state_id][seg1_id - er_start_seg_id + 1][0] += pairing_prob #Using [0] to store Rz seg vals. This is different from paper which uses [num_segs - 1]
                            if seg1_id not in extension_region_seg_ids and seg2_id in extension_region_seg_ids: #Rz-ER
                                spmms[state_id][0][seg2_id - er_start_seg_id + 1] += pairing_prob


    return spmms #This is symmetric since in Vienna, we make the bppm dict symmetric

def server_fold(input_data):
    '''
    Folds the SRzs on their own. Not used in EA loop; just used for visualization purposes
    '''

    tasks, common_data = input_data  
    folding_temp, bool_300, vienna_path = common_data
    results = fold(tasks, bool_300, folding_temp, 1, vienna_path)
    return results

def generate_semantics_multicore(input_data): 
    '''
    DESCRIPTION IN PROGRESS !!!!!!!!!!!!!!!!!!!!!!!!!

    Operates on a batch of selected individual properties.

    Input data is split into sub_batch and common_data
    sub_batch pertains to a certain subset of the individuals in the population
    For each individual, the sub_batch contains (folding_tasks, 

    '''


    sub_batch, common_data = input_data
    extension_region_seg_ids, truth_vector, bool_300, folding_temp, bool_l_segments, mismatches, vienna_path, ribozyme_type = common_data
    num_states = len(truth_vector)
    num_inds_batch = len(sub_batch)

    folding_tasks = [sub_batch[i][0] for i in range(num_inds_batch)] #This is a list of len(sub_batch) sublist where each sublist contains one task per state 
    folding_tasks = flatten(folding_tasks) #fold expects a single flat list of folding tasks

    #Folds the entire subbatch
    folding_results = fold(folding_tasks, bool_300, folding_temp, 2, vienna_path) #2 is for 2 strands so it uses cofold
   
    results = list()   
    for i in range(num_inds_batch):    
        #Retrieve the folding results for the appropriate individual and states
        bppms = list()
        mfe_dbs = list()    
        for state_id in range(num_states):
            task_id = i*num_states + state_id
            (mfe_db, bppm, _, free_energy) = folding_results[task_id] #Cofold has no ensemble diversity           
            mfe_dbs.append(mfe_db)           
            bppms.append(bppm)

        #Calculate the fitness scores
        _, base_to_seg, name_to_bases = sub_batch[i]
        potential_fitnesses = dict()
        potential_fitnesses['ON'], potential_fitnesses['OFF'], potential_fitnesses['viability'] = calculate_on_off_viability_scores(bppms, truth_vector, name_to_bases, ribozyme_type)
        potential_fitnesses['mismatch'] = calculate_mismatch_score(bppms, mismatches, name_to_bases)

        #Coarse grain the phenotype from the bppms
        spmms = coarse_grain_phenotype(bppms, base_to_seg, extension_region_seg_ids, truth_vector, bool_l_segments)

        results.append( ( potential_fitnesses, spmms, mfe_dbs) )

    return results
