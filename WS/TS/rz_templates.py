from ..common.representation import SCC, determine_segment_positions
from ..utility import remove_items_from_list, inv_list

#TO CLEAN UP: OBSs and stems are 1-indexed, but my linkers are 0-indexed
def build_template(input_lengths, stem_lengths, has_logic_linker, has_flexible_linkers, has_starting_gg, input_seqs):
    '''
    Builds a list of segment connected components (SCCs) representing the ribogate's constraints

    Parameters:
        input_lengths (list of ints): The number of nucleotides in each input strand
        stem_lengths (list of ints): The number of base-pairs in each stem
        has_logic_linker (Boolean)
        has_flexible_linkers (Boolean)
        has_starting_gg (Boolean)
        input_seqs (list of ...): Specific input sequences specified by the user. None if no such specification was made.

    Returns:
        sccs (list of SCC objects)
    '''

    num_inputs = len(input_lengths)

    '''
    These are the names of all the potential segments the ribogate strand can have
    The ribozyme segments (s1A, C1, s2A, s2B, C2, s3A, s3H, s3b, C3, s1B) will always be presents
    The number of inputs determines the number of OBS segments
    There may be a single logic linker between between the first half of stem 2 (S2A) and the first OBS (OBS1)
    This linker is quite a long segment and it is required for the ribogate to implement functions that output 0 when all inputs are high (e.g. NAND, etc.)
    There can also be flexible linkers between stem 2 and the OBSs and between adjacent OBSs.
    Flexible linkers are smaller than logic linkers, and their purpose is to provide some flexibility to the extension region when all inputs are present.
    '''

    #seg_names = ['startGG', 's1A', 'C1', 's2A', 'L0', 'OBS1', 'L1', 'OBS2', 'L2', 'OBS3', 'L3', 's2B', 'C2', 's3A', 's3H', 's3B', 'C3', 's1B'] #Use this if we want the starting GG to be an overhang
    seg_names = ['s1A', 'C1', 's2A', 'L0', 'OBS1', 'L1', 'OBS2', 'L2', 'OBS3', 'L3', 's2B', 'C2', 's3A', 's3H', 's3B', 'C3', 's1B'] 

    #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO: Put this as input parameters
    logic_linker_len = 14
    flexible_linker_len = 3

    '''
    Depending on the input parameters, remove segments that won't actually appear in the designed ribogate
    '''
    if num_inputs < 3:
        seg_names = remove_items_from_list(seg_names, ['OBS3', 'L3'])
    if num_inputs < 2:
        seg_names = remove_items_from_list(seg_names, ['OBS2', 'L2'])

    if has_flexible_linkers == False:
        seg_names = remove_items_from_list(seg_names, ['L1', 'L2', 'L3'])
        if has_logic_linker == False:
            seg_names = remove_items_from_list(seg_names, ['L0'])

    #Uncomment this code if we want the starting GG to be an overhang
    #if has_starting_gg == False:
    #    seg_names = remove_items_from_list(seg_names, ['startGG'])

    segment_positions = determine_segment_positions(seg_names)
    

    '''
    If both logic linkers and flexible linkers are used, the logic linker takes priority and linker 0 assumes the logic linker length
    '''
    if has_logic_linker == True:
        linker_0_len = logic_linker_len
    elif has_flexible_linkers == True:
        linker_0_len = flexible_linker_len
    else:
        linker_0_len = None
       

    '''
    In vitro transcription is faciliated if the 5' end of the strand starts with two Gs
    '''
    stem_constraints = dict()
    if has_starting_gg:
        '''
        The starting GG is not an overhang but actually occupies the first two nucleotides of stem 1
        In the current implementation, stem 1 starts with exactly 2 Gs; this is which is why he set the 3rd nucleotide to an H (anything but a G)
        '''

        #stem_constraints['s1'] = ['GG' + 'N'*(stem_lengths[0]-2)     , 'N'*stem_lengths[0]]
        stem_constraints['s1'] = ['GGH' + 'N'*(stem_lengths[0]-3)     , 'N'*stem_lengths[0]] 
    else:
        stem_constraints['s1'] = ['N'*stem_lengths[0], 'N'*stem_lengths[0]] 
    stem_constraints['s2'] = ['G' + 'N'*(stem_lengths[1]-1), 'N'*(stem_lengths[1]-1) + 'C'] 
    stem_constraints['s3'] = ['A' + 'N'*(stem_lengths[2]-1), 'N'*(stem_lengths[2]-1) + 'U'] 

    '''
    The number of OBSs is equal to the number of input strands
    Specific input sequences/constraints can be specified
    If none are specified, then the input can assume any wildcard (N) value
    '''
    obs_input_constraints = list()
    for i in range(num_inputs):
        if input_seqs[i] == None:
            input_constraint = 'N'*input_lengths[i]
        else:
            input_constraint = input_seqs[i]
        obs_constraint = 'N'*input_lengths[i]
        obs_input_constraints.append( [obs_constraint, input_constraint] )

    '''
    Build the segment dependency graph (SDG) which consists of multiple segment connected components (SCCs) that are of either size 1 (unpaired segment) or 2 (paired segments)
    These SCCs ensure that the sequence (e.g. conserved ribozyme core) and structural (e.g. both halves of each stem reverse complementary to each other, OBS reverse complementary to inputs) constraints of the ribogate are respected during initialization and mutation
    '''
    linker_sccs = list()
    if has_logic_linker or has_flexible_linkers:
        linker_sccs.append( SCC(['L0'], (0,), (segment_positions['L0'],), ['N'*linker_0_len]) ) #Links S2A to OBS1
    if has_flexible_linkers:
        linker_sccs.append( SCC(['L1'], (0,), (segment_positions['L1'],), ['N'*flexible_linker_len]) ) #For 1 input, links OBS1 to S2B. For 2 and 3 inputs links OBS1 to OBS2
    if has_flexible_linkers and num_inputs > 1:
        linker_sccs.append( SCC(['L2'], (0,), (segment_positions['L2'],), ['N'*flexible_linker_len]) ) #For 2 inputs, links OBS2 to S2B. For 3 inputs links OBS2 to OBS3
    if has_flexible_linkers and num_inputs > 2:
        linker_sccs.append( SCC(['L3'], (0,), (segment_positions['L3'],), ['N'*flexible_linker_len]) ) #For 3 inputs, links OBS3 to S2B.

    obs_input_sccs = [ SCC(['OBS1', 'Input1'], (0,1), (segment_positions['OBS1'], 0), obs_input_constraints[0]) ]
    if num_inputs > 1:
        obs_input_sccs.append( SCC(['OBS2', 'Input2'], (0,2), (segment_positions['OBS2'], 0), obs_input_constraints[1]) )
    if num_inputs > 2:
        obs_input_sccs.append( SCC(['OBS3', 'Input3'], (0,3), (segment_positions['OBS3'], 0), obs_input_constraints[2]) )

    ribozyme_sccs = [ SCC(['s1A', 's1B'], (0,0), (segment_positions['s1A'], segment_positions['s1B']), stem_constraints['s1'] ), 
                      SCC(['C1'], (0,) , (segment_positions['C1'],), ['CUGANGA'] ),
                      SCC(['s2A', 's2B'], (0,0), (segment_positions['s2A'], segment_positions['s2B']), stem_constraints['s2'] ), 
                      SCC(['C2'], (0,) , (segment_positions['C2'],), ['GAA'] ),
                      SCC(['s3A', 's3B'], (0,0), (segment_positions['s3A'], segment_positions['s3B']), stem_constraints['s3'] ),
                      SCC(['s3H'], (0,), (segment_positions['s3H'],), ['NNNN']  ), #Hardcoded stem 3 hairpin length
                      SCC(['C3'], (0,), (segment_positions['C3'],), ['H'] ) ]                                          

    sccs = linker_sccs + obs_input_sccs + ribozyme_sccs

    ###########
    #Extension region seg ids. This is used for coarse-graining the phenotype for novelty distance calculation.
    extension_region_seg_ids = list()
    potential_extension_names = ['L0', 'OBS1', 'L1', 'OBS2', 'L2', 'OBS3', 'L3', 'OBS'] #!!!Potential problem with this approach is that it gives a lot of weight to flexibility linkers which have little computational effect
    for name in potential_extension_names:
        if name in seg_names:
            idx = inv_list(seg_names, name)
            extension_region_seg_ids.append(idx)
    ###########

    return sccs, extension_region_seg_ids
