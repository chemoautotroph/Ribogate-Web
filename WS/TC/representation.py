import numpy as np
from ..utility import arg_sort, inv_list, prefix_sum
import copy

from ..common.representation import determine_valid_nucleotide_assignments, build_bcc_to_scc_map, calculate_mutation_probabilities, update_bccs

def update_representation(old_sccs, rzbs_start_idx, template, downstream_seq, repeats, is_post_processed):
    ''' 
    TO DO REVIEW THIS DESCRIPTION !!!!

    Updates an indiviidual's iniital segment connected components (SCCs), bcc_to_scc map, and mutation probabilities
    This is called when an individual is initialized, mutated, or when we are doing post processing with a longer RzBS extension
    In the later case, different individuals can have different upstream and downstream rzbs lenths (due to downstream seq boundscheck) which will cause them to have different maps
    '''

    old_bccs_list = [scc.bccs for scc in old_sccs] #Keep track of the individual's previous generation bccs (one bcc list per scc object) because the sccs returned by create_representation have empty bccs
    sccs = template.build_sccs(downstream_seq, rzbs_start_idx, is_post_processed) #This clears all previous bccs if there were any

    for scc in sccs:
        scc.valid_nucs = determine_valid_nucleotide_assignments(scc.constraints, scc.mismatches, scc.length, scc.size)           

    #Build mutation map. This should be the same throughout the EA since SCCs have fixed length. But it can change during post-processing.
    scc_lengths = [scc.length for scc in sccs]
    bcc_to_scc = build_bcc_to_scc_map(scc_lengths)

    mutation_prob = calculate_mutation_probabilities(bcc_to_scc, sccs)

    for i, scc in enumerate(sccs):       
        '''
        build_sccs generates SCCs with no blank bccs. If this is the first generation, update_bccs will sample them from the corresponding set of valid nucleotide assigments.
        Otherwise, we keep track of the bccs at the end of the previous generation and build_sccs will set them to the SCC. 
        If these old bccs violate any new constraints (which may happen if the RzBS is mutated), new bccs are sampled.
        We also want to regenerate the bccs for the upstream and downstream RzBS segments if we are doing post-processing because their lengths will have changed
        '''
        has_changed_length = is_post_processed and (scc.name == ['UPSTREAM_RZBS'] or scc.name == ['DOWNSTREAM_RZBS'] )
        if has_changed_length:
            scc.bccs = update_bccs(None, scc.length, scc.valid_nucs)
        else:
            scc.bccs = update_bccs(old_bccs_list[i], scc.length, scc.valid_nucs)
    return sccs, bcc_to_scc, mutation_prob 


def create_representation(rzbs_start_idx, template, downstream_seq, repeats):
    ''' 
    Creates an indiviidual's iniital segment connected components (SCCs), bcc_to_scc map, and mutation probabilities
    '''

    sccs = template.build_sccs(downstream_seq, rzbs_start_idx, False) #This clears all previous bccs if there were any

    for scc in sccs:
        scc.valid_nucs = determine_valid_nucleotide_assignments(scc.constraints, scc.mismatches, scc.length, scc.size)           

    #Build mutation map. This should be the same throughout the EA since SCCs have fixed length. But it can change during post-processing.
    scc_lengths = [scc.length for scc in sccs]
    bcc_to_scc = build_bcc_to_scc_map(scc_lengths)

    mutation_prob = calculate_mutation_probabilities(bcc_to_scc, sccs)

    return sccs, bcc_to_scc, mutation_prob
