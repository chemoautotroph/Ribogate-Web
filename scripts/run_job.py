"""Private worker entrypoint; never exposes a network listener."""
import sys
from pathlib import Path
sys.path.insert(0,str(Path(__file__).resolve().parents[1]))


if __name__ == '__main__':
    import resource
    resource.setrlimit(resource.RLIMIT_FSIZE,(512*1024*1024,512*1024*1024))
    from runserver import configure_app
    app=configure_app([])
    from WS.linux_scheduler import run_job
    with app.app_context():
        run_job(int(sys.argv[1]))
