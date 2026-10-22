import os
import argparse
from pathlib import Path
from runtime import ROOT, DATA_DIR
from WS import app, start_scheduler

import logging
from logging.handlers import RotatingFileHandler
from WS.email import send_email

#Needed to parse Boolean command line arguments
def str2bool(v):
    if isinstance(v, bool):
        return v
    if v.lower() in ('yes', 'true', 't', 'y', '1'):
        return True
    elif v.lower() in ('no', 'false', 'f', 'n', '0'):
        return False
    else:
        raise argparse.ArgumentTypeError('Boolean value expected.')

#TO DO. Clean this up once I'm confident it works consistently.
def setup_loggers():
    file_handler = RotatingFileHandler(DATA_DIR / 'server_logs.txt', maxBytes=5*1024*1024, backupCount=3)
    file_handler.setLevel(logging.INFO)
    file_handler.setFormatter(logging.Formatter('%(levelname)s: %(message)s'))

    #Not currently used
    #stream_handler = logging.StreamHandler()
    #stream_handler.setLevel(logging.INFO)
    #stream_handler.setFormatter(logging.Formatter('%(asctime)s %(levelname)s: %(message)s'))

    #Flask's internal logger
    app.logger.addHandler(file_handler)
    #app.logger.addHandler(stream_handler) #The output is already streamed to screen automatically.
    app.logger.setLevel(logging.INFO)
    #app.logger.propagate = False #Prevents log duplication to the screen. !!!!! Not sure if it is needed. I've been having a bit of trouble reproducing constant output when debugging.

    #Werkzeug logger. Need to print the HTTP request log to file
    werkzeug_logger = logging.getLogger('werkzeug')
    werkzeug_logger.addHandler(file_handler)
    #werkzeug_logger.addHandler(stream_handler)  #The output is already streamed to screen automatically.
    #werkzeug_logger.setLevel(logging.INFO)

    class EmailErrorHandler(logging.Handler):
        def emit(self, record):
            if app.config['EMAIL_ERROR_LOGS']:
                log_entry = self.format(record)
                try:
                    send_email(log_entry, 'Rigobate Error Notification', app.config['ADMIN_EMAIL'])
                    app.config['EMAIL_ERROR_LOGS'] = False #Only send the first encoutered error to avoid spamming.
                except Exception:
                    self.handleError(record)

    #Custom email handler
    if app.config['EMAIL_ERROR_LOGS']:
        email_handler = EmailErrorHandler()
        email_handler.setLevel(logging.ERROR)  # Trigger emails on errors
        formatter = logging.Formatter('%(asctime)s - %(levelname)s - %(message)s')
        email_handler.setFormatter(formatter)
        #Add it to the Flask app's logger
        app.logger.addHandler(email_handler)

