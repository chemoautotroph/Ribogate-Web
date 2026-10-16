import traceback
from WS import db, app
from WS.models import Jobs, Individuals, User
from sqlalchemy import and_, or_
import time
from flask import url_for
from .email import send_email

from .TS.truth_seq_er import TruthSeqEr
from .TC.tri_cleaver import TriCleaver

def print_jobs():
    jobs = Jobs.query.all()
    print("<<< JOBS >>>>")
    for job in jobs:
        print(job.id, job.status, job.user_id)
        printed_user = User.query.filter(User.id == job.user_id).all()[0]
        print(printed_user.id, printed_user.email)
    print("<<<<<<<<>>>>>>")

def send_job_completion_email(job):
    #job_url = app.config["CUSTOM_URL_NAME"] + url_for("Server.TC_job_details", id=job.id, _external=False) #Use this for Concordia server
    job_url = url_for("Server.TC_job_details", id=job.id)
    job_user = User.query.filter(User.id == job.user_id).first()
    recipient_email = str(job_user.email)
    subject = 'Your Ribogate TriCleaver job is complete!'
    html_content = '''
    <html>
    <body>
        <p>Dear User,</p>
        <p>Your Ribogate TriCleaver job is complete! Please click the link below to view the generated selective ribozymes.</p>
        <a href="{job_url}">View completed job</a>
        <p>Best regards,</p>
        <p>The Ribogate Team</p>
        <p>You are receiving this email because you recently signed up for a ribogate account.
        Ribogate is a web service that allows you to design switchable ribozymes. 
        If you do not own a ribogate account, please disregard this message.</p>
    </body>
    </html>
    '''
    html_content = html_content.format(job_url=job_url)
    send_email(html_content, subject, recipient_email)

#Clear cancelled and expired jobs
def clear_jobs():
    cancelled_jobs = Jobs.query.filter(Jobs.status == "Cancelled").all()
    for job in cancelled_jobs:
        Individuals.query.filter_by(job=job.id).delete()
        db.session.delete(job)
    db.session.commit()

    if app.config['STORE_JOBS_DAYS'] != -1: #We allow deletion of old jobs
        expiry_date = datetime.utcnow() - timedelta(days=app.config['STORE_JOBS_DAYS'])
        expired_jobs = Jobs.query.filter(Jobs.date < expiry_date).all()
        for job in expired_jobs:
            Individuals.query.filter_by(job=job.id).delete()
            db.session.delete(job)
        db.session.commit()

def scheduler():
    bool_store  = 1
    initial_pop = None
    ea_job = None
    while(1):
        try:
            #print_jobs()
            clear_jobs()

            jobs = Jobs.query.filter(and_(Jobs.status != "Completed", Jobs.status != "Cancelled")).all()
            if len(jobs)  > 0:
                #Handle the top item in the queue 
                job = jobs[0]
                print("job status", job.status)
                #Start a queue job or resume a running job that somehow crashed
                if job.status == "Queued":
                    job.status = "Running"
                    db.session.commit()
           
                elif job.status == "Running":
                    print("Job forced closed. Resuming")
                    if job.last_completed_gen == -1: #This can happen if the job is closed before any individuals have been stored
                        initial_pop = None
                    else:
                        inds_db = Individuals.query.filter(Individuals.job == job.id, Individuals.cur_gen == job.last_completed_gen).filter(Individuals.pop_type.in_([1])).all()
                        initial_pop = [ind.object for ind in inds_db]
                    
                #Run the ea
                ea_params = (job.num_inds, job.num_gens, job.parent_selection_method, job.parent_selection_params, job.survivor_selection_method, job.crossover_prob, int(job.mutation_rate), job.mutation_probs, job.selected_fitnesses, bool_store, initial_pop, job.last_completed_gen, job.id)

                if job.type == "TS":
                    ea_job = TruthSeqEr(job.template_params, job.num_inputs, job.truth_vector, job.viability_params, job.bool_fast_folding, job.folding_temp, job.bool_TT,  app.config['QUICK_EA'] )
                elif job.type == "TC":
                    ea_job = TriCleaver(job.viability_params, job.bool_fast_folding, job.folding_temp, job.downstream_seq, job.num_repeats_wt, job.num_repeats_mutant, job.repeat_unit, job.template_params, job.allowed_rzbs_start_idxs, app.config['QUICK_EA'] )


                ea_job.run(*ea_params)

                #print(ea_job.status)
                #If we've reached this point, the ea job has completed or has been cancelled
                if ea_job.status == "Cancelled":
                    pass #TO DO 
                elif ea_job.status == "Completed":
                    ea_job      = None
                    initial_pop = None
                    job.status = "Completed"
                    db.session.commit()

                    if app.config['SEND_EMAILS']: 
                        send_job_completion_email(job)
        except:
            error_trace = traceback.format_exc()
            app.logger.error(f"SCHEDULER ERROR: {error_trace}")

        time.sleep(5)
