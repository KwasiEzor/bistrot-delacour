# ─────────────────────────────────────────────────────────
# Bistrot De La Cour - Development Server Launcher (Windows)
# Run with: .\dev.ps1
# ─────────────────────────────────────────────────────────

$ProjectRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$StrapiDir = Join-Path $ProjectRoot "strapi"

Write-Host "╔══════════════════════════════════════════════════╗" -ForegroundColor Blue
Write-Host "║" -ForegroundColor Blue -NoNewline
Write-Host "  Bistrot De La Cour - Development Servers   " -ForegroundColor Yellow -NoNewline
Write-Host "║" -ForegroundColor Blue
Write-Host "╚══════════════════════════════════════════════════╝" -ForegroundColor Blue
Write-Host ""

# Check Node
try {
    $NodeVersion = node -v
    Write-Host "[OK] Node.js $NodeVersion detected" -ForegroundColor Green
} catch {
    Write-Host "[ERROR] Node.js is not installed. Please install Node.js 18+" -ForegroundColor Red
    exit 1
}

# Install deps if needed
if (-Not (Test-Path "$ProjectRoot\node_modules")) {
    Write-Host "[WARN] Installing frontend dependencies..." -ForegroundColor Yellow
    Push-Location $ProjectRoot
    npm install
    Pop-Location
}

if (-Not (Test-Path "$StrapiDir\node_modules")) {
    Write-Host "[WARN] Installing Strapi dependencies..." -ForegroundColor Yellow
    Push-Location $StrapiDir
    npm install
    Pop-Location
}

# Build Strapi if needed
if (-Not (Test-Path "$StrapiDir\build")) {
    Write-Host "[WARN] Building Strapi..." -ForegroundColor Yellow
    Push-Location $StrapiDir
    npm run build
    Pop-Location
}

Write-Host ""
Write-Host "Starting development servers..." -ForegroundColor Green
Write-Host ""
Write-Host "  Strapi CMS  -> " -NoNewline; Write-Host "http://localhost:1337/admin" -ForegroundColor Cyan
Write-Host "  Frontend    -> " -NoNewline; Write-Host "http://localhost:5173" -ForegroundColor Cyan
Write-Host ""
Write-Host "Press Ctrl+C to stop all servers" -ForegroundColor Blue
Write-Host ""

# Start Strapi
$strapiJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    npm run develop
} -ArgumentList $StrapiDir

# Start Frontend
$frontendJob = Start-Job -ScriptBlock {
    param($dir)
    Set-Location $dir
    npm run dev
} -ArgumentList $ProjectRoot

# Wait and stream output
while ($true) {
    Start-Sleep -Seconds 1
    Receive-Job $strapiJob 2>$null
    Receive-Job $frontendJob 2>$null
}
