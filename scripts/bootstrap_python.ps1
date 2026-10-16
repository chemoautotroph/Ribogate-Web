$ErrorActionPreference = 'Stop'
$repoRoot = Split-Path -Parent $PSScriptRoot
$manifest = Get-Content -Raw -LiteralPath (Join-Path $repoRoot 'python-manifest.json') | ConvertFrom-Json
$downloadRoot = Join-Path $repoRoot '.python'
$archivePath = Join-Path $downloadRoot 'python.tar.gz'
$pythonPath = Join-Path $downloadRoot 'python\python.exe'
if (!(Get-Command curl.exe -ErrorAction SilentlyContinue) -or !(Get-Command tar.exe -ErrorAction SilentlyContinue)) {
    throw 'Windows curl.exe and tar.exe are required (included with current Windows 10/11). Alternatively pass -PythonExe to setup.ps1.'
}
New-Item -ItemType Directory -Force -Path $downloadRoot | Out-Null
$needsDownload = !(Test-Path -LiteralPath $archivePath)
if (!$needsDownload) {
    $needsDownload = ((Get-FileHash -LiteralPath $archivePath -Algorithm SHA256).Hash.ToLowerInvariant() -ne $manifest.sha256)
}
if ($needsDownload) {
    Write-Host 'Downloading pinned CPython 3.9.19 x64 (no system installation or PATH changes).'
    & curl.exe --fail --location --retry 2 --connect-timeout 20 --max-time 300 --output ($archivePath + '.download') $manifest.url
    if ($LASTEXITCODE -ne 0) { throw 'Python download failed.' }
    if ((Get-FileHash -LiteralPath ($archivePath + '.download') -Algorithm SHA256).Hash.ToLowerInvariant() -ne $manifest.sha256) {
        throw 'Python archive checksum mismatch.'
    }
    Move-Item -LiteralPath ($archivePath + '.download') -Destination $archivePath -Force
}
if ((Get-Item -LiteralPath $archivePath).Length -ne $manifest.size) { throw 'Python archive size mismatch.' }
if (!(Test-Path -LiteralPath $pythonPath)) {
    & tar.exe -xzf $archivePath -C $downloadRoot
    if ($LASTEXITCODE -ne 0) { throw 'Python archive extraction failed.' }
}
& $pythonPath -c "import sys, struct; assert sys.version_info[:3] == (3,9,19) and struct.calcsize('P') == 8"
if ($LASTEXITCODE -ne 0) { throw 'Downloaded Python did not pass its version/architecture check.' }
Write-Output $pythonPath
