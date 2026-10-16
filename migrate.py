from WS import db, app
from WS.models import Jobs, Individuals, User
import pickle

def export_table_to_pickle(model, output_file_path):
    data = model.query.all()
    with open(output_file_path, 'wb') as file:
        pickle.dump(data, file)
    print("Data exported successfully.")

#Only use this if the table model has not been modifed
def load_pickle_into_table(model, input_file_path):
    with open(input_file_path, 'rb') as file:
        data = pickle.load(file)        
    for item in data:
        db.session.add(item) 
    db.session.commit()
    print("Data loaded and inserted successfully.")


with app.app_context():
    #export_table_to_pickle(Jobs, "jobs_pickle")
    #export_table_to_pickle(Individuals, "individuals_pickle")
    #export_table_to_pickle(User, "user_pickle")

    with open("jobs_pickle", 'rb') as file:
        jobs = pickle.load(file)        
    for job in jobs:        

        allowed_rzbs_start_idxs = None #This isn't critical for completed jobs. If necessary I can extract this information froma allow_cut_site_types, downstream_seq, and the app.config params.

        migrated_job = Jobs(
            id=job.id, 
            user_id = job.user_id,
            status                      = job.status                     ,               
            date                        = job.date                       ,
            type                        = job.type                       ,
            folding_temp                = job.folding_temp               ,
            is_fast_folding_enabled           = job.is_fast_folding_enabled          ,
            template_params             = job.template_params            ,
            environment                 = job.environment                ,
            num_inputs                  = job.num_inputs                 ,
            truth_vector                = job.truth_vector               ,
            input_seqs                  = job.input_seqs                 ,
            function_num                = job.function_num               ,
            bool_l_segments                     = job.bool_l_segments                    ,
            bool_constant_rz            = job.bool_constant_rz           ,
            wt_seq                      = job.wt_seq                     ,
            mutant_seq                  = job.mutant_seq                 ,
            repeat_unit                 = job.repeat_unit                ,
            num_repeats_wt              = job.num_repeats_wt             ,
            num_repeats_mutant          = job.num_repeats_mutant         ,
            upstream_seq                = job.upstream_seq               ,
            downstream_seq              = job.downstream_seq             ,
            allowed_cut_site_types      = job.allowed_cut_site_types     ,
            allowed_rzbs_start_idxs     = allowed_rzbs_start_idxs        ,
            viability_params            = job.viability_params           ,
            num_inds                    = job.num_inds                   ,
            num_gens                    = job.num_gens                   ,
            parent_selection_method     = job.parent_selection_method    ,
            parent_selection_params     = job.parent_selection_params    ,
            survivor_selection_method   = job.survivor_selection_method  ,
            crossover_prob              = job.crossover_prob             ,
            mutation_probs              = job.mutation_probs             ,
            mutation_rate               = job.mutation_rate              ,
            selected_fitnesses          = job.selected_fitnesses         ,
            last_completed_gen          = job.last_completed_gen         ,
            )   
        db.session.add(migrated_job)
    db.session.commit()
   
    with open("individuals_pickle", 'rb') as file:
        inds = pickle.load(file)        
    for ind in inds:    
        object = ind.object
        if 'switchMin' in object.potential_fitnesses.keys():
            object.potential_fitnesses['viability'] = object.potential_fitnesses['switchMin'] 
            del object.potential_fitnesses['switchMin'] 

        migrated_ind = Individuals(
            id         = ind.id,
            job        = ind.job,
            fitnesses  = ind.fitnesses,
            pop_type   = ind.pop_type,
            cur_gen    = ind.cur_gen,
            object     = object
            )
        db.session.add(migrated_ind)
    db.session.commit()

    with open("user_pickle", 'rb') as file:
        users = pickle.load(file)        
    for user in users:            
        migrated_user = User(
            id        = user.id,       
            email     = user.email,    
            password  = user.password, 
            name      = user.name,     
            confirmed = user.confirmed
            )
        db.session.add(migrated_user)
    db.session.commit()

