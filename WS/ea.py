import numpy as np
np.set_printoptions(precision=4)
import math
import copy
from .utility import*
from .server import insert_individuals_db, get_job_status

class EA():
    def __init__(self):
        self.population = list()
        self.parents = list()
        self.offspring = list()
        self.id_counter = 0 #The 1st individual has id = 1 so that it is consistent with flk SQL primary key that starts indexing at 1          
               
    def initialize_population(self, initial_pop):
        if initial_pop == None:
            for i in range(self.num_inds):
                new_individual = self.create_individual()
                self.id_counter += 1 
                new_individual.id = self.id_counter 
                self.offspring.append(new_individual)
        else:
            for ind in initial_pop:
                self.offspring.append(self.copy_ind(ind))
            self.id_counter = len(initial_pop)

    def evaluate_fitness(self):
        pass
    
    def apply_viability_nullification(self):
        '''
        Raises the viability threshold as described in "Evolutionary design and analysis of ribozyme-based logic gates" by N.Kamel and thesis
        If an individual's viability is below this threshold, set all its fitnesses to "negative infinity"
        '''

        final_gen = self.num_gens -1
        if self.bool_breakpoint == 1:
            if self.cur_gen < self.breakpoint_gen:
                self.cur_viability_threshold = self.min_via + self.cur_gen * (self.breakpoint_via - self.min_via) / float(self.breakpoint_gen)
            else:
                self.cur_viability_threshold = self.breakpoint_via + (self.cur_gen - self.breakpoint_gen) * (self.max_via - self.breakpoint_via) / float(final_gen - self.breakpoint_gen)
        else:
            self.cur_viability_threshold = self.min_via + self.cur_gen * (self.max_via - self.min_via) / float(final_gen)
        print("Current viability threshold", self.cur_viability_threshold)     
        
        '''
        For each potential fitness term, we create a variant with "Via" appended to its name
        If the individual's viability is above the threshold, the Via variant is equal to the original fitness term
        Otherwise, set the Via variant to "negative infinity"
        This allows us to nullify fitnesses while still keep track of their original value for reporting
        '''
        individuals = self.population + self.offspring
        pf_names = list(individuals[0].potential_fitnesses.keys())
        for ind in individuals:
            for name in pf_names:
                if 'Via' not in name: #Without this condition, we end up with nameViaViaVia ... Via
                    if ind.potential_fitnesses['viability'] < self.cur_viability_threshold:
                        ind.potential_fitnesses[name + "Via"] = -1000 #Nullify fitness. !!! Should probably define a proper INF global constant
                    else:
                        ind.potential_fitnesses[name + "Via"] = ind.potential_fitnesses[name]

    def apply_fitness(self):
        '''
        Copies of the values of certain selected fitnesses from the ind.potential_fitnesses dict to the ind.fitnesses list that is actually used for selection
        During fitness evaluation, multiple potential fitnesses are calculated
        However, not all of these will actually be used for selection during the EA
        Only those whose names are specified in selected_fitnesses are used
        '''

        for ind in self.offspring:
            ind.fitnesses = list()
            for fit_name in self.selected_fitnesses:
                ind.fitnesses.append(ind.potential_fitnesses[fit_name])

    def select_parents(self):
        if (self.parent_selection_method == 0): #Uniform parent selection
            self.parents = [self.copy_ind(ind) for ind in self.population]
        if (self.parent_selection_method == 2): #Tournament selection
            self.parents = [self.copy_ind(ind) for ind in self.population]
            self.parents = self.tournament_selection(self.parents)

    def tournament_selection(self,pool):
        winners = list()
        for i in range(self.num_inds): 
            tournament_winner = self.perform_tournament_round(pool)
            winners.append(self.copy_ind(tournament_winner))
        return winners

    def perform_tournament_round(self,pool):
        participants = list()
        for i in range(self.num_tournament_participants):
            current_participant_id = np.random.randint(0,self.num_inds)
            #This is with replacement, which reduces selection pressure e.g. if I have inds, the strongest one won't quite saturate immediately
            current_participant = pool[current_participant_id] 
            participants.append(current_participant)

        
        dataset = [p.fitnesses for p in participants]
        fittest_front = non_dominated_sort(dataset)[0]
        winner = participants[fittest_front[0]] #arbitrarily take the first element of best front
        return winner 

    def mutate_parent(self,parent):
        pass
        
    def crossover_parents(self,parent_1,parent_2):
        pass

    def copy_ind(self, ind):
        pass

    def produce_offspring(self):
        self.offspring = [self.copy_ind(ind) for ind in self.parents]

        num_parents = len(self.parents)
        num_parents_pairs = num_parents // 2
        #We randomize the order of the population so that we perform crossover with a random individual
        ids = np.random.choice(num_parents,  num_parents, replace = False) 
        for i in range(num_parents_pairs):
            sample = np.random.random_sample()
            parent_1 = self.offspring[ids[2*i]]
            parent_2 = self.offspring[ids[2*i+1]]
            self.id_counter += 1
            parent_1.id = self.id_counter
            self.id_counter += 1
            parent_2.id = self.id_counter
            
            if (sample < self.crossover_prob):
                self.crossover_parents(parent_1,parent_2)
            else:
                self.mutate_parent(parent_1)
                self.mutate_parent(parent_2)

  
    def select_survivors(self):
        population_plus_offspring = self.population  + self.offspring
        if self.survivor_selection_method == 0: #GENITOR: replace worst
            for ind in population_plus_offspring:
                ind.fitnesses = list()
                for sF in self.selected_fitnesses:
                    ind.fitnesses.append(ind.potential_fitnesses[sF])
                
            dataset = [p.fitnesses for p in population_plus_offspring]
            population_plus_offspring_fronts_ids = flatten(non_dominated_sort(dataset))[0:self.num_inds]
            self.population = [population_plus_offspring[id] for id in population_plus_offspring_fronts_ids]

    def post_process(self):
        pass


    def pre_insert(inds):
        pass

    def insert_individuals(self, pop_type, bool_overwrite, insertion_rate):
        if pop_type == 0:
            individuals_to_insert = self.offspring
        elif pop_type == 1:
            individuals_to_insert = self.population

        individuals_to_insert = self.pre_insert(individuals_to_insert)

        rows = list()
        for ind in individuals_to_insert:
            row = (ind.id,self.job_id,ind.fitnesses,pop_type,self.cur_gen, ind)
            rows.append(row)

        #if self.cur_gen % self.insertion_rate == 0 or self.cur_gen == (self.num_gens - 1):
        if (self.cur_gen + 1) % self.insertion_rate == 0 or self.cur_gen == 0 or self.cur_gen == self.num_gens - 1: #Always insert first and last generations:
            insert_individuals_db(rows, bool_overwrite, insertion_rate)


    def print_fitnesses(self,pool):
        fronts_indices = non_dominated_sort([p.fitnesses for p in pool])
        fittest_front = [pool[f] for f in fronts_indices[0]]
        for i in range(len(pool[0].fitnesses)):
            print("Objective " + str(i))
            print([round(ind.fitnesses[i],2) for ind in fittest_front])

    def cancel(self):
        self.status = "Cancelling"

    #No need to push an context here since one is already pushed to the scheduler and this runs in the same thread as the scheduler
    #In the past I tried running this in a different thread than the scheduler and pushing its own app context but this messed up the database objects and trying to debug it was a disaster.
    def run(self, num_inds, num_gens, parent_selection_method, parent_selection_params, survivor_selection_method, crossover_prob, mutation_rate, mutation_probs, selected_fitnesses, bool_store, initial_pop, last_completed_gen, job_id):
        self.status = "Running"
        self.insertion_rate = 1 #!!!!!!!!!!!!!!!!!!!!!!!!!!! 10
        self.selected_fitnesses = selected_fitnesses
        self.num_inds = num_inds
        self.num_gens = num_gens
        self.survivor_selection_method = survivor_selection_method #0 is genitor
        self.parent_selection_method   = parent_selection_method
        self.crossover_prob = crossover_prob
        self.mutation_rate = mutation_rate
        self.mutation_probs = mutation_probs
        self.bool_store = bool_store
        self.cur_gen = 0
        self.job_id = job_id
        status = get_job_status(self.job_id)

        if self.parent_selection_method == 2:
            self.num_tournament_participants = int(parent_selection_params[0]) #in this case selection_params is a list of a single number

        if last_completed_gen == -1:
            print("Generation " + str(self.cur_gen))
            print("Initializing population")
            #Treat the initial population like it is an offspring population. Initialize population creates an intial offspring but leaves population blank
            self.initialize_population(initial_pop) 
            print("Evaluating fitnesses") 
            self.evaluate_fitness()
            self.apply_viability_nullification()
            self.apply_fitness()
            print("Selecting survivors")
            self.select_survivors() #In this case, they are all survivors
            self.print_fitnesses(self.population)
            if self.bool_store == 1:
                print("Inserting into database")
                self.insert_individuals(1, 1, self.insertion_rate)
            last_completed_gen = 0
        else:
            self.population = [self.copy_ind(ind) for ind in initial_pop]

        for current_generation in range(last_completed_gen + 1, self.num_gens):
            status = get_job_status(self.job_id)
            if status == "Cancelled":
                break
            print("Generation " + str(current_generation))
            self.cur_gen = current_generation
            print("Selecting parents")
            self.select_parents()
            print("Producing offspring")
            self.produce_offspring()
            print("Evaluating fitnesses") 
            self.evaluate_fitness()
            self.apply_viability_nullification()
            self.apply_fitness()
            print("Selecting survivors")
            self.select_survivors()
            if current_generation == self.num_gens - 1:
                self.post_process()

            self.print_fitnesses(self.population)
            if self.bool_store == 1:   
                print("Inserting into database")
                self.insert_individuals(1, 1, self.insertion_rate)
        print("Finished EA")
        if status != "Cancelled": #If the EA did not break out early
            self.status = "Completed"

        
