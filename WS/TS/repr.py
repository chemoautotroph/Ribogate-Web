from ..folding_constraints import generate_folding_constraint_string, single_nucleotide_constraint_lut, paired_nucleotide_constraint_lut
import numpy as np
from ..utility import*

class SRS():
    def __init__(self):
        self.sccs       = list()
        self.segments   = list() #This is always sorted
        self.strands    = list()

        #For constraints, core score. 
        #input: name of a segment
        #output: list of base (global) ids contained in that segment
        self.name_to_bases        = dict() 
        #For coarse graining. 
        #input:   global id of base 
        ##output: pair of (global) id of segment containing that base and position of base within that segment
        self.base_to_seg          = dict()  

        #bcc: base connected component
        #scc: segment connected component
        #bcc_to_scc: inputs a scalar integer representing the global id of a bcc. Outputs a pair of integer representing the scc that contains it and its local id within that scc
        self.bcc_to_scc           = dict()
        self.mutation_prob        = list()
        self.folding_constraints  = list()
        self.potential_fitnesses  = dict()


    def generate_folding_tasks(self, num_inputs, strands, name_to_bases):
        gate_len = len(self.strands[0])

        #Logic tasks
        logic_tasks = list()
        if num_inputs == 1:
            input_states = [(0, ), (1, )]
        elif num_inputs == 2:
            input_states = [(0, 0), (0, 1), (1,0), (1,1)]
        elif num_inputs == 3:
            input_states = [(0, 0, 0), (0, 0, 1), (0, 1,0), (0, 1,1), (1, 0, 0), (1, 0, 1), (1, 1,0), (1, 1,1)]
  
        for input_state in input_states:
            constrained_bases = list()
            for col_id, col in enumerate(input_state):
                if col == 1:
                    constrained_bases += name_to_bases['OBS' + str(col_id + 1)] #These are 1-indexed and right inclusive
            state_constraint = generate_folding_constraint_string( gate_len, constrained_bases ) 
            logic_tasks.append( (self.strands[0], state_constraint) )                    

        #Constraint verification tasks
        verification_tasks = list()
        for i in range(num_inputs):
            input_len  = len(strands[i + 1])
            constraint = generate_folding_constraint_string(gate_len, []) + generate_folding_constraint_string(input_len, [ ])
            verification_tasks.append( (strands[0]  + strands[i + 1], constraint, gate_len, input_len ) )

        tasks = [logic_tasks, verification_tasks]
        input_states = input_states #Used for server . #!!!!!!!!!!! TO DO REMOVE THIS Once I make appropriate changes on the server side
        
        return tasks, input_states

      