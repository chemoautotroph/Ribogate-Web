from ..utility import avg
import copy

def calculate_stem_score(bppm, base_ids_a, base_ids_b):
    base_ids = list(zip(base_ids_a, base_ids_b))
    stem_disruption_score = 0
    for base_id, partner_base_id in base_ids:
        paired_prob = bppm[(base_id, partner_base_id)]
        stem_disruption_score += 1 - paired_prob
    stem_disruption_score /= len(base_ids)
    return stem_disruption_score    

#This function assigns a score from 0 (no disruption) to 1 (full disruption) to each motif
#In this case for TC, the motifs are C1, C2, C3, stem1, stem2, stem3. In TS C1, C2, C3 are treated as a single core motif
def evaluate_rz_activity(bppm, name_to_bases, ribozyme_type):
    
    if ribozyme_type not in ['minimal_hammerhead', 'extended_hammerhead']:
        raise NotImplementedError(f"There is no fitness function for ribozyme type ({ribozyme_type})")    
    is_extended_hammerhead = ribozyme_type == 'extended_hammerhead'

    #core
    #Old version used to generated tested SRzs. Calculates a score for each core seg
    core_scores = list()
    for seg_name in ['C1', 'C2', 'C3']:
        seg_score = 0
        base_ids = name_to_bases[seg_name]
        for base_id in base_ids:
            paired_prob = 1 - bppm[(base_id, None)]
            seg_score += paired_prob
        seg_score /= len(base_ids)
        core_scores.append(seg_score)


    '''
    #Cleaner version: calculates a single score for the entire core. I don't expect this to noticeably affect EA convergence
    base_ids = name_to_bases['C1'] + name_to_bases['C2'] + name_to_bases['C3']
    core_score = 0
    for base_id in base_ids:
        paired_prob = 1 - bppm[(base_id, None)]
        core_score += paired_prob
    core_score /= len(base_ids)
    core_scores = [core_score]
    '''

    #Pseudoknot for extended hammerhead ribozyme. We can't directly predict the pseudoknot, but it is more likely to form if the two knots segments are not paired anywhere else on the ribozyme
    if is_extended_hammerhead:
        knot_score = 0
        base_ids = name_to_bases['S1KNOT'] + name_to_bases['S2KNOT']
        for base_id in base_ids:
            paired_prob = 1 - bppm[(base_id, None)]
            knot_score += paired_prob
        knot_score /= len(base_ids)


    stem_scores = list()
    for i in range(1,4):
        #For the extended hammerhead, the first stem contains a bulge loop which 'splits' the stem into two parts. We term those two parts S0 and S1 (this is a non-official naming convention)
        if is_extended_hammerhead and i == 1:
            base_ids_a = name_to_bases['S0A'] + name_to_bases['S1A']
            base_ids_b = (name_to_bases['S1B'] + name_to_bases['S0B'])[::-1]
        else:
            stem_name = 'S' + str(i)
            base_ids_a = name_to_bases[stem_name + 'A']
            base_ids_b = name_to_bases[stem_name + 'B'][::-1]
        stem_score = calculate_stem_score(bppm, base_ids_a, base_ids_b)
        stem_scores.append(stem_score) 

    if is_extended_hammerhead:
        rz_motif_scores = core_scores + stem_scores + [knot_score]
    else:
        rz_motif_scores = core_scores + stem_scores

    on_score  = 1 -avg(rz_motif_scores) #This reaches max value when the core and stem motifs experience no disruption
    off_score = max(stem_scores) #This reaches max value when at least one stem is completely disrupted

    return on_score, off_score

def calculate_on_off_viability_scores(bppms, truth_vector, name_to_bases, ribozyme_type):
    on_vector = list()
    off_vector = list()

    num_states = len(bppms)
    for i in range(num_states):       
        state_on_score, state_off_score = evaluate_rz_activity(bppms[i], name_to_bases, ribozyme_type) 

        if truth_vector[i] == 1:
            on_vector.append( state_on_score )
        else:
            off_vector.append( state_off_score )

    avg_on = avg(on_vector)
    avg_off = avg(off_vector)
    min_on = min(on_vector)
    min_off = min(off_vector)
    on_score = avg([min_on, avg_on])
    off_score = avg([min_off, avg_off])
    viability_score = avg([min_on, min_off]) #Has a value between 0 and 1

    return on_score, off_score, viability_score


def calculate_mismatch_score(bppms, mismatches, name_to_bases):
    sensor_base_ids = name_to_bases['SENSOR'] #These are 1-indexed and right inclusive #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    sensor_lims = (sensor_base_ids[0] , sensor_base_ids[-1] + 1) #These are 1-indexed and right exclusive
    #mismatches gives the indices of the sensor mismatches w.r.t. to their local position in sensor whereas mismatches_global gives their position w.r.t. the entire strand
    mismatches_global = [o + sensor_lims[0] for o in mismatches] 

    mismatch_score = 0      
    for bppm in bppms:
        for m in mismatches_global:
            mismatch_score += bppm[(m, None)]
    mismatch_score = mismatch_score / float(len(mismatches_global) )

    return mismatch_score
