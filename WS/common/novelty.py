import numpy as np

from ..utility import arg_sort, multicore

from WS import app

def calculate_manhattan_distance(v1, v2):
    return np.sum(np.abs(np.subtract(v1, v2)) )

def calculate_hamming_distance(v1, v2):
    return np.sum(v1 != v2)

def calculate_distance_batch(batch):
    tasks, common_data = batch
    metric = common_data[0]
    if metric == "manhattan":
        distance_function = calculate_manhattan_distance
    elif metric == "hamming":
        distance_function = calculate_hamming_distance
    else:
        raise NotImplementedError(f"There is no distance function for distance metric: ({metric})")
        
    results = list()
    for task in tasks:
        results.append(distance_function(*task))
    return results


def calculate_distance_matrix(vectors, metric):
    batch = list()
    num_vectors = len(vectors)
    #This batch preparation is inefficient (nested loop, list appending) but it is not currently a bottleneck
    for i in range(num_vectors):
        for j in range(len(vectors)):
            batch.append((vectors[i], vectors[j]))
    results = multicore(batch, calculate_distance_batch, app.config['NUM_PROCESSES'], [metric])
    #results = calculate_distance_batch((batch, [metric])) #Single core

    task_id = 0
    distance_matrix = np.zeros((num_vectors, num_vectors))    
    #Retrieve batch results. This is also inefficient, but not a bottleneck.
    for i in range(num_vectors):
        for j in range(num_vectors):
            distance_matrix[i, j] = results[task_id]
            task_id += 1  
            
    return distance_matrix

def calculate_novelty_scores(distance_matrix, neighborhood_size):
    '''
    TO DO: EXPLAIN HERE
    '''
        
    num_items = distance_matrix.shape[0]
    novelty_scores = np.zeros(num_items)
    for i in range(num_items):
        distances = list()
        for j in range(num_items):
            distances.append(distance_matrix[i, j])                      

        neighbor_idxs = arg_sort(distances)[0:neighborhood_size] #Find the nearest neighbors
        novelty_scores[i] = sum([distances[n_idx] for n_idx in neighbor_idxs])
        
    return novelty_scores
  
def rank_by_marginal_diversity(distance_matrix, num_inds):
    '''
    Ranks the individuals in such a way that the Nth individual is the one that is the furthest away (in phenotype space) from the previous N-1 individuals. Uses a greedy algorithm. 
    '''

    mdg_ranks = list()
    if num_inds == 0: #no acceptable individuals
        pass 
    elif num_inds == 1:
        mdg_ranks = [0]
    else: 
        mdg_idxs = list()
        furthest_pair_idx = np.argmax(distance_matrix) #This is the scalar index of the pair in a 2d matrix
        mdg_idxs += [furthest_pair_idx % num_inds, furthest_pair_idx // num_inds] #From this scalar pair index, we get the index of each element of the pair
        while len(mdg_idxs) < num_inds:
            candidate_distances = list()
            unplaced_idxs = [idx for idx in range(num_inds) if idx not in mdg_idxs]
            #For each unplaced point, retrieve the distance to the closest placed point. This is the 'candidate_distance'
            #Then find the unplaced point that is furthest to all placed points (i.e. the one with the highest candidate_distance value)
            for unplaced_idx in unplaced_idxs:
                marginal_distances = list()
                for placed_idx in mdg_idxs:
                    marginal_distances.append(distance_matrix[unplaced_idx, placed_idx])
                candidate_distances.append( min(marginal_distances)  )
            furthest_candidate_idx = arg_sort(candidate_distances)[-1]
            mdg_idxs.append( unplaced_idxs[furthest_candidate_idx] )

        #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! THIS SEEMS TO BE A BUG
        #The furthest pair are given top rank
        mdg_ranks = [0,0]
        for i in range(2, num_inds):
            mdg_ranks.append( mdg_idxs[i])
    return mdg_ranks
