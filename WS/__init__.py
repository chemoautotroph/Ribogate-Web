import os
from runtime import DATA_DIR, secret_key
from flask import Flask
from flask_sqlalchemy import SQLAlchemy
from flask_login import LoginManager
import threading

app = Flask(__name__, instance_path=str(DATA_DIR))
app.config['SECRET_KEY'] = secret_key()
app.config['SQLALCHEMY_DATABASE_URI'] = 'sqlite:///db.sqlite'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False

db = SQLAlchemy() # init SQLAlchemy so we can use it later in our models
db.init_app(app)

####Configure session
#https://stackoverflow.com/questions/32815451/are-global-variables-thread-safe-in-flask-how-do-i-share-data-between-requests
from flask import Flask, session
from flask_session import Session
SESSION_TYPE = 'filesystem'
SESSION_FILE_DIR = str(DATA_DIR / 'sessions')
app.config.from_object(__name__)
Session(app)

login_manager = LoginManager()
login_manager.login_view = 'auth.login'
login_manager.init_app(app)

from .models import User, GoogleIdentity

@login_manager.user_loader
def load_user(user_id):
    try:
        user_id = int(user_id)
    except (TypeError, ValueError):
        return None
    subject = session.get('_google_subject')
    identity = GoogleIdentity.query.filter_by(user_id=user_id, subject=subject).first() if subject else None
    if identity is None:
        # Old password and remember-me sessions must not bypass Google sign-in.
        session.pop('_user_id', None)
        session['_remember'] = 'clear'
        return None
    return db.session.get(User, user_id)

#blueprint for auth routes
from .auth import auth as auth_blueprint
app.register_blueprint(auth_blueprint)

from .google_auth import google_auth as google_auth_blueprint
app.register_blueprint(google_auth_blueprint)

#blueprint for non-auth parts
from .main import main as main_blueprint
app.register_blueprint(main_blueprint)

#Blueprint for the TC and TS routes
from .server import Server as Server_blueprint
app.register_blueprint(Server_blueprint)

#Scheduler. TO DO: clean up.
def start_scheduler():
    from .scheduler import scheduler

    def do_stuff():
        with app.app_context(): #Push an app context. This is required for the scheduler thread to insert the designs into the database. Note that the standard flask endpoint routes don't require this because they implicitly push an app context.
            scheduler()
            

    scheduler_thread = threading.Timer(0.5, do_stuff, ())
    scheduler_thread.daemon = True
    scheduler_thread.start()
