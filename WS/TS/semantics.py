from ..utility import multicore, avg, arg_sort, inv_list, unique, flatten
from ..vienna  import*
from .fitness import evaluate_rz_activity, score_verification
import numpy as np

def coarse_grain_pheno(bppms, base_to_seg, extension_region_seg_ids, truth_vector, bool_l_segments):
    if bool_l_segments:
        num_segs   = max( [v[0] for v in base_to_seg.values()]) + 1 
    else: #TO
        num_segs  = len(extension_region_seg_ids) + 1
        er_start_seg_id   = min(extension_region_seg_ids)


    num_states = len(bppms)
    sppms = np.zeros(( num_states, num_segs, num_segs ))
    for state_id in range(num_states):
        for key, val in bppms[state_id].items(): #!!!! dict.items() is super slow if bppm is full!!!
            if None not in key: #Ignore unpaired bases
                seg1_id = base_to_seg[key[0]][0]
                seg2_id = base_to_seg[key[1]][0]
                if bool_l_segments:
                    if truth_vector[state_id] == 1:
                        #When the target output is 1, only consider interactions between the extension region segments.
                        if seg1_id in extension_region_seg_ids and seg2_id in extension_region_seg_ids:
                            sppms[state_id][seg1_id][seg2_id] += val
                    else:
                        sppms[state_id][seg1_id][seg2_id] += val

                else:
                    if seg1_id in extension_region_seg_ids or seg2_id in extension_region_seg_ids:
                        #always consider ER-ER interactions regardless of target output
                        if seg1_id in extension_region_seg_ids and seg2_id in extension_region_seg_ids:
                            sppms[state_id][seg1_id - er_start_seg_id + 1][seg2_id - er_start_seg_id + 1] += val
                        #only consider ER-Rz and Rz-ER interactions if the target output is 0
                        if truth_vector[state_id] == 0:
                            if seg1_id in extension_region_seg_ids and seg2_id not in extension_region_seg_ids:
                                sppms[state_id][seg1_id - er_start_seg_id + 1][0] += val #Using [0] to store Rz seg vals. This is different from paper which uses [num_segs - 1]
                            if seg1_id not in extension_region_seg_ids and seg2_id in extension_region_seg_ids:
                                sppms[state_id][0][seg2_id - er_start_seg_id + 1] += val


    return sppms #This is symmetric since in Vienna, we make the bppm dict symmetric



def pheno_perf_fits(input_data): #Operates on a sub-population of individuals
    tasks, common_data = input_data
    base_to_seg, name_to_bases, extension_region_seg_ids, truth_vector, num_inputs, bool_300, folding_temp, bool_l_segments, vienna_path = common_data
    num_states         = 2**num_inputs
    num_inds_batch     = len(tasks)


    logic_tasks          = flatten([task[0] for task in tasks])
    verification_tasks   = flatten([task[1] for task in tasks])
    logic_results        = fold(logic_tasks, bool_300, folding_temp, 1, vienna_path)
    verification_results = fold(verification_tasks, bool_300, folding_temp, 1, vienna_path)

    results            = list()   
    for ind_idx_batch in range(num_inds_batch):
                
        potential_fitnesses = dict()
        bppms              = list()
        mfe_dbs             = list()
        free_energies       = list()
        ens_divs = list()
        on_scores = list()
        off_scores = list()
        excess_scores = list()
        verification_scores = list()
        
        #process logic results
        for state_id in range(num_states):
            task_id = ind_idx_batch*num_states + state_id
            (mfe_db, bppm, mfe_ad, free_energy, ens_div) = logic_results[task_id]

            on_score, off_score, excess_score = evaluate_rz_activity(bppm, name_to_bases)            

            if truth_vector[state_id] == 1:
                on_scores.append( on_score )
            else:
                off_scores.append( off_score )
                excess_scores.append(excess_score)
           
            mfe_dbs.append(mfe_db)           
            bppms.append(bppm)
            free_energies.append(free_energy)
            ens_divs.append(ens_div)  
            
        #process verification results
        for input_id in range(num_inputs): #There is 1 verification task per input
            task_id = ind_idx_batch*num_inputs + input_id
            (mfe_db, bppm, mfe_ad, free_energy, ens_div) = verification_results[task_id]
            verification_scores.append( score_verification( input_id , name_to_bases, bppm, verification_tasks[task_id][2], verification_tasks[task_id][3] ) )


        potential_fitnesses['avgON']        = avg(on_scores)
        potential_fitnesses['avgOFF']       = avg(off_scores)
        potential_fitnesses['minON']        = min(on_scores)
        potential_fitnesses['minOFF']       = min(off_scores)
        potential_fitnesses['ON']           = avg([ potential_fitnesses['minON'], potential_fitnesses['avgON'] ])
        potential_fitnesses['OFF']          = avg([ potential_fitnesses['minOFF'], potential_fitnesses['avgOFF'] ])
        potential_fitnesses['switch']       = potential_fitnesses['ON'] + potential_fitnesses['OFF']
        potential_fitnesses['viability']    = avg ([ potential_fitnesses['minON'], potential_fitnesses['minOFF'] ])  #Between 0 and 1
        potential_fitnesses['ens_div']      = -avg(ens_divs)
        potential_fitnesses['verification'] = avg( [ avg(verification_scores), min(verification_scores) ] ) 

        sppms = coarse_grain_pheno(bppms, base_to_seg, extension_region_seg_ids, truth_vector, bool_l_segments)

        results.append( ( potential_fitnesses, sppms, mfe_dbs) )
    return results
