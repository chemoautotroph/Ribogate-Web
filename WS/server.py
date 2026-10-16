from flask import Blueprint, render_template, request, jsonify, make_response, redirect, url_for, send_file, flash
from .models import *
from flask_login import current_user, login_required
from datetime import datetime, timedelta
import time
import csv
import xlsxwriter
from io import BytesIO
from .utility import *
from .server_utility import *
import math
import sys
import copy
from sqlalchemy import and_, or_

from WS import app
from .validation import TCSubmissionForm

from flask import session #Need import this in each module that access the session state

Server = Blueprint('Server', __name__)

def InsertTrial(params):
    job = Jobs(*params)
    db.session.add(job)
    db.session.commit()

def get_job_status(job_id):
    job = Jobs.query.filter(Jobs.id == job_id).first() 
    if job != None:
        return job.status
    else:
        return "ERROR"
      
def insert_individuals_db(rows, bool_overwrite, insertion_rate):
    job_id = rows[0][1]
    last_completed_gen = rows[0][4]
    job = Jobs.query.filter(Jobs.id == job_id).first() 
    #Ensures that individuals aren't inserted into a job that has been deleted. This requires that job.id are never re-used. Confirm this with the sq lite auto-increment
    if job != None:
        job.last_completed_gen = last_completed_gen

        #Keep the 3 most recently inserted gens. Delete the others
        if bool_overwrite:
            Individuals.query.filter(Individuals.job == job_id, Individuals.cur_gen <= (last_completed_gen -3*insertion_rate)).delete()

        for row in rows:
            #db.session.add(Individuals(*row)) #May 2024 I rebuilt db with indexed columns and this line stopped working. Not sure if the indices where the cause. In any case the line below works.
            db.session.add(Individuals(id=row[0], job=row[1], fitnesses=row[2], pop_type=row[3], cur_gen=row[4], object=row[5])) 

        db.session.commit()

def build_color_string(segments, seg_colors):
    '''
    Building a color string to be fed into a custom FORNA javascript script
    '''

    color_string = ''
    accum = 0 #color string is 0-indexed
    for i in range(2):
        strand_segs = [seg for seg in segments if seg.strand == i]
        for seg in strand_segs:
            color_string += str(accum) + '-' + str(accum + seg.length - 1) + ':' + seg_colors[seg.name] + ' ' #?? -1 because color string end is inclusive
            accum += seg.length
        accum += 2 #FORNA requires a gap of 2 between strands in order to display colors correctly
    return color_string  

@Server.route("/TS/structures", endpoint="structures_TS", methods=['GET'])
@Server.route("/TC/structures", endpoint="structures_TC", methods=['GET'])
@login_required
def render_structures():
    '''
    Handles the inital request to view the secondary structure of an individual
    The actual logic for retrieving the secondary structure data is performed by structures json.
    '''

    endpoint = request.endpoint
    if endpoint == "Server.structures_TC":
        sub_app_name = "TC"
    elif endpoint == "Server.structures_TS":
        sub_app_name = "TS"

    job = request.args.get('job', 0, type=int)  
    gen = request.args.get('gen', 0, type=int)  
    ind_id = request.args.get('ind_id', 0, type=int)
    return render_template('structures_' + sub_app_name + '.html', title='Secondary structures', job = job, gen = gen, ind_id = ind_id)

