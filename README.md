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



Notes from 2025-09-10


I think 0 is the planet that we are on when i set this to 1 it failed
wv = api.getWorldView(0)

function (id) {
        id = (id >= 0) ? id : 0;
        // Note: If this ever gets particularly sparse (eg. thousands of views
        // with only a few active), this might have to use a different
        // aggregation mechanism.
        if ((id < worldViews.length) && worldViews[id])
            return worldViews[id];
        if (worldViews.length <= id)
            worldViews.length = id + 1;
        worldViews[id] = new WorldView(id);
        return worldViews[id];
    }

	


model.armyId() gets the id of the army this is needed to pass into 




0, 0 worked when it was 1 planet and
wv.getArmyUnits(0,0).then(function(data) { console.log("army", data);});

What happens when units leave a planet?
If a unit moves from planet A to planet B they imediately disapear from planet A and will eventually show in the number for planet B
During transision they will be missing from any counts. 


What happens when units are destroyed?
When a unit is destroyed they are removed from the list. Thus it only shows what is currently on the planet


What happens when a unit is being built?
It will show in the numbers


How can I tell when a unit has finished being built?
You need to take the ID of the unit from the getArmyUnits and pass it to vw.getUnitState(idOfUnit).then(function (data) {console.log(data)})



Where can I got to see the UI code for PA without looking in my own game files:
git@github.com:PA-Consultants/Consultants-UI.git


How could we detect idle fabs?
We can looks at all the things that match a fab and see if it has either orders or does not we can then count the total fabs and total active fabs.




Interesting things seen in vw.getUnitState(idOfUnit).then(function (data) {console.log(data)}):

poking around the unit states and changing states. It looks like we can get idle fabs from:
Getting a list of ids that are fabs and passing them into getUnitSate (which can take and arry)
Then looping over the objects returned and looking for units with and without orders
If it is activly building then we can see a build target
```
Example Titen with hold orders:

army: 0
build: "Continuous"
health: 0.7333333492279053 (will only show if it has been damaged or is getting built)
built_frac: 0.8184810280799866
orient: Array[4]
planet: 0
pos: Array[3]
unit_spec: "/pa/units/air/titan_air/titan_air.json"
vel: Array[3]
weapon: "HoldFire"
weapon: "ReturnFire"
build: "Continuous"
movement: "HoldPosition"


Example T2 Fab with build orders:

army: 0
movement: "Roam"
build_target: 4144 (id of the unit it is building)
orders: Array[1]
orient: Array[4]
planet: 0
pos: Array[3]
unit_spec: "/pa/units/air/fabrication_aircraft_adv/fabrication_aircraft_adv.json"
vel: Array[3]



Orbital titen on planet 1 without link to portal:
army: 0
energy: "Conserve"
orient: Array[4]
planet: 1
pos: Array[3]
unit_spec: "/pa/units/orbital/titan_orbital/titan_orbital.json"


Orbital titen on planet 0 with link to portal:
energy: "Conserve"
planet: 0

Fabber building something:
army: 0
build_target: 5102 (this is the id of the unit getting built
orders: Array[1]
orient: Array[4]
planet: 0pos: Array[3]
unit_spec: "/pa/units/air/fabrication_aircraft/fabrication_aircraft.json"vel: Array[3]


factories are the same they also have build targets for the unit id they are building:
army: 0build: Array[1]
build_target: 5394
orient: Array[4]
planet: 0
pos: Array[3]
unit_spec: "/pa/units/air/air_factory_adv/air_factory_adv.json"


If they are not building that second but they have orders to build more things:
then build will be set to an array of the objects it is going to build
If it is just building one thing then it will have a build_target
Thus to check if a factory is working and not idle

It is idle if it does not have a build target and build is not an array.
If either build_target is an id int or build is an array then the facotry is working
Build target being a id of int means that it is activly building that thing

the roll of time between unit builds will show the factory without a build target but with a list of things to build i the build property. 

Might want to consider the below for both fabs and factories when performing the count
energy: "Conserve"

```


This is the location of the data folder for things like logs and client mods
``` bash
C:\Users\BlackBox\AppData\Local\Uber Entertainment\Planetary Annihilation
```

Process to setup client by hand without the manager:
- Copy the file in the path above with the correct user name
- The file needs to he located in:
- client_mods
    - something for a folder name
        - ui (folder)
            - mods
                -  pastatsmetrics
        - modinfo.json
- You also need to enable the mod in the community mod manager

