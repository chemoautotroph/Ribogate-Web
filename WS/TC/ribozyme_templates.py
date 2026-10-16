import copy
from ..common.representation import SCC, determine_segment_positions

class RibozymeTemplate:  
    def __init__(self, repeats_sequence, type):
        '''
        Each individual is represented by a state dependency graph (SDG).
        The SDG is a set of segmment connected components (SCC).
        Each SCC consists of one or two segments and stores the positions of these segments in the sRz / substrate strand as well as sequence constraints. 
        The segments in the sRz are fixed throughout the EA.
        However, those in the ribozyme binding site (RzBS) of the substrate will vary throughout the EA since the RzBS is can change
        Therefore, the full SDG can only be completed once the RzBS is known
        Here, we specify the part of the SCCs that is constant throughout the EA
        '''
        self.type = type
        self.repeats_sequence = repeats_sequence
        self.sensor_len = len(repeats_sequence)
        self.linker_len = 7 #Hardcoded
        self.rzbs_extension_lens = {'LIVE': 10, 'POST':50} #During the EA, extend the RzBS by a short amount. After the EA, (optionally) extend it by a longer amount.
        self.num_contiguous_mismatches = 2
        self.mismatch_spacing = 9

        #SCC names need to be tuples, not lists so that they can be used as key in the self.scc_mismatches dictionary defined further down
        if self.type == "minimal_hammerhead":
            self.scc_names = [('S1A', 'S1B'), ('C1',), ('S2A', 'S2B'), ('L0',), ('SENSOR','REPEATS'), ('L1',), ('C2',), ('S3A', 'S3B'), ('UPSTREAM_RZBS',), ('C3',), ( 'DOWNSTREAM_RZBS',)]
            self.srz_segment_names = ['S1A', 'C1', 'S2A', 'L0', 'SENSOR', 'L1', 'S2B', 'C2', 'S3A'] #srz: selective ribozyme
            self.rzbs_segment_names = ['UPSTREAM_RZBS', 'S3B', 'C3', 'S1B', 'DOWNSTREAM_RZBS'] #rzbs: ribozyme binding site 
            
            self.stem_lens = {'S1':7, 'S2':7, 'S3':7}
            self.rzbs_len = self.stem_lens['S1'] + 1 + self.stem_lens['S3'] #+1 is due to the single nucleotide in the third part of the core

        elif self.type == "extended_hammerhead":
            self.scc_names = [('S0A', 'S0B'), ('S1A', 'S1B'), ('S1KNOT',), ('C1',), ('S2A', 'S2B'), ('L0',), ('S2KNOT',), ('SENSOR','REPEATS'), ('L1',), ('C2',), ('S3A', 'S3B'), ('UPSTREAM_RZBS',), ('C3',), ( 'DOWNSTREAM_RZBS',)]
            self.srz_segment_names = ['S0A', 'S1KNOT', 'S1A', 'C1', 'S2A', 'S2KNOT', 'L0', 'SENSOR', 'L1', 'S2B', 'C2', 'S3A'] 
            self.rzbs_segment_names = ['UPSTREAM_RZBS', 'S3B', 'C3', 'S1B', 'S0B', 'DOWNSTREAM_RZBS']         
            
            self.stem_lens = {'S0':4, 'S1':5, 'S2':7, 'S3':7}
            self.rzbs_len = self.stem_lens['S0'] + self.stem_lens['S1'] + 1 + self.stem_lens['S3']
       
        self.specify_segment_positions()
        self.specify_segment_constraints()

        #Prepare the sensor mismtaches
        self.scc_mismatches = {key: [] for key in self.scc_names if len(key) == 2} #Set default for mismatches (which can only potentially be defined for SCCs of size 2)
        self.scc_mismatches[('SENSOR','REPEATS')] = self.place_mismatches(self.num_contiguous_mismatches, self.mismatch_spacing, self.sensor_len)

    def specify_segment_positions(self):
        self.segment_strands = dict()
        self.segment_positions = dict()
        
        srz_segment_positions = determine_segment_positions(self.srz_segment_names)
        for name in self.srz_segment_names:
            self.segment_strands[name] = 0
            self.segment_positions[name] = srz_segment_positions[name]

        rzbs_segment_positions = determine_segment_positions(self.rzbs_segment_names)
        for name in self.rzbs_segment_names:
            self.segment_strands[name] = 1
            self.segment_positions[name] = rzbs_segment_positions[name]

        #The repeats are on a virtual 3rd strand that is not co-folded. It is used to constrain the sensor sequence. Its effect is taken into account using a folding constraint string.
        self.segment_strands['REPEATS'] = 2
        self.segment_positions['REPEATS'] = 0

        self.extension_region_seg_ids = list()
        for i, name in enumerate(self.srz_segment_names):
            if name in ['L0', 'SENSOR', 'L1']:
                self.extension_region_seg_ids.append(i)      

    def specify_segment_constraints(self):
        self.segment_constraints_const = dict() 
        
        if self.type == "extended_hammerhead":
            self.segment_constraints_const['S0A'] = 'N'*self.stem_lens['S0']
            self.segment_constraints_const['S1KNOT'] = 'AAU'
            self.segment_constraints_const['S2KNOT'] = 'UGAAAU'

        self.segment_constraints_const['S1A'] = 'N'*self.stem_lens['S1']     
        self.segment_constraints_const['C1'] = 'CUGAUGA'
        self.segment_constraints_const['S2A'] = 'G' + 'N'*(self.stem_lens['S2']-1)
        self.segment_constraints_const['L0'] = 'N'*self.linker_len
        self.segment_constraints_const['SENSOR'] = 'N'*self.sensor_len
        self.segment_constraints_const['L1'] = 'N'*self.linker_len
        self.segment_constraints_const['S2B'] = 'N'*(self.stem_lens['S2']-1) + 'C'
        self.segment_constraints_const['C2'] = 'GAA'
        self.segment_constraints_const['S3A'] = 'A' + 'N'*(self.stem_lens['S3']-1)

        #All the constraints below depend on the RzBS which changes during the EA run
        for name in self.rzbs_segment_names:
            self.segment_constraints_const[name] = None

        self.segment_constraints_const['REPEATS'] = self.repeats_sequence
            
    #TO DO !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! In tri_cleaver.py, change self.mismatches to self.template.mismatches !!!!!
    def place_mismatches(self, num_contiguous_mismatches, spacing, segment_len):
        '''
        Generates a list of contiguous mismatches groups evenly spaced out along a segment
        These mismatches give ribozyme some flexiblity when bound to transcript. 
        They also avoid extensive dsRNA that could potentially cause PKR or Dicer problems

        Parameters:
            num_contiguous_mismatches (int): the size of a contiguous group of mismatches
            spacing (int): number of nucleotides between the mismatches. If 0, mismatches will be consecutive
            segment_len (int): the length of the segment for which we are placing the mismatches

        Returns:
            mismatch_idxs (list of ints): The 0-indexed locations of the mismatches on the segment

        '''

        mismatch_idxs = list()
        group_start_idx = spacing + 1 #The +1 is just to be backwards compatible with my old approach
        while group_start_idx < segment_len:
            group_end_idx = min(group_start_idx + num_contiguous_mismatches, segment_len) #Truncates the last group to avoid it going out of bounds
            for i in range(group_start_idx, group_end_idx):
                mismatch_idxs.append(i)
            group_start_idx += num_contiguous_mismatches + spacing

        return mismatch_idxs
        
    def extract_rzbs_segments(self, downstream_seq, rzbs_start_idx, is_post_processed):
        if is_post_processed:
            rzbs_extension_len = self.rzbs_extension_lens['POST'] 
        else:                        
            rzbs_extension_len = self.rzbs_extension_lens['LIVE']

        rzbs_segments = dict()
        rzbs_segments['UPSTREAM_RZBS'] = downstream_seq[max(0, rzbs_start_idx-rzbs_extension_len):rzbs_start_idx] #max(0, ...) ensures that the longer post-processing extension doesn't exceed downstream seq bounds
        rzbs = downstream_seq[rzbs_start_idx:rzbs_start_idx + self.rzbs_len]
        
        s3b_start = 0
        c3_start = self.stem_lens['S3']
        s1b_start = c3_start + 1
        rzbs_segments['S3B'] = rzbs[0:c3_start]
        rzbs_segments['C3'] = rzbs[c3_start:s1b_start]
        if self.type == "minimal_hammerhead":
            rzbs_segments['S1B'] = rzbs[s1b_start:self.rzbs_len]
        elif self.type == "extended_hammerhead":
            s0b_start = s1b_start + self.stem_lens['S1']
            rzbs_segments['S1B'] = rzbs[s1b_start:s0b_start]
            rzbs_segments['S0B'] = rzbs[s0b_start:self.rzbs_len]
        
        rzbs_segments['DOWNSTREAM_RZBS'] = downstream_seq[rzbs_start_idx + self.rzbs_len:min(rzbs_start_idx + self.rzbs_len + rzbs_extension_len, len(downstream_seq) )] #min(...) ensures that the longer post-processing extension doesn't exceed downstream seq bounds

        return rzbs_segments

    def build_sccs(self, downstream_seq, rzbs_start_idx, is_post_processed):
        
        #Extract RzBS segments
        rzbs_segments = self.extract_rzbs_segments(downstream_seq, rzbs_start_idx, is_post_processed)

        #Add the extracted rzbs segments to the segment constraints dict
        segment_constraints = copy.deepcopy(self.segment_constraints_const)
        for (seg_name, seg_constraint) in rzbs_segments.items():
            segment_constraints[seg_name] = seg_constraint

        sccs = list()
        for name in self.scc_names:
            if len(name) == 1: #unpaired
                scc = SCC(name, [ self.segment_strands[name[0]] ], [ self.segment_positions[name[0]] ], [ segment_constraints[name[0]] ], [])
            elif len(name) == 2: #Paired
                scc = SCC(name, [ self.segment_strands[name[0]], self.segment_strands[name[1]] ], [ self.segment_positions[name[0]], self.segment_positions[name[1]] ], [ segment_constraints[name[0]], segment_constraints[name[1]] ], self.scc_mismatches[name] )
            sccs.append(scc)

        return sccs

