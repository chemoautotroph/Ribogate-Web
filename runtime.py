"""Local deployment configuration shared by scripts and the application."""
import os
from pathlib import Path

from dotenv import load_dotenv

ROOT = Path(__file__).resolve().parent
load_dotenv(ROOT / '.env', override=False)
DATA_DIR = Path(os.environ.get('RIBOGATE_DATA_DIR', str(ROOT / 'instance'))).resolve()
DATA_DIR.mkdir(parents=True, exist_ok=True)


def secret_key():
    configured = os.environ.get('RIBOGATE_SECRET_KEY')
    if configured:
        return configured
    import secrets
    path = DATA_DIR / 'secret_key'
    try:
        with path.open('x', encoding='utf-8') as stream:
            stream.write(secrets.token_hex(32))
    except FileExistsError:
        pass
    return path.read_text(encoding='utf-8').strip()
