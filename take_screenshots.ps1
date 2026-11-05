$ErrorActionPreference = "Stop"
$outDir = "c:\Users\LENOVO\Desktop\ECHO_AI\screenshots"
$artifactDir = "C:\Users\LENOVO\.gemini\antigravity\brain\c4e435db-3c23-4565-9ec6-ca43fd955c41\screenshots"

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
    # 1. Responsive Viewports for Overview
    @{ Name = "qa_1920px_overview.png"; W = 1920; H = 1080; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_1440px_overview.png"; W = 1440; H = 900;  Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_1280px_overview.png"; W = 1280; H = 800;  Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_1024px_overview.png"; W = 1024; H = 768;  Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_768px_overview.png";  W = 768;  H = 1024; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_375px_overview.png";  W = 375;  H = 812;  Url = "http://127.0.0.1:$port/?tab=dashboard" },

    # 2. All 8 Modules QA at 1440px
    @{ Name = "qa_module_1_overview.png";     W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "qa_module_2_carbon.png";       W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=carbon" },
    @{ Name = "qa_module_3_ingestion.png";    W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=ingestion" },
    @{ Name = "qa_module_4_insights.png";     W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=insights" },
    @{ Name = "qa_module_5_digitaltwin.png";  W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=digital-twin" },
    @{ Name = "qa_module_6_actions.png";      W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=actions" },
    @{ Name = "qa_module_7_reports.png";      W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=reports" },
    @{ Name = "qa_module_8_sites.png";        W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=sites" }
)

foreach ($v in $views) {
    $dest = Join-Path $outDir $v.Name
    Write-Host "Capturing $($v.Name) at $($v.W)x$($v.H)..."
    $chromeArgs = @(
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        "--virtual-time-budget=2000",
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
Write-Host "QA Visual Screenshots process complete!"
