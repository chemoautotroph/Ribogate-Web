param([switch]$Quick)
$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
Push-Location $repoRoot
try {
    $runtimePython = Join-Path $repoRoot '.venv\Scripts\python.exe'
    if (!(Test-Path -LiteralPath $runtimePython)) { $runtimePython = Join-Path $repoRoot '.venv\python.exe' }
    if (!(Test-Path -LiteralPath $runtimePython)) { throw 'Run scripts/setup.ps1 first.' }
    $serverArgs = @('runserver.py')
    if ($Quick) { $serverArgs += '--quick-ea=true' }
    & $runtimePython @serverArgs
    if ($LASTEXITCODE -ne 0) { throw 'Server exited with an error.' }
} finally { Pop-Location }
