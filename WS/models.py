from . import db
from flask_login import UserMixin

class User(UserMixin, db.Model):
    id       = db.Column(db.Integer, primary_key=True) # primary keys are required by SQLAlchemy
    email    = db.Column(db.String(100), unique=True)
    password = db.Column(db.String(100))
    name     = db.Column(db.String(1000))
    confirmed = db.Column(db.Boolean, default=False) 

class GoogleIdentity(db.Model):
    id = db.Column(db.Integer, primary_key=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=False, unique=True)
    subject = db.Column(db.String(255), nullable=False, unique=True)
    email = db.Column(db.String(100), nullable=False)


class GoogleLoginAttempt(db.Model):
    state_hash = db.Column(db.String(64), primary_key=True)
    binding_hash = db.Column(db.String(64), nullable=False, index=True)
    expires_at = db.Column(db.Float, nullable=False, index=True)
    user_id = db.Column(db.Integer, db.ForeignKey('user.id'), nullable=True)
    next_path = db.Column(db.String(2048), nullable=False)


class Individuals(db.Model): 
    id_in_db   = db.Column(db.Integer, primary_key=True, index=True)
    id         = db.Column(db.Integer, index=True)   
    job        = db.Column(db.Integer, index=True) 
    fitnesses  = db.Column(db.PickleType)
    pop_type   = db.Column(db.Integer)
    cur_gen    = db.Column(db.Integer)
    object     = db.Column(db.PickleType)

class Jobs(db.Model):
    id                         = db.Column(db.Integer, primary_key=True)
    user_id                    = db.Column(db.Integer, index=True)
    status                     = db.Column(db.String, index=True)
    date                       = db.Column(db.DateTime, index=True)
    type                       = db.Column(db.String) #TS or TC

    #Common TS and TC params
    folding_temp               = db.Column(db.Float)
    bool_fast_folding          = db.Column(db.Integer) #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO switch this to is_fast_folding_enabled
    template_params            = db.Column(db.PickleType)
    environment                = db.Column(db.String)

    #TS params
    num_inputs                 = db.Column(db.Integer)
    truth_vector               = db.Column(db.PickleType)
    input_seqs                 = db.Column(db.PickleType)
    function_num               = db.Column(db.Integer)
    bool_TT                    = db.Column(db.Integer) #!!!! TO DO: Migrate
    #bool_l_segments            = db.Column(db.Integer)
    bool_constant_rz           = db.Column(db.Integer)

    #TC params
    wt_seq                     = db.Column(db.String)
    mutant_seq                 = db.Column(db.String)
    repeat_unit                = db.Column(db.String)
    num_repeats_wt             = db.Column(db.Integer)
    num_repeats_mutant         = db.Column(db.Integer)
    upstream_seq               = db.Column(db.String)
    downstream_seq             = db.Column(db.String)
    #ribozyme_type              = db.Column(db.String)
    allowed_cut_site_types     = db.Column(db.PickleType)
    allowed_rzbs_start_idxs    = db.Column(db.PickleType)

    #EA params
    viability_params           = db.Column(db.PickleType)
    num_inds                   = db.Column(db.Integer)
    num_gens                   = db.Column(db.Integer)
    parent_selection_method    = db.Column(db.Integer)
    parent_selection_params    = db.Column(db.PickleType)
    survivor_selection_method  = db.Column(db.Integer)
    crossover_prob             = db.Column(db.Float)
    mutation_probs             = db.Column(db.PickleType)
    mutation_rate              = db.Column(db.Float)
    selected_fitnesses         = db.Column(db.PickleType)
    last_completed_gen         = db.Column(db.Integer, default=-1) 

    #https://stackoverflow.com/questions/20572093/make-sure-sqlalchemy-doesnt-re-use-numeric-ids
    __table_args__ = {'sqlite_autoincrement': True}
