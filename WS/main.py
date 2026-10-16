from flask import Blueprint, render_template
from . import db
from flask_login import login_required, current_user

main = Blueprint('main', __name__)

@main.route('/')
def index():
    return render_template('index.html')

@main.route('/TS')
@login_required
def index_TS():
    #return render_template('index_TS.html', name=current_user.name)
    return render_template('index_TS.html')

@main.route('/TC')
@login_required
def index_TC():
    #return render_template('index_TC.html', name=current_user.name)
    return render_template('index_TC.html')