@Server.route("/structures_JSON",  methods=['GET'])
def structures_json():
    '''
    JSON callback function called from structures_TC/TS.html
    Retrieves the secondary structure data for a given state of a given individual
    Uses a session object to cache an individual the first time it is retrieved so the user can view different states without having to requery the db
    '''
    
    #Handle empty session
    if 'prev_job_id' not in session:
        session['prev_job_id'] = -1
    if 'prev_state_id' not in session:
        session['prev_state_id'] = 0
    if 'prev_ind_id' not in session:
        session['prev_ind_id'] = -1
    if 'prev_ind' not in session:
        session['prev_ind'] = None

    #Process the GET request
    job_id = request.args.get('job', 0, type=int)  
    gen = request.args.get('gen', 0, type=int)  
    ind_id = request.args.get('ind_id', 0, type=int)  
    state_id = request.args.get('state',0,type=int)
    sub_app_name = request.args.get('sub_app',0,type=str)

    #If a new individual was queried, retrieve it from db and cache it. Otherwise retrieve the cached individual.
    if ind_id != session['prev_ind_id'] or job_id != session['prev_job_id']:
        ind = Individuals.query.filter(Individuals.job == job_id, Individuals.cur_gen == gen, Individuals.id == ind_id).filter(Individuals.pop_type.in_([1])).all()[0].object  
        session['prev_job_id'] = job_id
        session['prev_state_id'] = 0
        session['prev_ind_id'] = ind_id
        session["prev_ind"] = ind #Works now but older version couldn't directly JSON serialize an object             
    else:
        ind = session["prev_ind"]          
        session['prev_state_id'] = state_id
        print("Retrieved cached individual")
    
    pheno = ind.mfe_dbs[state_id]
    

    #constraints = [task[1] for task in ind.tasks[0]] #I changed ind.tasks[0]
    constraints = [task[1] for task in ind.tasks] #I changed ind.tasks[0] to ind.tasks since I no longer subdivide tasks into logic_tasks, etc. for TC
    
    #Debug the session caching. Try viewing secondary structures on two different browsers. Each browser should print its own value for session["test"]
    #if "test" in session.keys():
    #    session["test"] += 1
    #    print("SESSION", session["test"])

    
    if sub_app_name == "TS":
        geno = ind.strands[0]

        #Prepare the state names that are shown in the truth table
        input_states = [list(i) for i in ind.input_states]

        return jsonify((geno, pheno, constraints, ind.color_string, input_states, ind.truth_vector))

    elif sub_app_name == "TC":
        geno = ind.strands[0] + "&" + ind.strands[1]

        #Prepare the state names that are shown in the truth table
        num_states = len(ind.mfe_dbs)
        if num_states <= 2:
            raise ValueError("In TriCleaver, there must be at least 3 states. Something went wrong upstream.")
        state_names = ["SRz "]
        for i in range(num_states-2):
            state_names.append("SRz + WT configuration " + str(i) + " ")
        state_names.append("SRz + mutant ")
        output_states = ["No"]*(num_states-1) + ["Yes"]

        #In the first state, the EA folds the SRz with the cut-site region but assumes no repeats bind. This structure is stored in ind.mfe_dbs[0]
        #But instead of showing that, Kharma wants me to show how the SRz folds when it is not bound to any substrate. So in state 0 we override that structure
        if state_id == 0:   
            pheno = ind.mfe_db_srz_only    

        #Show the RzBS sequence (as well as RZBS_EXTENSION_LEN nucleotides flanking it upstream and downstream) and mark the cut site
        cut_position = app.config['TEMPLATE_PARAMS']['RZBS_EXTENSION_LEN'] + app.config['TEMPLATE_PARAMS']['S3_LEN'] + 1
        marked_cut_region = ind.strands[1][0:cut_position] + "|" + ind.strands[1][cut_position:]

        #print(pheno)
        #print(constraints)
        #print(ind.potential_fitnesses['viability'])
 
        color_string = build_color_string(ind.segments, app.config['SEG_COLORS'])

        print(ind.potential_fitnesses['viability'])

        #Wrap relevant segment properties in a list of dictionaries so that they may be JSON serialized
        segments_js = list()
        for seg in ind.segments:
            if seg.strand < 2:
                seg_js = {'name': app.config['VERBOSE_SEG_NAMES'][seg.name], 'color': app.config['SEG_COLORS'][seg.name]}
                segments_js.append(seg_js)

        return jsonify((geno, pheno, constraints, color_string, state_names, output_states, marked_cut_region, segments_js, 'TC'))


