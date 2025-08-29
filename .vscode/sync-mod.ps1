Copy-Item -Path .\* -Destination "$env:LOCALAPPDATA\Uber Entertainment\Planetary Annihilation\client_mods\com.pa.rich107.pa-metrics" -Recurse -Force -Container

$json = Get-Content -Raw -Path "$env:LOCALAPPDATA\Uber Entertainment\Planetary Annihilation\client_mods\com.pa.rich107.pa-metrics\modinfo.json" | ConvertFrom-Json
$json.identifier = 'com.pa.rich107.pa-metrics'
$json.display_name = 'PA Metrics (dev)'
$json | ConvertTo-Json -Depth 32 | Set-Content -Path "$env:LOCALAPPDATA\Uber Entertainment\Planetary Annihilation\client_mods\com.pa.rich107.pa-metrics\modinfo.json"