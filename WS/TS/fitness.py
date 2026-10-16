from ..utility import avg
def evaluate_rz_activity(bppm, name_to_bases, off_cap=0.8):  #This is a core disruption score
    #core
    rz_elem_scores     = list()

    core_score_abs = 0
    for core_seg_name in ['C1', 'C2', 'C3']:
        core_seg_score_abs = 0
        core_seg_base_ids  = name_to_bases[core_seg_name]
        for base_id in core_seg_base_ids:
            unpaired_prob = bppm[(base_id, None)]
            paired_prob   = 1 - unpaired_prob
            core_seg_score_abs += paired_prob
        core_score_abs += core_seg_score_abs
        if core_seg_name == 'C1':
            off_score_uncapped = core_seg_score_abs / len(core_seg_base_ids)
            if off_score_uncapped > off_cap:
                off_score = off_cap / off_cap #NK. Looking back at this, is there reason I don't just do off_score = 1?
            else:
                off_score = off_score_uncapped / off_cap
    #Here the off score only looks at C1 and will not reward disrupting it above a certain amount (this is why have have the cap). The reason for this is to make the ribozyme more switchable
 
    num_core_base_ids  = len(name_to_bases['C1'] + name_to_bases['C2'] + name_to_bases['C3'])
    core_score         = core_score_abs / num_core_base_ids
    rz_elem_scores.append(core_score)

    #stems
    excess_score = 0
    for i in range(1, 4):
        stem_name     = 's' + str(i)
        stem_base_ids = list(zip(name_to_bases[stem_name + 'A'], name_to_bases[stem_name + 'B'][::-1]))
        stem_score_  = 0
        stem_score_A = 0
        stem_score_B = 0
        w_up = 1 #unpaired weight
        w_mp = 1 #paired weight
        for baseId, partner_base_id in stem_base_ids: 
            paired_prob            = bppm[(baseId, partner_base_id)]
            mispaired_unpaired_prob = 1 - paired_prob
            unpaired_prob1         = bppm[(baseId, None)]
            mispaired_prob1        = mispaired_unpaired_prob - unpaired_prob1
            unpaired_prob2         = bppm[(partner_base_id, None)]
            mispaired_prob2        = mispaired_unpaired_prob - unpaired_prob2
            stem_score_A          = stem_score_A + w_up*unpaired_prob1 + w_mp*mispaired_prob1
            stem_score_B          = stem_score_B + w_up*unpaired_prob2 + w_mp*mispaired_prob2

        stem_score_A = stem_score_A / float( len(stem_base_ids) )
        stem_score_B = stem_score_B / float( len(stem_base_ids) )
        #stem_score  = max(stem_score_A, stem_score_B)
        stem_score  = avg([stem_score_A, stem_score_B])
        rz_elem_scores.append(stem_score)

    on_score     = 1- avg(rz_elem_scores)

    return on_score, off_score, excess_score

#We want to see if the input actually binds to its target OBS when it is concatenated on the same strand with it
def score_verification(input_id, name_to_bases, bppm, rzLen, inputLen):
    obsIds   = name_to_bases['OBS' + str(input_id + 1)] #The first input has an id of 0 here, hence the +1.
    inputIds = range(rzLen + 1, rzLen + inputLen + 1)

    score = 0
    for baseId, partner_base_id in zip(obsIds, inputIds[::-1]): 
        paired_prob = bppm[(baseId, partner_base_id)]
        score += paired_prob
    return score / float(inputLen)

