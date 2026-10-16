from ..ea import *
from .repr import SRS
from ..utility import multicore, search_list_objs
from .semantics import *
from sklearn.manifold import MDS
from ..blast import run_blast, calculate_specificity

from .representation import create_representation, update_representation

from ..common.representation import generate_segments, generate_strands, build_base_maps, initialize_sequence, SCC
from ..common.mutation import mutate_bcc

from ..common.novelty import calculate_distance_matrix, calculate_novelty_scores, rank_by_marginal_diversity
from .ribozyme_templates import RibozymeTemplate
from .folding_preparation import generate_truth_vector, calculate_stride_size, generate_folding_tasks

from WS import app

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO REMOVE THIS
def place_mismatches(num_contiguous_mismatches, spacing, segment_len):
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
##################################

class TriCleaver(EA):
    def __init__(self, viability_params, is_fast_folding_enabled, folding_temp, downstream_seq, num_repeats_wt, num_repeats_mutant, repeat_unit, template_params, allowed_rzbs_start_idxs, bool_quick_ea): 
        '''
        Initialize for the TriCleaver class which inherits from the EA class and overrides several of its functions.
        Configures TriCleaver for the user-specifed TRED
        Consult section [!!!! INSERT REF HERE!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!] of Nicolas Kamel's thesis !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        Note that part of the configuration step has already been performed on the server side when validating user input
        Therefore, this function's arguments are not the raw WT and mutant sequences, but data that has been extracted from them 

        Parameters:
            viability_params (list): 
            is_fast_folding_enabled (Boolean): When False uses ViennaRNA with a loop size of 300 for the entire EA. When true uses it only for the last generation
            folding_temp (float)
            downstream_seq (string): The substrate sequence downstream of the repeats segment. Identical between the wild-type and mutant
            num_repeats_wt (int): Number of repeats on the wild-type strand
            num_repeats_mutant (int): Number of repeats on the mutant strand. See after parameters list
            repeat_unit (string): The seqeuence that is repeated (e.g. CAG)
            template_params (dict): Specifies the length of different segments as well as the spacing between sensor mismatches
            allowed_rzbs_start_idxs (list of ints): Positions w.r.t. start of downstream_seq of potential RzBS with cut sites okayed by the user
            bool_quick_ea (Boolean): Flag set to True when debugging with small nubmers of individuals and generations to assist with qwick debugging

        The mutant repeats stretch considered by TriCleaver can differ slightly from the actual repeats segment on the substrte for three possible reasons:
        1) We cap the number of repeats if they are very long
        2) If the repeats mutiple codons mapping to the same amino acid, we only consider the most common codon
        3) TriCleaver is not bound by the open reading frame. 
        Consider the case of 4 (GCG) repeats, flanked by a G and GC, respectively: G-(GCG)(GCG)(GCG)(GCG)-GC
        When TriCleaver scans for repeats, if will actually detect 5 GGC repeats (GGC)(GGC)(GGC)(GGC)(GGC)  

        '''

        EA.__init__(self)       
        self.mutation_types = ['BCC', 'RzBS']      

        self.is_fast_folding_enabled = is_fast_folding_enabled
        self.folding_temp = folding_temp
        self.bool_l_segments = 1 #Hardcoded
        self.rzbs_diversity_weight = 1 #Hardcoded. #April 2024
        self.novelty_neighborhood_size = 30 #Hardcoded

        self.min_via, self.max_via, self.bool_breakpoint, self.breakpoint_via, self.breakpoint_gen = viability_params
        self.template_params = template_params

        self.num_repeats_wt = num_repeats_wt
        self.num_repeats_mutant = num_repeats_mutant
        self.wt_len = self.num_repeats_wt*3
        self.mutant_len = self.num_repeats_mutant*3
        self.sensor_len = self.mutant_len
        self.repeats = repeat_unit*self.num_repeats_mutant 
        self.downstream_seq = downstream_seq
        self.allowed_rzbs_start_idxs = allowed_rzbs_start_idxs #These indices are defined w.r.t. to the start of the sequence downstream of the repeats
        self.bool_quick_ea = bool_quick_ea

        #Load the relevant template in
        #template_name = "minimal_hammerhead" #!!! TO DO: Pass template_name as parameter to __init__ or pass the template object directly so that we can store in the server side
        template_name = "extended_hammerhead"
        self.template = RibozymeTemplate(self.repeats, template_name)

        self.stride_size = calculate_stride_size(self.num_repeats_wt, self.num_repeats_mutant, self.template_params['MAX_NUM_STRIDES'], 3)
        self.truth_vector = generate_truth_vector(self.sensor_len, self.wt_len, self.stride_size)
        self.sensor_mismatches = self.template.scc_mismatches[('SENSOR','REPEATS')]
        
        assert self.sensor_mismatches == place_mismatches(self.template_params['NUM_CONTIGUOUS_MISMATCHES'], self.template_params['MISMATCH_SPACING'], self.sensor_len)  #!!!! TESTING 

 
    def create_individual(self):
        ind = SRS()
        ind.rzbs_start_idx = np.random.choice(self.allowed_rzbs_start_idxs)
        ind.sccs, ind.bcc_to_scc, ind.mutation_prob = create_representation(ind.rzbs_start_idx, self.template, self.downstream_seq, self.repeats)
        ind.sccs = initialize_sequence(ind.sccs)
        return ind

    def copy_ind(self, ind):
        new_ind = copy.deepcopy(ind)
        return new_ind

    def pre_insert(self, inds):
        new_inds = list()
        for ind in inds:
            new_ind = ind
            new_ind.folding_constraints = [task[1] for task in ind.tasks] 
            new_inds.append(new_ind)
        return new_inds


    def prepare_inds_batch(self, inds):
        '''
        Packages data for each individual into a batch to be used by multiprocess fitness evaluation

        Parameters:
            inds (list of SRS objects): The list of individuals whose fitness we want to evaluate

        Returns:
            inds_data (complex data structure): The data that will be required to evaluate each individual's fitness packaged into a batch
        '''

        batch = list()
        for ind in inds:
            #Prepare tasks
            ind.segments = generate_segments(ind.sccs, ind.num_strands)
            ind.strands = generate_strands(ind.segments, ind.num_strands)
            ind.base_to_seg, ind.name_to_bases = build_base_maps(ind.segments)
            ind.tasks = generate_folding_tasks(self.sensor_mismatches, ind.strands, ind.name_to_bases, self.wt_len, self.stride_size) #TO DO Move this function out of ind
            batch.append((ind.tasks, ind.base_to_seg, ind.name_to_bases)) #base to seg and name_to_bases will only be different between individuals during post-processing with the longer RzBS extension
        return batch


    def evaluate_fitness(self):
        #!!!! parents_full = [search_list_objs(self.population, 'id', ind.id)[0] for ind in self.parents] #Because I removed the deep copies, the parents don't have any phenotype
       

        #!!! This is stupid and confusing and inefficient. If fast folding is disabled, it folds both the parents and offspring every generation.
        if self.is_fast_folding_enabled == False or (self.is_fast_folding_enabled == True and self.cur_gen == self.num_gens - 1):
            bool_300 = 1
            inds = self.parents + self.offspring #THe EA ends with survivor selection. Therefore, We need to make sure both the parents and offspring go through bool 300 folding
        else:
            bool_300 = 0
            inds = self.offspring

        batch = self.prepare_inds_batch(inds)
        common_data = (self.template.extension_region_seg_ids, self.truth_vector, bool_300, self.folding_temp, self.bool_l_segments, self.sensor_mismatches, app.config['VIENNA_PATH'], self.template.type)
        results = multicore(batch, generate_semantics_multicore, app.config['NUM_PROCESSES'], common_data)
        #results = generate_semantics_multicore([batch, common_data]) #Single core

        #Store results back in individuals
        for i, ind in enumerate(inds):
            result = results[i]
            ind.potential_fitnesses = result[0]
            ind.coarse_pheno = result[1]
            ind.mfe_dbs = result[2]
            
        print("Starting novelty")
        parents_and_offspring = self.parents + self.offspring
        distance_matrix = self.calculate_distance_matrix_tc(parents_and_offspring, self.rzbs_diversity_weight)
        novelty_scores = calculate_novelty_scores(distance_matrix, self.novelty_neighborhood_size)
        for i, ind in enumerate(parents_and_offspring):
            ind.potential_fitnesses['novelty'] = novelty_scores[i]

    def calculate_distance_matrix_tc(self, individuals, rzbs_diversity_weight):
        if len(individuals) == 0:
            return None
        
        phenotypes = [ind.coarse_pheno for ind in individuals]
        rzbs_sites = [np.array([ind.rzbs_start_idx]) for ind in individuals]
        distance_matrix_phenotypes = calculate_distance_matrix(phenotypes, "manhattan")
        distance_matrix_rzbs_sites = calculate_distance_matrix(rzbs_sites, "hamming")
        distance_matrix = distance_matrix_phenotypes * (1 + rzbs_diversity_weight*distance_matrix_rzbs_sites)   
        return distance_matrix



    def post_process(self):
        '''
        This function performs a variety of functions that are generally too costly to perform each generation during the EA.
        Currently performs the following computation: 
            * Performs multidimensional scaling (MDS) in order to assign each phenotype vector to a two dimensional space. 
            * Calculates a specificity score by blasting eacn individual against the human genome.
            * Determines which individuals are acceptable based on certain criteria. MAYBE move this to server so the user can use their own acceptability filters.
            * Calculates a marginal diversity rank for each acceptable individual.
            * Folds each sRz on their own (i.e. without the substrate)
        '''

        #MDS values are not currently being used, but they were used in my paper/thesis for visualizing the high dimensional phenotype space
        if app.config['PERFORM_MDS'] == True:
            print("Performing multidimensional scaling (MDS)")
            individuals = self.population
            num_inds = len(individuals)
            distance_matrix = self.calculate_distance_matrix_tc(individuals, self.rzbs_diversity_weight)   
            mds = MDS(n_components=2, dissimilarity='precomputed')
            pos = mds.fit(distance_matrix.astype(np.float64)).embedding_
            for i in range(num_inds):
                individuals[i].potential_fitnesses['mdsX'] = pos[i, 0]
                individuals[i].potential_fitnesses['mdsY'] = pos[i, 1]

        #Calculate Specificity score by blasting the RzBS against the human genome
        if app.config['PERFORM_BLAST']:
            for ind in self.population:
                rzbs = self.downstream_seq[ind.rzbs_start_idx:ind.rzbs_start_idx + self.rzbs_len]
                blast_output = run_blast(rzbs, app.config['BLAST_DB_PATH'])
                ind.potential_fitnesses['specificity'] = calculate_specificity(blast_output)
                print("specificity", ind.potential_fitnesses['specificity'], rzbs)

        #Acceptable
        acceptable_individuals = list()
        individuals = self.population
        for ind in individuals:
            if self.bool_quick_ea:
                ind.potential_fitnesses['acceptable'] = int( ind.potential_fitnesses['viability'] >= -1 ) #When quick ea debugging all the generated designs will be bad but we still want to view them. 
            else:
                ind.potential_fitnesses['acceptable'] = int( ind.potential_fitnesses['viability'] >= self.max_via*0.9444444) #We multiply max viability by a factor < 1 to give some breathing room. 0.94...4 was chosen because in TC paper I have max_via = 0.90 and acceptable_threshold = 0.85. #!!!!!!!!!!!!!!!! TO DO: DOUBLE CHECK THIS !!!!!!!!!
            if ind.potential_fitnesses['acceptable'] == 1:
                acceptable_individuals.append(ind)


        #Calculate marginal diversity rank
        for ind in individuals:
            if ind.potential_fitnesses['acceptable'] == 0:               
                ind.potential_fitnesses['mdg'] = -len(acceptable_individuals) #This is the worst possible mdg rank
        num_inds = len(acceptable_individuals)
        distance_matrix = self.calculate_distance_matrix_tc(acceptable_individuals, self.rzbs_diversity_weight)    
        mdg_ranks = rank_by_marginal_diversity(distance_matrix, num_inds)
        for i in range(num_inds):
            acceptable_individuals[i].potential_fitnesses['mdg'] = -mdg_ranks[i] #Negative value so that worse ranking individuals have lower value

        #Kharma wanted me to fold the SRzs on their own. This is not used as part of the EA loop. It is only used to visualize the sRz on its own on the web app. 
        common_data = (self.folding_temp, 1, app.config['VIENNA_PATH'])
        batch = [[ind.strands[0], '.'*len(ind.strands[0])] for ind in self.population]
        results = multicore(batch, server_fold, app.config['NUM_PROCESSES'], common_data)
        for idx, result in enumerate(results):
            self.population[idx].mfe_db_srz_only = result[0]

        ##!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! IN PROGRESS
        ##Fold it with a longer region around the RzBS
        #if self.template_params['RZBS_EXTENSION_LEN_POST'] > self.template_params['RZBS_EXTENSION_LEN']:
        #    individuals = copy.deepcopy(self.population) #We don't want to actually change the memberse of the population, just get the fitness results with the longer region
        #    for ind in individuals:
        #        ind.sccs, ind.bcc_to_scc, ind.mutation_prob = update_representation(ind.sccs, ind.rzbs_start_idx, self.template, self.downstream_seq, self.repeats, True) #Update the representation with POST flag set to 1


    def mutate_parent(self, ind):
        for m in range(self.mutation_rate):
            mutation_type = np.random.choice(self.mutation_types, 1, p=self.mutation_probs)[0]
            if mutation_type == 'RzBS':
                options = [i for i in self.allowed_rzbs_start_idxs if i != ind.rzbs_start_idx]
                ind.rzbs_start_idx = np.random.choice(options)
                ind.sccs, ind.bcc_to_scc, ind.mutation_prob = update_representation(ind.sccs, ind.rzbs_start_idx, self.template, self.downstream_seq, self.repeats, False) #Since the RzBS is mutated, we need to update the representation
            elif mutation_type == 'BCC':
                mutate_bcc(ind.bcc_to_scc, ind.mutation_prob, ind.sccs)
            else:
                raise NotImplementedError(f"There is no mutation function for mutation type: ({mutation_type})")

                
