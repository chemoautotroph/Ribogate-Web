param(
    [string]$PythonExe = '',
    [switch]$SkipSmoke
)
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
    if ($env:OS -ne 'Windows_NT') { throw 'Windows x64 is the supported reproduction target.' }
    if (!(Test-Path -LiteralPath '.venv')) {
        if (!$PythonExe) { $PythonExe = & (Join-Path $PSScriptRoot 'bootstrap_python.ps1') }
        & $PythonExe -m venv .venv
        if ($LASTEXITCODE -ne 0) { throw 'Could not create Python environment.' }
    }
    $runtimePython = Join-Path $repoRoot '.venv\Scripts\python.exe'
    if (!(Test-Path -LiteralPath $runtimePython)) { $runtimePython = Join-Path $repoRoot '.venv\python.exe' }
    & $runtimePython -c "import sys, struct; assert sys.version_info[:3] == (3,9,19) and struct.calcsize('P') == 8, 'Use Python 3.9.19 x64 to match the tested environment'"
    if ($LASTEXITCODE -ne 0) { throw 'Python version check failed.' }
    & $runtimePython -m pip install --disable-pip-version-check --require-hashes -r requirements-bootstrap.lock
    if ($LASTEXITCODE -ne 0) { throw 'Build tool installation failed.' }
    & $runtimePython -m pip install --disable-pip-version-check --no-build-isolation --require-hashes -r requirements.lock
    if ($LASTEXITCODE -ne 0) { throw 'Dependency installation failed.' }
    & $runtimePython -m pip check
    if ($LASTEXITCODE -ne 0) { throw 'Dependency consistency check failed.' }
    & $runtimePython scripts/install_vienna.py
    if ($LASTEXITCODE -ne 0) { throw 'ViennaRNA installation failed.' }
    if (!(Test-Path -LiteralPath '.env')) {
        & $runtimePython -c "from pathlib import Path; import secrets; p=Path('.env'); p.write_text(Path('.env.example').read_text().replace('replace-with-a-long-random-secret',secrets.token_hex(32)),encoding='utf-8')"
        if ($LASTEXITCODE -ne 0) { throw 'Configuration initialization failed.' }
    }
    & $runtimePython create_db.py
    if ($LASTEXITCODE -ne 0) { throw 'Database initialization failed.' }
    if (!$SkipSmoke) {
        & $runtimePython scripts/verify_email_flows.py
        if ($LASTEXITCODE -ne 0) { throw 'Email flow verification failed.' }
        & $runtimePython scripts/smoke_test.py
        if ($LASTEXITCODE -ne 0) { throw 'End-to-end verification failed. See the smoke-test report.' }
    }
    Write-Host 'Setup verified. Start with: powershell -ExecutionPolicy Bypass -File scripts/start.ps1'
} finally { Pop-Location }
