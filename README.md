# pastatsmetrics-client

## What is this mods
It records stats of your games and save them in a database, so you can check your stats whenever you want on the website

The data from this mod will be collected and added to ggleaderboards. If you have a membership with ggleaderboard you will be able to access this data from the ggleaderboard website

### What data does it records
- Data of every single game you play, custom, private, ranked, sandbox anything (Toggle for this is on the TO DO LIST)
- UnitsBuildingsCount
	- Units & Buildings type and numbers (so basically what you build and how many of them you have over the game).
	- Legion, 2nd Wave, Bugs, Thorosmen, S17 are on the TO DO LIST for support
- EconomyData:
	- current_time
	- APM (Real one, copied from superstats, yes it's not economy but it's recorded at the same time)
	- Energy :
		- energy_gain
		- energy_loss
		- energy_net
		- energy_efficiency_perc
		- energy_current_energy
		- energy_max_energy
	- Metal :
		- metal_gain
		- metal_loss
		- metal_net
		- metal_efficiency_perc
		- metal_current_metal
		- metal_max_metal
		- metal_win_rate
		- metal_loss_rate
	- Other :
		- metal_wasted
		- metal_produced
		- energy_wasted
		- energy_produced
		- efficiency
- PlayerData:
	- uber_id
	- player_name
	- date_name
- GameHistory:
	- lobby_id
	- uber_id
	- player_name
	- date_game
- LobbyData :
	- lobby_id (custom if local)
	- uber_id
	- player_name/player_list/player_count/player_colors
	- date_game
	- game_mode
	- game_name
	- system_name
	- planets_biomes
	- server_mods
	- winners
	- is ==> Public/Private/Sandbox/GalacticWar/Local/Multi/Ranked/ListenToSpec/landanywhere/DynamincAlliance
- KillData:
	- lobby_id
	- killer_name
	- defeated_name
	- time_kill

#### Data i want to record in the future
- Units & buildings locations (x,y,z,time) to create a summary of the game on the website
- Camera positions (x,y,z,time) to create POV replay of games
- What you scout, to help you not be fooled

##### What i want to record in my dream
- Orders you give to units (possible but may add lags)
- What units killed what units (possible but may add lags)
- Combat data to see how well an army is managed (possible)
- Number of kills made with nukes (not possible with base game functions AFAIK, need more research)
- What a unit destroys/Efficiency of each units (who use better booms ? who use locust the best way ? etc etc) (might be possible but very complex)
- HP of units (possible IIRC but crazy laggy)

##### What it does not
- It does not records data until the commander spawns
- It does not records data after your death either you win or loose
- It does not records data when you spectate

## Notes on Modding:
To debug the game whilst it is running you will need this debugger:
- https://cdn.planetaryannihilation.com/downloads/debugger-window

You will also need to run the game with the following arguments:
I think this is done in the steam luncher?
``` bash
--coherent_port=9999
```


This is the location of the data folder for things like logs and client mods
``` bash
C:\Users\BlackBox\AppData\Local\Uber Entertainment\Planetary Annihilation
```