def configure_app(argv=None):
    parser = argparse.ArgumentParser(description="Run the Flask server.")
    parser.add_argument('--server-name', type=str, default=os.environ.get('RIBOGATE_SERVER_NAME', '127.0.0.1:' + os.environ.get('RIBOGATE_PORT', '8000')))
    parser.add_argument('--send-emails', type=str2bool, default=str2bool(os.environ.get('RIBOGATE_SEND_EMAILS', 'false')))
    parser.add_argument('--num-processes', type=int, default=int(os.environ.get('RIBOGATE_NUM_PROCESSES', min(os.cpu_count() or 1, 12))))
    parser.add_argument('--quick-ea', type=str2bool, required=False, default=str2bool(os.environ.get('RIBOGATE_QUICK_EA', 'false')))
    parser.add_argument('--store-jobs-days', type=int, required=False, default=int(os.environ.get('RIBOGATE_STORE_JOBS_DAYS', '-1')))
    parser.add_argument('--max-num-user-jobs', type=int, required=False, default=1) 
    parser.add_argument('--min-temp', type=float, required=False, default=20) 
    parser.add_argument('--max-temp', type=float, required=False, default=80) 
    args = parser.parse_args(argv)
    if args.num_processes < 1:
        parser.error('--num-processes must be at least 1')
    app.config['SERVER_NAME'] = args.server_name 
    app.config['QUICK_EA'] = args.quick_ea #Runs the EA with a very small nubmer of individuals and generations. It won't generate any useful designs but it makes debugging much quicker.
    app.config['STORE_JOBS_DAYS'] = args.store_jobs_days #How many days the job will remain in database before being deleted. -1 means jobs are never deleted.
    app.config['MAX_NUM_USER_JOBS'] = args.max_num_user_jobs  #How many jobs a single user can have simultaneously queued/running
    app.config['MIN_TEMP'] = args.min_temp
    app.config['MAX_TEMP'] = args.max_temp

    template_params = dict()
    template_params['SPACING'] = 10 #!!!! REMOVE THIS
    template_params['SPACING_LENGTH'] = 2 #!!!! REMOVE THIS
    template_params['MISMATCH_SPACING'] = 9
    template_params['NUM_CONTIGUOUS_MISMATCHES'] = 2

    template_params['S1_LEN'] = 7
    template_params['S2_LEN'] = 7 #For TS GPEM I used 8
    template_params['S3_LEN'] = 7
    template_params['LINKER_LEN'] = 7
    template_params['RZBS_LEN'] = template_params['S1_LEN'] + 1 + template_params['S3_LEN'] #+1 is due to the single nucleotide in the third part of the core
    template_params['RZBS_EXTENSION_LEN'] = 10 
    #template_params['RZBS_EXTENSION_LEN_POST'] = 10 #!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!
    template_params['RZBS_EXTENSION_LEN_POST'] = 50
    template_params['MAX_NUM_STRIDES'] = 10
    app.config['TEMPLATE_PARAMS'] = template_params

    app.config['SEND_EMAILS'] = args.send_emails #Set this to false so that the server can be run locally without any depencies on email providers like SendGrid. This option automatically confirms new users and doens't send completed job notifications.
    app.config['EMAIL_DEBUG'] = False #When active overrides the recipient in send_email function to ADMIN_EMAIL to avoid spamming people during debugging.
    app.config['ADMIN_EMAIL'] = os.environ.get('RIBOGATE_ADMIN_EMAIL', '')
    #app.config['EMAIL_ERROR_LOGS'] = True #If True emails error logs to admin
    app.config['EMAIL_ERROR_LOGS'] = False
    app.config['PREFERRED_URL_SCHEME'] = os.environ.get('RIBOGATE_URL_SCHEME', 'http')
    app.config['VIENNA_PATH'] = os.environ.get('RIBOGATE_VIENNA_PATH', os.path.join(os.path.dirname(os.path.abspath(__file__)), 'vienna_rna_binaries'))
    app.config['PERFORM_BLAST'] = False
    app.config['BLAST_DB_PATH'] = os.environ.get('RIBOGATE_BLAST_DB_PATH', '')

    app.config['PERFORM_MDS'] = False


    s1_color = '#e6194b'
    s2_color = '#4363d8'
    s3_color = '#911eb4'
    core_color = '#3cb44b'
    linker_color = '#ffe119'
    sensor_color = '#f58231'
    rzbs_extension_color = '#FFFFFF'
    rzbs_extension_color = '#000000'
    pseudoknot_color = '#FFFFFF' #for extended harmmerhead
    app.config['SEG_COLORS'] = {'S1A': s1_color, 'S1B': s1_color, 'S2A': s2_color, 'S2B': s2_color, 'S3A': s3_color, 'S3B': s3_color, 'C1': core_color,  'C2': core_color, 'C3': core_color, 
                                'L0': linker_color, 'L1': linker_color, 'SENSOR': sensor_color, 'UPSTREAM_RZBS': rzbs_extension_color, 'DOWNSTREAM_RZBS': rzbs_extension_color, 'S0A': s1_color, 'S0B': s1_color, 'S1KNOT': pseudoknot_color, 'S2KNOT': pseudoknot_color}

    app.config['VERBOSE_SEG_NAMES'] = {'S1A': '1st half of stem 1', 'S1B': '2nd half of stem 1', 'S2A': '1st half of stem 2', 'S2B': '2nd half of stem 2', 'S3A': '1st half of stem 3', 'S3B': '2nd half of stem 3', 'C1': '1st part of core', 'C2': '2nd part of core', 'C3': '3rd part of core', 'L0': '1st linker', 'L1': '2nd linker', 'SENSOR': 'sensor', 'UPSTREAM_RZBS': 'region upstream of RzBS', 'DOWNSTREAM_RZBS': 'region downstream of RzBS', 'S0A': "1st half of stem 1", 'S0B': "2nd half of stem 1", 'S1KNOT': "1st part of pseudoknot", 'S2KNOT': "2nd part of pseudoknot"}

    app.config['FAST_FOLDING'] = 1
    app.config['NUM_PROCESSES'] = args.num_processes

    app.config['MAX_MUTANT_WT_DIFFERENCE'] = 20

    app.config['SELECTED_FITNESSES_TC'] = ['novelty', 'ON', 'OFF', 'mismatch']
    app.config['VIABILITY_TC'] = True
    app.config['VIABILITY_PARAMS_TC'] = [0, 0.95, 1, 0.60, 49] #New params: new viability val = (old val + 1) #Old params: [-1.00, 0.90, 1,  0.20, 49]


    cassette_segsments = dict()
    cassette_segsments["in_vivo_alen"] = ["partial tRNA val human", "linker", "core ribozyme", "restriction enzyme cut site"]
    cassette_segsments["in_vivo_kharma"] = ["tRNA val human", "core ribozyme", "CTE"]
    cassette_segsments["in_vivo_ribozyme_only"] = ["core ribozyme"]
    cassette_segsments["in_vitro_ribozyme_only"] = ["core ribozyme"]
    cassette_segsments["in_vitro_default_promoter"] = ["T7", "core ribozyme"]
    cassette_segsments["in_vitro_custom_promoter"] = ["T7", "core ribozyme"]
    app.config['CASSETTE_SEGMENTS'] = cassette_segsments

    cassette_segment_colors = dict()
    cassette_segment_colors["partial tRNA val human"] = "red"
    cassette_segment_colors["linker"] = "black"
    cassette_segment_colors["core ribozyme"] = "black"
    cassette_segment_colors["restriction enzyme cut site"] = "blue"
    cassette_segment_colors["tRNA val human"] = "red"
    cassette_segment_colors["CTE"] = "green"
    cassette_segment_colors["promoter"] = "red"
    app.config['CASSETTE_SEGMENT_COLORS'] = cassette_segment_colors

    cassette_segment_sequences = dict()
    cassette_segment_sequences["partial tRNA val human"] = "TTCGAAACCGGGCACTACAAAAACCAAC"
    cassette_segment_sequences["linker"] = "TTT"
    cassette_segment_sequences["restriction enzyme cut site"] = "GGTAC"
    cassette_segment_sequences["tRNA val human"] = "GTTTCCGTAGTGTAGTGGTTATCACGTTCGCCTAACACGCGAAAGGTCCCCGGTTCGAAACCGGGCGGAA"
    cassette_segment_sequences["CTE"] = "AGACCACCTCCCCTGCGAGCTAAGCTGGACAGCCAATGACGGGTAAGAGAGTGACATTGTTCACTAACCTAAGACAGGAGGGCCGTCAGAGCTACTGCCTAATCCAAAGACGGGTAAAAGTGATAAAAATGTATCACTCCAACCTAAGACAGGCGCAGCTTCCGAGGGATTTG"
    cassette_segment_sequences['promoter'] = "GAATTTAATACGACTCACTATA" #An appropriate number of Gs will be dynamically added once the ribozyme sequence is known
    app.config['CASSETTE_SEGMENT_SEQUENCES'] = cassette_segment_sequences

    from WS.hosting import configure_hosting
    configure_hosting(app)
    return app


