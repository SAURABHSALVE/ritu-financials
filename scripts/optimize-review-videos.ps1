# Compress review videos for the website (requires ffmpeg on PATH)
# Run from repo root: .\scripts\optimize-review-videos.ps1

$ErrorActionPreference = "Stop"
$root = Split-Path $PSScriptRoot -Parent

$outDir = Join-Path $root "frontend\public\videos"
New-Item -ItemType Directory -Force -Path $outDir | Out-Null

$sources = @(
    @{ In = "IMG_7355.MP4"; Mp4 = "review-1.mp4"; Poster = "review-1-poster.webp" },
    @{ In = "IMG_4061.MP4"; Mp4 = "review-2.mp4"; Poster = "review-2-poster.webp" }
)

if (-not (Get-Command ffmpeg -ErrorAction SilentlyContinue)) {
    Write-Host "ffmpeg not found. Install from https://ffmpeg.org/download.html then re-run." -ForegroundColor Red
    exit 1
}

foreach ($s in $sources) {
    $input = Join-Path $root $s.In
    if (-not (Test-Path $input)) {
        Write-Warning "Skip missing: $input"
        continue
    }
    $mp4Out = Join-Path $outDir $s.Mp4
    $posterOut = Join-Path $outDir $s.Poster

    Write-Host "Encoding $($s.In) -> $($s.Mp4) ..."
    ffmpeg -y -i $input `
        -c:v libx264 -crf 26 -preset slow -movflags +faststart `
        -vf "scale=720:-2:flags=lanczos" `
        -c:a aac -b:a 128k -ar 48000 `
        $mp4Out

    Write-Host "Poster $($s.Poster) ..."
    ffmpeg -y -ss 00:00:01 -i $input -vframes 1 -q:v 80 $posterOut
}

Write-Host "Done. Files in frontend/public/videos/" -ForegroundColor Green
