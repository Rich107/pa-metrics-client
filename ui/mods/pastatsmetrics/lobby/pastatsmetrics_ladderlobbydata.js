// ce fichier est ridicule on ne peut register une ranked que in game, rien de spécial dans le lobby e nfait
//fichier qui doit etre delete et juste on le garde là pour pouvoir resetup un lobby une fois IG
//console.log("hello");
//var my_lobbyid = "";
model.my_lobbyid = ko.observable(-1).extend({ session: 'lobbyId' });

function SendList(){

  var player_list = {};
  for(var i = 0; i<model.armies().length;i++){
      for(var j = 0; j< model.armies()[i].slots().length;j++){
        if(model.armies()[i].slots()[j].isPlayer()){
          player_list[model.armies()[i].slots()[j].playerName()] = model.armies()[i].slots()[j].playerId();
        }
    }
  }
  var isRanked = true;
  
  if(model.startingGameCountdown() == 5){
    // no lobbyid in lobby for ranked so gotta make one fake for registering the game and then replacing with the real one
    var nowUTC = new Date().toISOString().replace('T', ' ').replace(/\..+/, '') + ' UTC';
    var my_id = fnv1aHash(JSON.stringify(player_list) + nowUTC.slice(0,nowUTC.length-7) + ' UTC');

    if(isRanked){
      model.my_lobbyid(my_id);
    }
    console.log("pastatsmetrics sending ranked_lobby data");
    var report = {
      is_lobby_data: true,
      lobby_id: model.my_lobbyid(),
      game_name: "1v1 Ranked",
      is_Local: false,
      is_Public: true,
      is_FriendsOnly: false,
      is_Hidden: false,
      is_Titan: model.isTitansGame(),
      user_name: "None",
      server_mods: [],
      player_list: JSON.stringify(player_list),
      planets_biomes: model.planetBiomes(),
      uber_id: model.uberId(), 
    };
    var report_string = JSON.stringify(report);
    //$.post("http://pastatsmetrics.com/pastats/api/lobbydata", report_string);
  }
  return
}

(function (){
  setInterval(SendList, 1000);
})();


function fnv1aHash(str) {
    var hash = 2166136261; // FNV offset basis
    for (var i = 0; i < str.length; i++) {
        hash ^= str.charCodeAt(i);
        hash = (hash * 16777619) >>> 0; // FNV prime, keeps it 32-bit
    }
    return hash.toString(16); // Convert to hex for easy reading
}