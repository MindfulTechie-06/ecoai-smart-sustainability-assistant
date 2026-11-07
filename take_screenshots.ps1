$ErrorActionPreference = "Stop"
$outDir = "c:\Users\LENOVO\Desktop\ECHO_AI\screenshots"
$artifactDir = "C:\Users\LENOVO\.gemini\antigravity\brain\dfe71142-be53-4960-83d0-b22acb375860\screenshots"

if (!(Test-Path $outDir)) { New-Item -ItemType Directory -Path $outDir -Force | Out-Null }
if (!(Test-Path $artifactDir)) { New-Item -ItemType Directory -Path $artifactDir -Force | Out-Null }

$port = 5188
$proc = Start-Process -FilePath "node" -ArgumentList "./node_modules/vite/bin/vite.js", "preview", "--port", "$port", "--strictPort", "--host", "127.0.0.1" -PassThru -NoNewWindow

Write-Host "Started vite preview (PID: $($proc.Id)), waiting for port $port..."

$ready = $false
for ($i = 0; $i -lt 30; $i++) {
    Start-Sleep -Milliseconds 600
    try {
        $tcp = New-Object System.Net.Sockets.TcpClient
        $tcp.Connect("127.0.0.1", $port)
        if ($tcp.Connected) {
            $tcp.Close()
            $ready = $true
            break
        }
    } catch {}
}

if (-not $ready) {
    Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
    throw "Server did not become ready in time"
}

Write-Host "Preview server is ready at http://127.0.0.1:$port"

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$views = @(
    # 1. Landing Page Showcase (Stitch Screen 1)
    @{ Name = "stitch_screen_1_landing_1440px.png";  W = 1440; H = 900;  Url = "http://127.0.0.1:$port/?tab=landing" },
    @{ Name = "stitch_screen_1_landing_earth.png";   W = 1440; H = 1400; Url = "http://127.0.0.1:$port/?tab=landing#centerpiece-impact" },

    # 2. Executive Dashboard (Stitch Screen 4)
    @{ Name = "stitch_screen_4_executive_1440px.png"; W = 1440; H = 1080; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "stitch_screen_4_executive_1920px.png"; W = 1920; H = 1080; Url = "http://127.0.0.1:$port/?tab=dashboard" },

    # 3. Carbon Intelligence (Stitch Screen 3)
    @{ Name = "stitch_screen_3_carbon_1440px.png";    W = 1440; H = 1080; Url = "http://127.0.0.1:$port/?tab=carbon" },

    # 4. Mobile Responsiveness
    @{ Name = "qa_mobile_375px_landing.png";         W = 375;  H = 812;  Url = "http://127.0.0.1:$port/?tab=landing" },
    @{ Name = "qa_mobile_375px_dashboard.png";       W = 375;  H = 812;  Url = "http://127.0.0.1:$port/?tab=dashboard" }
)

foreach ($v in $views) {
    $dest = Join-Path $outDir $v.Name
    Write-Host "Capturing $($v.Name) at $($v.W)x$($v.H)..."
    $chromeArgs = @(
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        "--virtual-time-budget=3000",
        "--window-size=$($v.W),$($v.H)",
        "--screenshot=$dest",
        $v.Url
    )
    $cproc = Start-Process -FilePath $chrome -ArgumentList $chromeArgs -Wait -PassThru
    Start-Sleep -Milliseconds 400
    if (Test-Path $dest) {
        Copy-Item -Path $dest -Destination (Join-Path $artifactDir $v.Name) -Force
        Write-Host "Saved $($v.Name) ($((Get-Item $dest).Length) bytes)."
    } else {
        Write-Warning "Could not capture $($v.Name)"
    }
}

Write-Host "Stopping server PID $($proc.Id)..."
Stop-Process -Id $proc.Id -Force -ErrorAction SilentlyContinue
Write-Host "Visual QA Capture complete!"
