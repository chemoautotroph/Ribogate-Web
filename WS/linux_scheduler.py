"""Serial Linux dispatcher with cancellable process groups and durable deadlines."""
import atexit
import json
import os
import signal
import subprocess
import sys
import time
from runtime import ROOT, DATA_DIR
from WS import app, db
from WS.models import Jobs, Individuals

active_process = None


def stop_worker(process):
    # A new session was created specifically for this worker and its descendants.
    try:
        os.killpg(process.pid, signal.SIGTERM)
    except ProcessLookupError:
        pass
    try:
        process.wait(timeout=5)
    except subprocess.TimeoutExpired:
        pass
    try:
        os.killpg(process.pid, signal.SIGKILL)
    except ProcessLookupError:
        pass
    process.wait(timeout=10)


@atexit.register
def cleanup():
    if active_process is not None:
        stop_worker(active_process)


def run_job(job_id):
    from .TC.tri_cleaver import TriCleaver
    from .TS.truth_seq_er import TruthSeqEr
    from .scheduler import send_job_completion_email
    job = db.session.get(Jobs, job_id)
    if job is None or job.status not in ('Queued','Running'):
        return
    initial_pop = None
    if job.last_completed_gen >= 0:
        rows = Individuals.query.filter_by(job=job.id,cur_gen=job.last_completed_gen,pop_type=1).all()
        initial_pop = [row.object for row in rows]
    job.status = 'Running'
    db.session.commit()
    if job.type == 'TC':
        algorithm = TriCleaver(job.viability_params,job.bool_fast_folding,job.folding_temp,
            job.downstream_seq,job.num_repeats_wt,job.num_repeats_mutant,job.repeat_unit,
            job.template_params,job.allowed_rzbs_start_idxs,app.config['QUICK_EA'])
    elif job.type == 'TS' and app.config['ENABLE_TRUTHSEQER']:
        algorithm = TruthSeqEr(job.template_params,job.num_inputs,job.truth_vector,
            job.viability_params,job.bool_fast_folding,job.folding_temp,job.bool_TT,app.config['QUICK_EA'])
    else:
        raise ValueError('Unsupported job type')
    algorithm.run(job.num_inds,job.num_gens,job.parent_selection_method,job.parent_selection_params,
        job.survivor_selection_method,job.crossover_prob,int(job.mutation_rate),job.mutation_probs,
        job.selected_fitnesses,1,initial_pop,job.last_completed_gen,job.id)
    db.session.expire_all()
    if job.status == 'Cancelled':
        return
    if algorithm.status != 'Completed':
        raise RuntimeError('Design worker did not complete')
    job.status = 'Completed'
    db.session.commit()
    if app.config['SEND_EMAILS']:
        try:
            send_job_completion_email(job)
        except Exception:
            app.logger.exception('Job completed, but notification delivery failed')


def scheduler():
    global active_process
    from .scheduler import clear_jobs
    state_dir = DATA_DIR / 'workers'
    state_dir.mkdir(exist_ok=True)
    while True:
        job_id = None
        try:
            clear_jobs()
            for state in state_dir.glob('*.json'):
                if db.session.get(Jobs,int(state.stem)) is None:
                    state.with_suffix('.log').unlink(missing_ok=True)
                    state.unlink()
            job = Jobs.query.filter(Jobs.status.in_(['Queued','Running'])).order_by(Jobs.id).first()
            if job is not None:
                job_id = job.id
                state = state_dir / (str(job_id)+'.json')
                if not state.exists():
                    state.write_text(json.dumps({'started':time.time()}))
                deadline = float(json.loads(state.read_text())['started']) + app.config['MAX_JOB_SECONDS']
                if time.time() >= deadline:
                    job.status = 'Timed out'
                    db.session.commit()
                    continue
                # Workers have no email provider secrets unless delivery is enabled.
                env = os.environ.copy()
                env.update(RIBOGATE_QUICK_EA=str(app.config['QUICK_EA']).lower(),
                           RIBOGATE_NUM_PROCESSES=str(app.config['NUM_PROCESSES']))
                with (state_dir / (str(job_id)+'.log')).open('ab') as log:
                    active_process = subprocess.Popen([sys.executable,str(ROOT/'scripts/run_job.py'),str(job_id)],
                        cwd=ROOT,env=env,stdout=log,stderr=subprocess.STDOUT,start_new_session=True)
                    while active_process.poll() is None:
                        time.sleep(1)
                        db.session.remove()
                        job = db.session.get(Jobs,job_id)
                        if job is None or job.status == 'Cancelled' or time.time() >= deadline:
                            stop_worker(active_process)
                            if job is not None and job.status != 'Cancelled':
                                job.status='Timed out'
                                db.session.commit()
                            break
                    code = active_process.wait()
                    stop_worker(active_process)
                    active_process = None
                db.session.remove()
                job = db.session.get(Jobs,job_id)
                if job is not None and job.status in ('Queued','Running'):
                    job.status='Failed'
                    db.session.commit()
                app.logger.info('Worker for job %s exited with code %s',job_id,code)
        except Exception:
            app.logger.exception('Dispatcher failed for job %s',job_id)
            db.session.rollback()
            if active_process is not None:
                stop_worker(active_process)
                active_process = None
            if job_id is not None:
                job=db.session.get(Jobs,job_id)
                if job is not None and job.status in ('Queued','Running'):
                    job.status='Failed'
                    db.session.commit()
        finally:
            db.session.remove()
        time.sleep(2)
