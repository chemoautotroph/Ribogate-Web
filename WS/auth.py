"""Google-only sign-in entry and application logout."""
from flask import Blueprint, redirect, render_template, session, url_for
from flask_login import current_user, login_required, logout_user

auth = Blueprint('auth', __name__)


@auth.get('/login')
def login():
    if current_user.is_authenticated:
        return redirect(url_for('main.index'))
    return render_template('login.html', title='Sign in to TriCleaver')


@auth.get('/signup')
def signup():
    # Preserve old bookmarks; Google creates new accounts on first sign-in.
    return redirect(url_for('auth.login'))


@auth.post('/logout')
@login_required
def logout():
    logout_user()
    session.clear()
    session['_remember'] = 'clear'
    return redirect(url_for('main.index'))
