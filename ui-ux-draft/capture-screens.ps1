[CmdletBinding()]
param(
  [string]$EdgePath = 'C:\Program Files (x86)\Microsoft\Edge\Application\msedge.exe',
  [string[]]$ScreenIds
)

$ErrorActionPreference = 'Stop'

if (-not (Test-Path -LiteralPath $EdgePath)) {
  throw "Không tìm thấy Microsoft Edge tại: $EdgePath"
}

$draftRoot = Split-Path -Parent $MyInvocation.MyCommand.Path
$indexPath = (Resolve-Path -LiteralPath (Join-Path $draftRoot 'index.html')).Path
$outputRoot = Join-Path $draftRoot 'screenshots'
$profileRoot = Join-Path ([System.IO.Path]::GetTempPath()) 'rmms-edge-draft-profile'

New-Item -ItemType Directory -Force -Path $outputRoot | Out-Null
New-Item -ItemType Directory -Force -Path $profileRoot | Out-Null

$indexUri = [System.Uri]::new($indexPath).AbsoluteUri

$screens = @(
  @{ Id = 'D01'; File = 'D01-dashboard.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D02'; File = 'D02-gis-command.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D03'; File = 'D03-assets.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D04'; File = 'D04-intake.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D05'; File = 'D05-work-orders.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D06'; File = 'D06-gis-qa.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D07'; File = 'D07-project-core.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D08'; File = 'D08-capital-disbursement.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D09'; File = 'D09-project-handover.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D10'; File = 'D10-records.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D11'; File = 'D11-reports.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D12'; File = 'D12-public-map.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D13'; File = 'D13-access-audit.png'; Width = 1440; Height = 1024 },
  @{ Id = 'D14'; File = 'D14-platform-ops.png'; Width = 1440; Height = 1024 },
  @{ Id = 'M01'; File = 'M01-field-home.png'; Width = 390; Height = 844 },
  @{ Id = 'M02'; File = 'M02-patrol-offline.png'; Width = 390; Height = 844 },
  @{ Id = 'M03'; File = 'M03-my-work.png'; Width = 390; Height = 844 },
  @{ Id = 'M04'; File = 'M04-asset-update.png'; Width = 390; Height = 844 },
  @{ Id = 'M05'; File = 'M05-sync-conflict.png'; Width = 390; Height = 844 }
)

if ($ScreenIds) {
  $requested = $ScreenIds | ForEach-Object { $_.ToUpperInvariant() }
  $screens = @($screens | Where-Object { $requested -contains $_.Id })
  if ($screens.Count -ne $requested.Count) {
    throw 'Danh sách ScreenIds chứa mã frame không hợp lệ.'
  }
}

foreach ($screen in $screens) {
  $outputPath = Join-Path $outputRoot $screen.File
  $profileName = $screen.Id + '-' + [System.Guid]::NewGuid().ToString('N')
  $screenProfile = Join-Path $profileRoot $profileName
  New-Item -ItemType Directory -Force -Path $screenProfile | Out-Null
  $pageUrl = "$indexUri`?screen=$($screen.Id)&state=default&capture=1"
  $arguments = @(
    '--headless=new',
    '--disable-gpu',
    '--disable-extensions',
    '--disable-application-cache',
    '--hide-scrollbars',
    '--no-first-run',
    '--force-device-scale-factor=1',
    '--run-all-compositor-stages-before-draw',
    '--virtual-time-budget=3500',
    "--user-data-dir=$screenProfile",
    "--window-size=$($screen.Width),$($screen.Height)",
    "--screenshot=$outputPath",
    $pageUrl
  )

  & $EdgePath @arguments | Out-Null
  if ($LASTEXITCODE -ne 0 -or -not (Test-Path -LiteralPath $outputPath)) {
    throw "Chụp màn hình $($screen.Id) thất bại."
  }

  Write-Host "Đã chụp $($screen.Id) -> $($screen.File)"
}

Write-Host "Hoàn tất $($screens.Count) ảnh tại $outputRoot"
