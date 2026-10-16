############!!!!!!!!!!!!!!!!!!!!!!! THIS NEEDS TO BE REMOVED. THE ONLY REASON I'M LEAVING IT HERE FOR NOW IS FOR BACKWARD COMPATIBILITY FOR THE PICKLED OBJECTS IN THE DB
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
#########################################################!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO MOVE THIS SOMEWHERE ELSE
#Selective ribozyme class
class SRS():
    def __init__(self):
        self.sccs = list()
        self.segments = list() #This is always sorted
        self.strands = list()

        #For constraints, core score. 
        #input: name of a segment
        #output: list of base (global) ids contained in that segment
        self.name_to_bases = dict() 
        #For coarse graining. 
        #input:   global id of base 
        ##output: pair of (global) id of segment containing that base and position of base within that segment
        self.base_to_seg = dict()  

        #bcc: base connected component
        #scc: segment connected component
        #bcc_to_scc: inputs a scalar integer representing the global id of a bcc. Outputs a pair of integer representing the scc that contains it and its local id within that scc
        self.bcc_to_scc = dict()
        self.mutation_prob = list()
        self.folding_constraints = list()
        self.potential_fitnesses = dict()

        self.extension_region_seg_names = ['L0', 'SENSOR', 'L1'] #Used for coarse-graining the phenotype for novelty distance calculation. Not sure if I like this here.    #!!! TO DO: Remove this !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!




        self.num_strands = 3 #See build_sccs function for more info


        

