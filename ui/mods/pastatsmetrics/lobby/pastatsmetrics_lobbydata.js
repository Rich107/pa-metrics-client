var my_lobbyid = model.lobbyId();
model.lobbyId = ko.observable(-1).extend({ session: 'lobbyId' });
model.lobbyId(my_lobbyid);
localStorage.lobbyId = model.lobbyId();
function SendList(){

  var player_list = {};
  for(var i = 0; i<model.armies().length;i++){
      for(var j = 0; j< model.armies()[i].slots().length;j++){
        if(model.armies()[i].slots()[j].isPlayer()){
          player_list[model.armies()[i].slots()[j].playerName()] = model.armies()[i].slots()[j].playerId();
        }
    }
  }

  game_name = model.gameName();
  server_mods = model.serverMods();
  isFFA = model.isFFAGame();
  isTeamGame = model.isTeamGame();
  isLocal = model.isLocalGame();
  isPublic = model.isPublicGame();
  isFriendsOnly = model.isFriendsOnlyGame();
  isHidden = model.isHiddenGame();
  isTitan = model.isTitansGame();
  username = model.username();
  is_sandbox= model.sandbox();

  var tt = ""
  for(var i = 0;i<Object.keys(server_mods).length; i++){
    tt += ":::" + server_mods[i]["display_name"];
  }




  /*var sendtest = {
    is_lobby_data: true,
    lobby_id: model.lobbyId(),
    game_name: model.gameName(),
    is_Local: model.isLocalGame(),
    is_Public: model.isPublicGame(),
    is_FriendsOnly: model.isFriendsOnlyGame(),
    is_Hidden: model.isHiddenGame(),
    is_Titan: model.isTitansGame(),
    user_name: model.username(),
    server_mods: tt,
    player_list: JSON.stringify(player_list),
    //model.teamCount()
  };
  console.log("EHOY", sendtest);*/
  
  
  var current_player_is_spectating = false;
  console.log("counter", model.startingGameCountdown());
  if(model.startingGameCountdown() == 5){ //==5

    var my_id = (Math.floor(Math.random() * 100000000000000000000)).toFixed().toString() + (Math.floor(Math.random() * 1000000000000)).toFixed().toString();
    if(isLocal){
      model.lobbyId(my_id);
      localStorage.lobbyId = model.lobbyId();
    }
    console.log("gryz stats SENDATA");
    var ip = "192.168.0.13";
    var url = "http://pastatsmetrics.com/pastats/paview"; //"http://"+ ip + ":8000/main_isyw/paview";

    if(model.gameName()){
      game_name_v = model.gameName();
    }
    else{
      game_name_v = "None";
    }
    var report = {
      is_lobby_data: true,
      lobby_id: model.lobbyId(),
      game_name: game_name_v,
      is_Local: model.isLocalGame(),
      is_Public: model.isPublicGame(),
      is_FriendsOnly: model.isFriendsOnlyGame(),
      is_Hidden: model.isHiddenGame(),
      is_Titan: model.isTitansGame(),
      user_name: model.username(),
      server_mods: tt,
      player_list: JSON.stringify(player_list),
      planets_biomes: model.planetBiomes(),
      uber_id: model.uberId(),
    };
    var report_string = JSON.stringify(report);
  

    
    console.log("WHAT IS SEND", report);
    //$.post(url, report_string);
    var ls_specs = model.spectators();
    var uberid = model.uberId();
    for(var i = 0; i< ls_specs.length;i++){
      if(ls_specs[i]["id"] == uberid){ // IF CURRENT PLAYER IS NOT IN SPEC when the game starts
        current_player_is_spectating = true;
    } }

    if(!current_player_is_spectating){
      console.log("before");
      //$.post(url, report_string);
      //$.post("http://192.168.1.103:8000/pastats/paview", report_string);
      $.post("http://192.168.1.119:8000/pastats/paview", report_string);
      $.post("http://192.168.32.1:8000/pastats/paview", report_string);
      console.log("after");
    }
  }
  return
}

(function (){
  setInterval(SendList, 1000);
})();
