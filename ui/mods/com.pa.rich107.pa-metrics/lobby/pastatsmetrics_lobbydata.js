// BS so the lobbyid stay the same over scenes, no idea why i coded this way, probably because it works
var my_lobbyid = model.lobbyId();
model.lobbyId = ko.observable(-1).extend({ session: "lobbyId" });
model.lobbyId(my_lobbyid);
localStorage.lobbyId = model.lobbyId();

console.log("lobby id from session lobbydata.js: ", model.lobbyId());

function SendList() {
	// some code i might have copied somewhere or someone told me how to do this, it's the getPlayerList
	// when a game is local playerid(=uber_id) = player name i don't know why PA is coded like this
	var player_list = {};
	for (var i = 0; i < model.armies().length; i++) {
		for (var j = 0; j < model.armies()[i].slots().length; j++) {
			if (model.armies()[i].slots()[j].isPlayer()) {
				player_list[model.armies()[i].slots()[j].playerName()] = model
					.armies()
					[i].slots()
					[j].playerId();
			}
		}
	}

	//for once, a normal a cute piece of code anyone can understand
	server_mods = model.serverMods();
	isFFA = model.isFFAGame();
	isTeamGame = model.isTeamGame();
	isLocal = model.isLocalGame();
	isPublic = model.isPublicGame();
	isFriendsOnly = model.isFriendsOnlyGame();
	isHidden = model.isHiddenGame();
	isTitan = model.isTitansGame();
	username = model.username();
	is_sandbox = model.sandbox();

	// im not sure but i think separator is comma and since mods can have comma then comma is a bad separator so i add one manually myself that is unlikely to get used
	var custom_server_mods_list = "";
	for (var i = 0; i < Object.keys(server_mods).length; i++) {
		custom_server_mods_list += ":::" + server_mods[i]["display_name"];
	}
	//setup var for later
	var current_player_is_spectating = false;

	if (model.startingGameCountdown() == 5) {
		//==5

		// UTC start date of the game, used to generate a hash which gonna be the lobby_id of local games
		var nowUTC =
			new Date().toISOString().replace("T", " ").replace(/\..+/, "") + " UTC";
		var my_id = fnv1aHash(
			JSON.stringify(player_list) + nowUTC.slice(0, nowUTC.length - 7) + " UTC",
		); // the lobbyid in the Database is gonna be the hash fnv of this string
		if (isLocal || model.serverType() == "custom") {
			//if you join a public locally hosted game, the game think it's not a local game since you joined it UwU but you still need the lobby_id uh
			model.lobbyId(my_id);
			localStorage.lobbyId = model.lobbyId();
		}
		//console.log("pastatsmetrics is SENDING DATA");

		// setup a default gameName if empty
		if (model.gameName()) {
			game_name_v = model.gameName();
		} else {
			game_name_v = "None";
		}
		var report = {
			is_lobby_data: true, // used by the server to know if it's lobbydata or livegame data, but useless now since there are 2 endpoints on server for lobby and live game data
			lobby_id: model.lobbyId(),
			uber_id: model.uberId(),
			user_name: model.username(),
			the_date: nowUTC,
			game_name: game_name_v,
			is_Local: model.isLocalGame(),
			is_Public: model.isPublicGame(),
			is_FriendsOnly: model.isFriendsOnlyGame(),
			is_Hidden: model.isHiddenGame(),
			is_Titan: model.isTitansGame(),
			is_Ranked: false,
			server_mods: custom_server_mods_list || "No server mods",
			player_list: JSON.stringify(player_list),
			planets_biomes: model.planetBiomes(),
		};
		var report_string = JSON.stringify(report); // data send as a string containing a JSON
		var ls_specs = model.spectators();
		var uberid = model.uberId();

		for (var i = 0; i < ls_specs.length; i++) {
			if (ls_specs[i]["id"] == uberid) {
				// IF CURRENT PLAYER IS IN SPEC when the game starts
				current_player_is_spectating = true;
			}
		}

		if (!current_player_is_spectating) {
			// IF NOT then we can send the lobbydata
			console.log("SENDING LOBBY DATA FROM: lobbydata.js");
			console.log("LOBBY DATA : ", report_string);
			// $.post(
			// 	"https://ggleaderboards.com/api/v1/pa-game-stats/lobbydata",
			// 	report_string,
			// );
		}
	}
	return;
}

(function () {
	setInterval(SendList, 1000);
})();

// hash funtion for  generating single/multiplayer local games lobby_id.
function fnv1aHash(str) {
	var hash = 2166136261;
	for (var i = 0; i < str.length; i++) {
		hash ^= str.charCodeAt(i);
		hash = (hash * 16777619) >>> 0;
	}
	return hash.toString(16);
}