def main():
    import signal
    def terminate(signum, frame):
        raise SystemExit(0)
    signal.signal(signal.SIGTERM, terminate)
    configure_app()
    from scripts.install_vienna import verify_binaries
    verify_binaries(Path(app.config['VIENNA_PATH']))
    from WS.email import validate_email_config
    validate_email_config()
    from WS import db
    with app.app_context():
        db.create_all()
    setup_loggers()
    start_scheduler()
    if os.environ.get('RIBOGATE_PRODUCTION', 'false').lower() == 'true':
        from waitress import serve
        serve(app, host='127.0.0.1', port=int(os.environ.get('RIBOGATE_PORT', '8000')),
              threads=4, connection_limit=64, channel_timeout=30, max_request_body_size=128*1024,
              url_scheme=app.config['PREFERRED_URL_SCHEME'], clear_untrusted_proxy_headers=True)
    else:
        app.run(host=os.environ.get('RIBOGATE_HOST', '127.0.0.1'), port=int(os.environ.get('RIBOGATE_PORT', '8000')))

    #For concordia
    #app.config["CUSTOM_URL_NAME"] = args.server_name
    #app.config['SERVER_NAME'] = 'localhost:7000'
    #app.run(host='0.0.0.0', port=7000)


if __name__ == '__main__':
    main()