#######!!!!!!!!!!###########
@Server.route("/debug_novelty",  methods=['GET'])
@login_required
def debug_novelty():    
    from .common.novelty import calculate_manhattan_distance, calculate_hamming_distance, rank_by_marginal_diversity, calculate_distance_matrix

    #Process the GET request
    job_id = request.args.get('job', 0, type=int)  
    print("job_id", job_id)
    gen = 199
    
    inds_db = Individuals.query.filter(Individuals.job == job_id, Individuals.cur_gen == gen).filter(Individuals.pop_type.in_([1])).all()
    inds = [ind.object for ind in inds_db]
    phenos = [ind.coarse_pheno for ind in inds]
    rzbs_sites = [np.array([ind.rzbs_start_idx]) for ind in inds]
    distance_matrix_pheno = calculate_distance_matrix(phenos, 'manhattan')
    
    mdg_values = rank_by_marginal_diversity(distance_matrix_pheno, len(inds))
    print("mdg", mdg_values)


    furthest_pair_idx = np.argmax(distance_matrix_pheno) 
    print ("hope", [furthest_pair_idx % len(inds), furthest_pair_idx // len(inds)] )

    ###############
    # inds = get_ranked_inds(job_id, gen)
    # phenos = [ind.coarse_pheno for ind in inds]
    # rzbs_sites = [np.array([ind.rzbs_start_idx]) for ind in inds]
    
    # dist = calculate_manhattan_distance(phenos[0], phenos[1])
    # dist_h = calculate_hamming_distance(rzbs_sites[0], rzbs_sites[1])
    # print("manhattan dist", dist, dist_h)

    # dist = calculate_manhattan_distance(phenos[1], phenos[2])
    # print("manhattan dist", dist)
    
    # dist = calculate_manhattan_distance(phenos[2], phenos[3])
    # dist_h = calculate_hamming_distance(rzbs_sites[2], rzbs_sites[3])
    # print("manhattan dist", dist, dist_h)


############################    

@Server.route("/TC/request",  methods=['GET'])
@login_required
def Request_TC():
    num_user_jobs = len( Jobs.query.filter(and_(Jobs.user_id == current_user.id, or_(Jobs.status == "Running", Jobs.status == "Queued") ) ).all() ) #Using a SQL COUNT function would be more efficient
    if num_user_jobs >= app.config['MAX_NUM_USER_JOBS']:
        if app.config['MAX_NUM_USER_JOBS'] == 1:
            job_str = ' job'
        else:
            job_str = ' jobs'

        flash('You can only have ' + str(app.config['MAX_NUM_USER_JOBS']) + job_str + ' running or queued at a time. Either wait for your queued/running jobs to complete or cancel/delete them.' , 'max_num_jobs_exceeded')
        return redirect(url_for('main.index_TC'))

    form = TCSubmissionForm()
    return render_template('request_TC.html', form=form, step=1)


@Server.route("/TC/process_submission",  methods=['GET', 'POST'])
@login_required
def ProcessSubmission_TC():
    form = TCSubmissionForm()
    action = request.form.get('action')
    #There are three buttons on the submission form, although not all three will be simultaneously visible. "Go to step 2" and "submit" have "submit" action whereas "return to step 1" has "return" action. 
    if action =="return": #The user was on step 2 and clicked the return button to go back to step 1
        return render_template('request_TC.html', form=form, step=1)
    else:
        if form.validate_on_submit():
            if form.step == 1: #If the form is valid and it was in step 1, we can now render stpe 2
                return render_template('request_TC.html', form=form, step=2, num_repeats_mutant = form.num_repeats_mutant, num_repeats_wt=form.num_repeats_wt, repeat_unit = form.repeat_unit, num_cut_sites = form.num_cut_sites)
            else: #If the valid form was in the second step, we are ready creature the EA job        
                if app.config['QUICK_EA']:
                    num_inds = 8
                    num_gens = 4
                else:
                    num_inds = 300
                    num_gens = 200
                mutation_rate = 6
                mutation_probs = [0.85, 0.15]
                
                if app.config['VIABILITY_TC']:
                    selected_fitnesses = list()
                    for name in app.config['SELECTED_FITNESSES_TC']:
                        selected_fitnesses.append(name + 'Via')
                else:
                    selected_fitnesses = app.config['SELECTED_FITNESSES_TC']

                job = Jobs(user_id=current_user.id, date=datetime.today(), template_params = app.config['TEMPLATE_PARAMS'], allowed_cut_site_types = form.allowed_cut_site_types, allowed_rzbs_start_idxs = form.allowed_rzbs_start_idxs, folding_temp=form.temperature, environment=form.environment, bool_fast_folding=app.config['FAST_FOLDING'], viability_params=app.config['VIABILITY_PARAMS_TC'], wt_seq=form.wt_seq, mutant_seq=form.mutant_seq, num_repeats_wt=form.num_repeats_wt, num_repeats_mutant=form.num_repeats_mutant, repeat_unit = form.repeat_unit, upstream_seq=form.upstream_seq, downstream_seq=form.downstream_seq, num_inds=num_inds, num_gens=num_gens, selected_fitnesses=selected_fitnesses, parent_selection_method=0, parent_selection_params=[], survivor_selection_method=0, crossover_prob=0, mutation_rate=mutation_rate, mutation_probs=mutation_probs, status="Queued", type="TC")

                #!!! This has ribozyme type. Swap it in after.
                #job = Jobs(user_id=current_user.id, date=datetime.today(), template_params = app.config['TEMPLATE_PARAMS'], allowed_cut_site_types = form.allowed_cut_site_types, allowed_rzbs_start_idxs = form.allowed_rzbs_start_idxs, folding_temp=form.temperature, environment=form.environment, is_fast_folding_enabled=app.config['FAST_FOLDING'], viability_params=app.config['VIABILITY_PARAMS_TC'], wt_seq=form.wt_seq, mutant_seq=form.mutant_seq, num_repeats_wt=form.num_repeats_wt, num_repeats_mutant=form.num_repeats_mutant, repeat_unit = form.repeat_unit, upstream_seq=form.upstream_seq, downstream_seq=form.downstream_seq, ribozyme_type=form.ribozyme_type, num_inds=num_inds, num_gens=num_gens, selected_fitnesses=selected_fitnesses, parent_selection_method=0, parent_selection_params=[], survivor_selection_method=0, crossover_prob=0, mutation_rate=mutation_rate, mutation_probs=mutation_probs, status="Queued", type="TC")
                db.session.add(job)
                db.session.commit()
        else:
            print("VALIDATION FAILED")
            if form.errors:
                print(form.errors)
            if form.step == 1: #Dummy values
                form.num_repeats_mutant, form.num_repeats_wt, form.repeat_unit, form.num_cut_sites = -1,-1,"Z",-1
                form.cut_site_counts = []

            return render_template('request_TC.html', form=form, step=form.step, num_repeats_mutant = form.num_repeats_mutant, num_repeats_wt=form.num_repeats_wt, repeat_unit = form.repeat_unit, num_cut_sites = form.num_cut_sites)


        #return redirect(url_for("Server.TC_job_details", id=job.id, page_num=0))
        flash('TriCleaver job successfully added to queue. It may take several hours to several days for the job to complete, depending on the number of jobs in the queue.', 'request_success')
        return redirect(url_for("Server.TC_jobs_summary"))

###########################

#!!!! IN PROGRESS
@Server.route("/TS/jobs_summary", methods=['GET'])
@login_required
def TS_jobs_summary():
    return render_template('jobs_summary_TC.html', title='Jobs', store_jobs_days=app.config['STORE_JOBS_DAYS'], sub_app_name = 'TS' ) 

@Server.route("/TC/jobs_summary", endpoint="TC_jobs_summary", methods=['GET'])
@login_required
def TC_jobs_summary():
    return render_template('jobs_summary_TC.html', title='Jobs', store_jobs_days=app.config['STORE_JOBS_DAYS'], sub_app_name = 'TC') 
    

@Server.route("/TS/jobs_summary_json",  endpoint="ts_jobs_summary_json", methods=['GET', 'POST'])
@Server.route("/TC/jobs_summary_json",  endpoint="tc_jobs_summary_json", methods=['GET', 'POST'])
def jobs_summary_json():
    endpoint = request.endpoint
    if endpoint == "Server.tc_jobs_summary_json":
        sub_app_name = "TC"
    elif endpoint == "Server.ts_jobs_summary_json":
        sub_app_name = "TS"

    #Handle the post request that is made when users click on the delete button
    if request.method == 'POST':
        job_id_to_delete = request.form.get('job_id_to_delete',0,type=int) 
        job = Jobs.query.filter(Jobs.id==job_id_to_delete).first()
        #Don't actually delete anything here. The deletion will happen in the scheduler. Just mark running and jobs as cancelled.
        job.status = "Cancelled"
        db.session.commit()

    #Running jobs that are cancelled are not deleted instantly (we have to wait for the EA to break out of loop so we explicitly hide them
    jobs = Jobs.query.filter(and_(Jobs.user_id == current_user.id, Jobs.status != "Cancelled")).all() #and_ operator is required (we can just use: cond1 and cond2)
    num_jobs = len(jobs)
    records = []
    for i in range(num_jobs):
        job = jobs[i]
        link = "/" + sub_app_name + "/job_details?id=" + str(job.id)
        progress = 100*(job.last_completed_gen+ 1) / job.num_gens
        if sub_app_name == "TC" and job.type== "TC":
            num_displayed_nucleotides = 75 #Truncate the shown mutant sequence to this number of nucleotides
            if len(job.mutant_seq) <= num_displayed_nucleotides:
                displayed_mutant_seq = job.mutant_seq
            else:
                displayed_mutant_seq = job.mutant_seq[0:num_displayed_nucleotides] + "..."

            record = {'id': job.id, 'date': job.date, 'mutant_seq': displayed_mutant_seq, 'link': link, 'status': job.status, 'progress': progress, 'type': 'TC'}
            records.append(record)
        elif sub_app_name == "TS" and job.type == "TS":
            record  = {'id': job.id, 'date': job.date, 'truth_vector': job.truth_vector, 'link': link, 'status': job.status, 'progress': progress, 'type': 'TS'}
            records.append(record)
    return jsonify(records)

def get_ranked_inds(job_id, last_gen):    
    inds_db = Individuals.query.filter(Individuals.job == job_id, Individuals.cur_gen == last_gen).filter(Individuals.pop_type.in_([1])).all()
    inds_acceptable = [ind.object for ind in inds_db if ind.object.potential_fitnesses['acceptable'] == 1]
    mdg_vals = [ind.potential_fitnesses['mdg'] for ind in inds_acceptable]
    ind_idxs_sorted = arg_sort(mdg_vals)[::-1]
    inds_ranked = [inds_acceptable[idx] for idx in ind_idxs_sorted]
    return inds_ranked

#!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO: After updating CSV export, remove this
def package_segs(inds, sub_app_name, environment):
    cassette_segs = dict()
    cassette_segs["in_vivo_alen"] = ["partial tRNA val human", "linker", "core ribozyme", "restriction enzyme cut site"]
    cassette_segs["in_vivo_kharma"] = ["tRNA val human", "core ribozyme", "CTE"]
    cassette_segs["in_vivo_ribozyme_only"] = ["core ribozyme"]
    cassette_segs["in_vitro_ribozyme_only"] = ["core ribozyme"]
    cassette_segs["in_vitro_default_promoter"] = ["T7", "core ribozyme"]
    cassette_segs["in_vitro_custom_promoter"] = ["T7", "core ribozyme"]

    seg_colors = dict()
    seg_colors["partial tRNA val human"] = "red"
    seg_colors["linker"] = "black"
    seg_colors["core ribozyme"] = "black"
    seg_colors["restriction enzyme cut site"] = "blue"
    seg_colors["tRNA val human"] = "red"
    seg_colors["CTE"] = "green"
    seg_colors["T7"] = "red"

    if sub_app_name == "TC":
        rz_column_title = "Selective ribozyme sequence (coding strand) "
    elif sub_app_name == "TS":
        rz_column_title = "Ribogate sequence (coding strand) "

    packaged_title = [(rz_column_title, "black")]
    for name in cassette_segs[environment]:
        packaged_title.append((name, seg_colors[name]))

    packaged_seqs = []
    seg_seqs = dict()
    seg_seqs["partial tRNA val human"] = "TTCGAAACCGGGCACTACAAAAACCAAC"
    seg_seqs["linker"] = "TTT"
    seg_seqs["restriction enzyme cut site"] = "GGTAC"
    seg_seqs["tRNA val human"] = "GTTTCCGTAGTGTAGTGGTTATCACGTTCGCCTAACACGCGAAAGGTCCCCGGTTCGAAACCGGGCGGAA"
    seg_seqs["CTE"] = "AGACCACCTCCCCTGCGAGCTAAGCTGGACAGCCAATGACGGGTAAGAGAGTGACATTGTTCACTAACCTAAGACAGGAGGGCCGTCAGAGCTACTGCCTAATCCAAAGACGGGTAAAAGTGATAAAAATGTATCACTCCAACCTAAGACAGGCGCAGCTTCCGAGGGATTTG"
    for i, ind in enumerate(inds):
        packaged_segs = []
        rz_seq = ind.strands[0].replace('U','T')
        seg_seqs["core ribozyme"] = str(rz_seq)

        promoter_seq = ''
        if environment == "in_vitro_default_T7":
            promoter_seq = "GAATTTAATACGACTCACTATA"
            #Start of transcription should have at least 2 Gs
            if rz_seq[0] != "G": 
                promoter_seq += 'GG'
            elif rz_seq[1] != "G":
                promoter_seq += 'G'
        elif "in_vitro_custom_promoter" in environment:
            promoter_seq = environment.split('_')[-1]
        seg_seqs["T7"] = promoter_seq

        for name in cassette_segs[environment]:
            packaged_segs.append((name, seg_seqs[name], seg_colors[name]))

        packaged_seqs.append(packaged_segs)

    return packaged_seqs, packaged_title


def package_ribozyme(ribozyme_sequence, cassette_segments, segment_sequences_const, segment_colors, environment):
    '''
    Packages the ribozyme sequence inside of a cassette containing other sequences. 

    Parameters:
        ribozyme_sequence
        cassette_segments (dict of list of strings): For each environment type, stores the which segments appear in the cassette (ordered from 5' to 3')
        segment_colors (dict)
        segment_sequences_const (dict): The cassette segment sequences that are constant throughout the EA and are the same for all indiivduals
        environment (string): The environment that the user selected in the request page. 

    Returns:
        packaged_sequence (list of (segment name, segment sequence, segment color) triplets ) #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! Make sure this description is up to date

    '''

    '''
    Most of the cassette segment sequences are known beforehand and constant for all individuals
    However, the ribozyme sequence depends on the individual
    Also, if the cassette contains a T7 promoter, we need to ensure that the transcription start site should have at least 2 Gs
    '''

    segment_sequences = copy.deepcopy(segment_sequences_const)
    segment_sequences["core ribozyme"] = str(ribozyme_sequence)

    promoter_sequence = ''
    if environment == "in_vitro_default_T7":
        promoter_sequence = segment_sequences["promoter"]
        #Transcription start site should have at least 2 Gs
        if ribozyme_sequence[0] != "G": 
            promoter_sequence += 'GG'
        elif ribozyme_sequence[1] != "G":
            promoter_sequence += 'G'
    elif "in_vitro_custom_promoter" in environment:
        promoter_sequence = environment.split('_')[-1]
    segment_sequences["promoter"] = promoter_sequence

    packaged_sequence = []
    for name in cassette_segments[environment]:
        #packaged_sequence.append((name, segment_sequences[name], segment_colors[name]))
        packaged_sequence.append({'text': segment_sequences[name], 'color': segment_colors[name]})

    return packaged_sequence

def prepare_cassette_legend(sub_app_name, cassette_segments, segment_colors, environment):
    '''
    Packages the cassette names and colors in order to form a color legend that will be eventually displayed on the client
    '''
    segment_seperation_char = '-' # '&nbsp' #space 

    if sub_app_name == "TC":
        rz_column_title = "Selective ribozyme sequence (coding strand): "
    elif sub_app_name == "TS":
        rz_column_title = "Ribogate sequence (coding strand): "
    rz_column_title += '&nbsp'

    cassette_legend = [{'text': rz_column_title, 'color': "black"}]
    for i, name in enumerate(cassette_segments[environment]):
        if i == len(cassette_segments[environment]) - 1:
            segment_seperation_char = '' #We don't put a separation character after the last segment
        cassette_legend.append({'text': name + segment_seperation_char, 'color': segment_colors[name]})
    return cassette_legend

def color_seqs_html(packaged_seqs, packaged_title):
    rz_seqs_colored = []
    for packaged_segs in packaged_seqs:
        rz_seq_colored = ''    
        for (seg_name, seg_seq, color) in packaged_segs:
            rz_seq_colored += f'<span style="color: {color}">{seg_seq}</span>'
        rz_seqs_colored.append(rz_seq_colored)

    rz_column_title = packaged_title[0][0]
    color_legend = ''
    for i in range(1, len(packaged_title)):
        seg_name, color = packaged_title[i]
        if (i-1) > 0:
            color_legend += '<span style="color: black">&ndash;</span> '
        color_legend += f'<span style="color: {color}">{seg_name}</span> '
    rz_column_title += " (5'&nbsp;" + color_legend + "&nbsp;3')" #&nbsp; is needed for the space here

    return rz_seqs_colored, rz_column_title

@Server.route("/TS/job_details", endpoint="TS_job_details", methods=['GET', 'POST'])
@Server.route("/TC/job_details", endpoint="TC_job_details", methods=['GET', 'POST'])
@login_required
def job_details():
    endpoint = request.endpoint
    if endpoint == "Server.TC_job_details":
        truth_vector = None
        sub_app_name = "TC"
    elif endpoint == "Server.TS_job_details":
        sub_app_name = "TS"

    job_id = request.args.get('id', 0, type=int)
    job = Jobs.query.filter(Jobs.id == job_id).first() 
    last_gen = job.last_completed_gen
    progress = (last_gen + 1) / job.num_gens

    if 'application/json' in request.headers.get('Accept'):
        
        page_num = request.args.get('page_num', 0, type=int)

        if progress == 1:
            inds_ranked = get_ranked_inds(job_id, last_gen)
        else:
            inds_ranked = []
        num_inds = len(inds_ranked)
        links = ["/" + sub_app_name + "/structures" + "?ind_id=" + str(ind.id)  + "&gen=" + str(last_gen) + "&job=" + str(job_id) for ind in inds_ranked ]
    
        #Package the ribozymes into cassettes with associated color codes
        cassette_legend = prepare_cassette_legend(sub_app_name, app.config['CASSETTE_SEGMENTS'], app.config['CASSETTE_SEGMENT_COLORS'], job.environment)
        #cassette_legend = prepare_cassette_legend(sub_app_name, app.config['CASSETTE_SEGMENTS'], app.config['CASSETTE_SEGMENT_COLORS'], "in_vivo_alen") #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! DEBUGGING

        packaged_sequences = []
        for ind in inds_ranked:
            ribozyme_sequence = str(ind.strands[0].replace('U','T'))
            packaged_sequence = package_ribozyme(ribozyme_sequence, app.config['CASSETTE_SEGMENTS'], app.config['CASSETTE_SEGMENT_SEQUENCES'], app.config['CASSETTE_SEGMENT_COLORS'], job.environment)
            #packaged_sequence = package_ribozyme(ribozyme_sequence, app.config['CASSETTE_SEGMENTS'], app.config['CASSETTE_SEGMENT_SEQUENCES'], app.config['CASSETTE_SEGMENT_COLORS'], "in_vivo_alen") #!!!!!!!!!!!!!!!!!!!!!!!! DEBUGGING
            packaged_sequences.append(packaged_sequence)

        #Prepare records
        records = list()
        cut_position = app.config['TEMPLATE_PARAMS']['RZBS_EXTENSION_LEN'] + app.config['TEMPLATE_PARAMS']['S3_LEN'] + 1 #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! TO DO USE THE OBJECT TEMPLATE !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
        for i in range(num_inds):
            cut_region = inds_ranked[i].strands[1].replace('U','T')
            on_score, off_score, novelty_score, mismatch_score = [format(inds_ranked[i].potential_fitnesses[name], f'.{3}g') for name in ['ON', 'OFF', 'novelty', 'mismatch']] #3 sig figs
            marked_cut_region = cut_region[0:cut_position] + "|" + cut_region[cut_position:]

            record = {'rank': i+1, 'link': links[i], 'sequence': packaged_sequences[i], 'cutRegion': marked_cut_region, 'onScore': on_score, 'offScore': off_score, 'noveltyScore': novelty_score, 'mismatchScore': mismatch_score}
            records.append(record)

        per_page = 10
        num_pages = int(math.ceil(num_inds / per_page))
        if num_pages == 0:
            num_pages = 1 #Handle case with no results

        if page_num*per_page < num_inds:
            records_page = records[page_num*per_page:(page_num+1)*per_page]
        else:
            records_page = records[num_pages-1:]

        return jsonify((records_page, cassette_legend, num_pages)) #!!!!! TO DO: Factor out the cassette_legend from here

    if sub_app_name == "TC":
        return render_template('job_details_TC.html', id=job_id, truth_vector = job.truth_vector, num_inputs = job.num_inputs, input_seqs = job.input_seqs, temperature = job.folding_temp, date = job.date, wt_seq = job.wt_seq, mutant_seq = job.mutant_seq, page_num = 0, progress = progress)
    else:
        pass #TO DO

@Server.route("/csv",  methods=['GET', 'POST'])
def CSV():
    job_id = request.args.get('id', 0, type=int)
    job = Jobs.query.filter(Jobs.id == job_id).first() 
    last_gen = job.last_completed_gen

    inds_ranked = get_ranked_inds(job_id, last_gen)
    packaged_seqs, packaged_title = package_segs(inds_ranked, job.type, job.environment)

    output = BytesIO()
    workbook = xlsxwriter.Workbook(output)
    worksheet = workbook.add_worksheet()
    worksheet.write_string('A1', 'Rank')

    #Write title
    formatted_string = [ workbook.add_format({'font_color': packaged_title[0][1]}), packaged_title[0][0] + " (5' " ]
    for i, (seg_name, color) in enumerate(packaged_title[1:]):
        if i != 0:
            seg_name = "-" + seg_name
        seg_format = workbook.add_format({'font_color': color})
        formatted_string = formatted_string + [seg_format, seg_name]  
    formatted_string += [ workbook.add_format({'font_color': packaged_title[0][1]}), " 3')" ]
    worksheet.write_rich_string('B1', *formatted_string)

    #Write seqs
    for rank, packaged_segs  in enumerate(packaged_seqs):
        formatted_string = list()
        for (_, seq, color) in packaged_segs:
            seg_format = workbook.add_format({'font_color': color})
            formatted_string = formatted_string + [seg_format, seq]  
        worksheet.write_string('A' + str(rank+2), str(rank+1) )
        if len(packaged_segs) == 1:
            worksheet.write_string('B' + str(rank+2), seq, seg_format) #worksheet.write_rich_string gives error if len is 1
        else:
            worksheet.write_rich_string('B' + str(rank+2), *formatted_string)

    workbook.close()
    output.seek(0)

    #Use this approach to make sure the browser doesn't cache the file
    response = make_response(send_file(
        output,
        as_attachment=True,
        download_name="results.xlsx",
        mimetype='application/vnd.openxmlformats-officedocument.spreadsheetml.sheet'
    ))
    #Set headers to prevent caching
    response.headers['Cache-Control'] = 'no-cache, no-store, must-revalidate'
    response.headers['Pragma'] = 'no-cache'
    response.headers['Expires'] = '0'
    
    return response



############TS IN PROGRESS###########################################
@Server.route("/TS/request",  methods=['GET'])
@login_required
def Request_TS():
    return render_template('request.html')

@Server.route("/TS/process_submission",  methods=['GET', 'POST'])
@login_required
def ProcessSubmission():
    data = request.form
    num_inputs = int(data['num_inputs_list'])
    num_states = 2**num_inputs
    truth_vector = list()
    for i in range(num_states):
        truth_vector.append( int(data['truth_vector_row' + str(i)]) )
    function_num = bin_to_dec(truth_vector)
    input_seqs = list()
    for i in range(num_inputs):
        input_seqs.append( data['InputConstraint' + str(i)] )
    print(input_seqs)
    folding_temp = float(data['temperature'])

    #Submit job
    is_fast_folding_enabled = 1 #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!! for testing
    stem_lengths      = [7,8,7]
    selected_fitnesses          = ['ONVia', 'OFFVia', 'noveltyVia']
    bool_l_segments           = 1 #transparent rz, transparent er
    if 'excess' or 'excessVia' in selected_fitnesses: #If we want stem 1 and stem 3 to not be disrupted
        bool_constant_rz = 1
    else:
        bool_constant_rz = 0
    has_logic_linker         = not truth_vector[-1] #If the last entry of truth vector is 0, then we want it to kill the rz so we need the logic linker
    has_flexible_linker          = 1
    input_lengths             = [len(input_seq) for input_seq in input_seqs]
    bool_start_GG = 1
    template_params = [input_lengths, stem_lengths, has_logic_linker, has_flexible_linker, bool_start_GG, input_seqs]    
    viability_params = [0, 0.95, 1, 0.475, 49] #New params: new viability val = (old val + 1) #Old params: [-1.00, 0.90, 1, -0.05, 49]

    if app.config['QUICK_EA']:
        num_inds = 8
        num_gens = 4
    else:
        num_inds = 300
        num_gens = 200
    mutation_rate = 4
    mutation_probs = [1, 0]

    job = Jobs(user_id=current_user.id, date=datetime.today(), folding_temp=folding_temp, bool_fast_folding=is_fast_folding_enabled, template_params=template_params, num_inputs=num_inputs, truth_vector=truth_vector, input_seqs=input_seqs, function_num=function_num, bool_TT=bool_l_segments, bool_constant_rz=bool_constant_rz, viability_params=viability_params, num_inds=num_inds, num_gens=num_gens, selected_fitnesses=selected_fitnesses, parent_selection_method=0, parent_selection_params=[], survivor_selection_method=0, crossover_prob=0, mutation_rate=mutation_rate, mutation_probs=mutation_probs, status="Queued", type="TS")
    db.session.add(job)
    db.session.commit()

    return redirect(url_for("Server.TC_job_details", id=job.id, page_num=0))
###########################