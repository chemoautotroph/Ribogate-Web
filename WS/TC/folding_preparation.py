from math import ceil
from ..folding_constraints import generate_folding_constraint_string

def generate_truth_vector(sensor_len, wt_len, stride_size):
    '''
    Returns
        truth_vector (Boolean list): 0 if we don't want the sRz to cleave in that state, 1 if we want it to cleave
    '''

    truth_vector = list()
    num_strides = int((sensor_len - wt_len) / stride_size) + 1

    #no binding
    truth_vector.append(0) #We don't want the ribozyme to cleave before the repeats have a chance to bind to the sensor

    #WT binding
    for s in range(num_strides):
        truth_vector.append(0) #We don't want to cleave the WT

    #Mutant binding
    truth_vector.append(1) #We want to cleave the mutant

    return truth_vector

def calculate_stride_size(num_repeats_wt, num_repeats_mutant, max_num_strides, repeat_length=3):
    '''
    The sensor is the same size as the mutant repeats segment, meaning that the wild-type repeats segment is shorter than the sensor.
    Therefore, the WT repeats can bind to the sensor at multiple possible sites.
    These sites are shifted by repeat_length nucleotides from each other.
    We refer to each of these possible shifts as a stride.
    The stride size is equal to repeat_length.
    The total number of strides is equal to (mutant length - wild length) / stride_size.
    For example, if the WT len is 30 and the mutant length is 60, there are (60-30)/3 = 10 possible strides
    However, considering each possible stride slows down fitness evaluation, since each stride is a folding state
    Therefore, we limit the maximum number of strides to max_num_strides.
    But, we want to make sure the strides are still spaced apart.
    This function calculates a new stride_size (which is an integer multiple of repeat_length) so that the max_num_strides is not exceeded
    '''

    return ceil( (num_repeats_mutant - num_repeats_wt) / float(max_num_strides) )*repeat_length

def generate_folding_tasks(sensor_mismatches, strands, name_to_bases, wt_len, stride_size):
    '''
    Generates a list of folding tasks to be executed by the folder (in our case Vienna RNA)

    DESCRIPTION IN PROGRESS!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

    '''

    truth_vector = list()
    tasks = list()

    sensor_base_ids = name_to_bases['SENSOR'] #These are 1-indexed and right inclusive
    sensor_lims = (sensor_base_ids[0], sensor_base_ids[-1] + 1) #These are 1-indexed and right exclusive . ##?????????????????????????????????????????????????????????? DOES THIS MESS UP THE MISMATCH POSITIONS????????
    sensor_len = len(sensor_base_ids)
    sd0_len = len(strands[0])
    sd1_len = len(strands[1])

    num_strides = int((sensor_len - wt_len) / stride_size) + 1

    geno = strands[0] + "&" +  strands[1]
    amp = '&'

    sensor_mismatches_absolute = [o + sensor_lims[0] for o in sensor_mismatches]

    #no binding
    fc = generate_folding_constraint_string(sd0_len, [ ]) + amp + generate_folding_constraint_string(sd1_len, [ ])
    tasks.append((geno, fc))
    truth_vector.append(0) #We don't want the ribozyme to cleave before the repeats have a chance to bind to the sensor

    #WT binding
    folding_constraints = list()
    lims = [None, None]
    for s in range(num_strides):
        lims[0] = sensor_lims[0] + s*stride_size
        lims[1] = lims[0] + wt_len
        sensor_constraint = [i for i in range(lims[0], lims[1]) if i not in sensor_mismatches_absolute] 
        fc = generate_folding_constraint_string(sd0_len, sensor_constraint ) + amp +  generate_folding_constraint_string(sd1_len, [ ])
        tasks.append((geno, fc))
        truth_vector.append(0) #We don't want to cleave the WT

    #Mutant binding
    sensor_constraint = [i for i in range(sensor_lims[0], sensor_lims[1]) if i not in sensor_mismatches_absolute] 
    fc = generate_folding_constraint_string(sd0_len, sensor_constraint ) + amp + generate_folding_constraint_string(sd1_len, [ ])
    tasks.append((geno, fc))
    truth_vector.append(1) #We want to cleave the mutant

    return tasks
