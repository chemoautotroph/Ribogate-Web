from ..ea import *
from .repr import SRS
from ..utility import multicore, search_list_objs, non_dominated_sort
from .semantics import *
from sklearn.manifold import MDS
from .rz_templates import build_template

from ..common.representation import generate_segments, generate_strands, build_base_maps, build_bcc_to_scc_map, calculate_mutation_probabilities, determine_valid_nucleotide_assignments, initialize_sequence, SCC
from ..common.mutation import mutate_bcc

from WS import app

class TruthSeqEr(EA):
    def __init__(self, template_params, num_inputs, truth_vector, viability_params, is_fast_folding_enabled, folding_temp, bool_l_segments, bool_quick_ea):
        EA.__init__(self)
        
        self.truth_vector = truth_vector
        self.num_inputs = num_inputs
        self.num_strands = num_inputs + 1 #1 strand for each input, plus the ribogate strand
        self.is_fast_folding_enabled   = is_fast_folding_enabled
        self.folding_temp        = folding_temp
        self.bool_l_segments             = bool_l_segments

        self.min_via, self.max_via, self.bool_breakpoint, self.breakpoint_via, self.breakpoint_gen = viability_params
        self.sccs, self.extension_region_seg_ids = build_template(*template_params)

        self.bool_quick_ea = bool_quick_ea
      
    #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO BUILD name_to_bases in configuration and store it inside EA object
    def create_individual(self):
        ind = SRS()
        ind.sccs = copy.deepcopy(self.sccs) #These are the same for all individuals and constant throughout the EA      
        ind.truth_vector = copy.deepcopy(self.truth_vector)

        ###########################################
        for scc in ind.sccs:
            scc.valid_nucs = determine_valid_nucleotide_assignments(scc.constraints, scc.mismatches, scc.length, scc.size)           

        scc_lengths = [scc.length for scc in ind.sccs]
        ind.bcc_to_scc = build_bcc_to_scc_map(scc_lengths)

        ind.mutation_prob = calculate_mutation_probabilities(ind.bcc_to_scc, ind.sccs)

        ind.sccs = initialize_sequence(ind.sccs)

        #############################################

        return ind

    def copy_ind(self, ind):
        new_ind                     = SRS()
        new_ind.sccs                = copy.deepcopy(ind.sccs)
        new_ind.id                  = ind.id
        new_ind.bcc_to_scc          = copy.deepcopy(ind.bcc_to_scc)
        new_ind.mutation_prob       = copy.deepcopy(ind.mutation_prob)
        new_ind.truth_vector        = copy.deepcopy(ind.truth_vector)
        new_ind.input_states        = copy.deepcopy(ind.input_states)
        new_ind.name_to_bases       = copy.deepcopy(ind.name_to_bases)
        new_ind.potential_fitnesses  = copy.deepcopy(ind.potential_fitnesses)
        return new_ind


    #I need this for continuing from an initial pop
    def pre_insert(self, inds):
        new_inds = list()
        for ind in inds:
            new_ind                     = copy.deepcopy(ind)
            new_ind.folding_constraints = [task[1] for task in ind.tasks[0]] #ind.tasks[0] are the logic tasks
            new_inds.append(new_ind)
        return new_inds

    def evaluate_fitness(self):
        population_full = [search_list_objs(self.population, 'id', ind.id)[0] for ind in self.parents] #Because I removed the deep copies, the parents don't have any phenotype

        if self.is_fast_folding_enabled == 0 or (self.is_fast_folding_enabled == 1 and self.cur_gen == self.num_gens - 1):
            bool_300 = 1
            pool    = population_full + self.offspring #We need to make sure ALL individuals in the final population go through bool 300 folding
        else:
            bool_300 = 0
            pool    = self.offspring

        batch = list()
        for ind in pool:
            #Prepare tasks
            ind.segments = generate_segments(ind.sccs, self.num_strands)
            ind.strands = generate_strands(ind.segments, self.num_strands)
            ind.base_to_seg, ind.name_to_bases = build_base_maps(ind.segments)
            ind.tasks, ind.input_states = ind.generate_folding_tasks(self.num_inputs, ind.strands, ind.name_to_bases)
            batch.append(ind.tasks) 

        common_data   = (ind.base_to_seg, ind.name_to_bases, self.extension_region_seg_ids, self.truth_vector, self.num_inputs, bool_300, self.folding_temp, self.bool_l_segments, app.config['VIENNA_PATH'])

        num_processes = app.config['NUM_PROCESSES']
        self.num_processes_novelty = num_processes
        results = multicore(batch, pheno_perf_fits, num_processes, common_data)
        #results = pheno_perf_fits([batch, common_data]) #Single core


        #Store results back in individuals and prepare distance calculation
        phenos = list()
        for i, ind in enumerate(pool):
            result = results[i]
            ind.potential_fitnesses = result[0]
            ind.coarse_pheno        = result[1]
            ind.mfe_dbs             = result[2]

        #Novelty
        print("Starting novelty")        
        novelty_pool    = population_full + self.offspring
        num_inds         = len(novelty_pool)
        distance_matrix = self.calculate_distance_matrix(novelty_pool)  

        neighborhood_size = 30
        for i in range(num_inds):
            distances = list()
            for j in range(num_inds):
                distances.append(distance_matrix[i, j])                      

            neighbor_idxs                                  = arg_sort(distances)[0:neighborhood_size]
            novelty_pool[i].potential_fitnesses['novelty'] = sum([distances[n_idx] for n_idx in neighbor_idxs])
        
    def calculate_distance_matrix(self, pool):
        batch   = list()
        num_inds = len(pool)
        for i in range(num_inds): 
            for j in range(num_inds):
                batch.append((pool[i].coarse_pheno, pool[j].coarse_pheno))
        results = multicore(batch, dot_distance_batch, self.num_processes_novelty, [])

        task_id               = 0
        distance_matrix = np.zeros(( num_inds, num_inds )) #Used later for MDS
        for i in range(num_inds):
            for j in range(num_inds):
                distance_matrix[i, j] = results[task_id]
                task_id += 1   

        return distance_matrix

    def post_process(self):
        print("MDS")
        pool            = self.population
        num_inds         = len(pool)
        distance_matrix = self.calculate_distance_matrix(pool) 
        mds             = MDS(n_components=2, dissimilarity='precomputed')
        pos             = mds.fit(distance_matrix.astype(np.float64)).embedding_
        for i in range(num_inds):
            pool[i].potential_fitnesses['mdsX'] = pos[i, 0]
            pool[i].potential_fitnesses['mdsY'] = pos[i, 1]

        #Acceptable
        acceptable_pool = list()
        for ind in pool:
            if self.bool_quick_ea:
                ind.potential_fitnesses['acceptable'] = int( ind.potential_fitnesses['viability'] >= -1 ) #When quick ea debugging all the generated designs will be bad but we still want to view them. 
            else:
                #ind.potential_fitnesses['acceptable'] = int( ind.potential_fitnesses['viability'] >= self.max_via*0.9444444 ) #We multiply max viability by a factor < 1 to give some breathing room. 0.94...4 was chosen because in TC paper I have max_via = 0.90 and acceptable_threshold = 0.85.
                ind.potential_fitnesses['acceptable'] = int( ind.potential_fitnesses['viability'] >= self.max_via*0.9444444 and ind.potential_fitnesses['verification'] >= 0.90 and ind.potential_fitnesses['excess'] >= -0.07 and ind.potential_fitnesses['gQuad'] == 0 ) 
            if ind.potential_fitnesses['acceptable'] == 1:
                acceptable_pool.append(ind)

        #Marginal diversity gain(MDG)
        #Handle unacceptable individuals
        for ind in pool:
            if ind.potential_fitnesses['acceptable'] == 0:               
                ind.potential_fitnesses['mdg']        = -len(acceptable_pool) #This is effectively -inf

        #Handle acceptable individuals
        pool              = acceptable_pool
        num_inds           = len(pool)
        if num_inds == 0: #no acceptable individuals
            pass 
        elif num_inds == 1:
            pool[0].potential_fitnesses['mdg'] = 0
        else:
            distance_matrix   = self.calculate_distance_matrix(pool)      
            mdg_idxs          = list()
            furthest_pair_idx = np.argmax(distance_matrix)                          #This is the (single) index of the pair in a 2d matrix
            mdg_idxs += [furthest_pair_idx % num_inds, furthest_pair_idx // num_inds] #From this pair index, we get the index of each element of the pair
            while len(mdg_idxs) < num_inds:
                candidate_distances = list()
                unplaced_idxs       = [idx for idx in range(num_inds) if idx not in mdg_idxs]
                for unplaced_idx in unplaced_idxs:
                    marginal_distances = list()
                    for mdg_idx in mdg_idxs:
                        marginal_distances.append(distance_matrix[unplaced_idx, mdg_idx])
                    candidate_distances.append( min(marginal_distances)  )
                temp_idx = arg_sort(candidate_distances)[-1]
                mdg_idxs.append( unplaced_idxs[temp_idx] )

            pool[ mdg_idxs[0] ].potential_fitnesses['mdg'] = 0
            pool[ mdg_idxs[1] ].potential_fitnesses['mdg'] = 0
            for mdg_rank in range(2, num_inds):
                pool[ mdg_idxs[mdg_rank] ].potential_fitnesses['mdg'] = -mdg_rank
           

    def mutate_parent(self, ind):
        for m in range(self.mutation_rate):
            mutate_bcc(ind.bcc_to_scc, ind.mutation_prob, ind.sccs)
            
       


