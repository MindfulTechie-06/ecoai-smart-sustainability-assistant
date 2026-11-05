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

Write-Host "Preview server is ready at http://localhost:$port"

$chrome = "C:\Program Files\Google\Chrome\Application\chrome.exe"

$views = @(
    @{ Name = "shell_1440px_dashboard.png"; W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "shell_1024px_dashboard.png"; W = 1024; H = 768; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "shell_768px_dashboard.png"; W = 768; H = 1024; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "shell_375px_dashboard.png"; W = 375; H = 812; Url = "http://127.0.0.1:$port/?tab=dashboard" },
    @{ Name = "shell_1440px_carbon.png"; W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=carbon" },
    @{ Name = "shell_1440px_landing.png"; W = 1440; H = 900; Url = "http://127.0.0.1:$port/?tab=landing" }
)

foreach ($v in $views) {
    $dest = Join-Path $outDir $v.Name
    Write-Host "Capturing $($v.Name) at $($v.W)x$($v.H)..."
    $chromeArgs = @(
        "--headless",
        "--disable-gpu",
        "--no-sandbox",
        "--hide-scrollbars",
        "--virtual-time-budget=2500",
        "--window-size=$($v.W),$($v.H)",
        "--screenshot=$dest",
        $v.Url
    )
    $cproc = Start-Process -FilePath $chrome -ArgumentList $chromeArgs -Wait -PassThru
    Start-Sleep -Milliseconds 500
    if (Test-Path $dest) {
        Copy-Item -Path $dest -Destination (Join-Path $artifactDir $v.Name) -Force
        Write-Host "Saved $($v.Name) successfully ($((Get-Item $dest).Length) bytes)."
    } else {
        Write-Warning "Could not capture $($v.Name)"
    }
}

Write-Host "Stopping server PID $($proc.Id)..."
Stop-Process -Id $proc.Id -Force
Write-Host "All screenshots captured and saved successfully!"
