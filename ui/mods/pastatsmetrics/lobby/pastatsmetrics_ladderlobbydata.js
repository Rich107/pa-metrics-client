//console.log("hello");
//var my_lobbyid = "";
model.my_lobbyid = ko.observable(-1).extend({ session: 'lobbyId' });
//model.lobbyId(my_lobbyid);
//console.log("hello2");
function SendList(){

  var player_list = {};
  for(var i = 0; i<model.armies().length;i++){
      for(var j = 0; j< model.armies()[i].slots().length;j++){
        if(model.armies()[i].slots()[j].isPlayer()){
          player_list[model.armies()[i].slots()[j].playerName()] = model.armies()[i].slots()[j].playerId();
        }
    }
  }

  //game_name = model.gameName();
  //server_mods = model.serverMods();
  //isFFA = model.isFFAGame();
  //isTeamGame = model.isTeamGame();
  //isLocal = model.isLocalGame();
  //isPublic = model.isPublicGame();
  //isFriendsOnly = model.isFriendsOnlyGame();
  //isHidden = model.isHiddenGame();
  //isTitan = model.isTitansGame();
  //username = model.username();
  //is_sandbox= model.sandbox();
  //planetsBiomes = model.planetBiomes();
  var isRanked = true;

  /*var tt = ""
  for(var i = 0;i<Object.keys(server_mods).length; i++){
    tt += ":::" + server_mods[i]["display_name"];
  }*/
  
  console.log("HEYYY", model.startingGameCountdown())
  if(model.startingGameCountdown() == 5){
    var my_id = (Math.floor(Math.random() * 100000000000000000000)).toFixed().toString() + (Math.floor(Math.random() * 1000000000000)).toFixed().toString();
    console.log("avant")
    if(isRanked){
      model.my_lobbyid(my_id);
    }
    //console.log(model.my_lobbyid());
    console.log("Gryz stats SENDATA");
    var ip = "192.168.32.1"
    var url = "http://pastatsmetrics.com/pastats/paview" //"http://"+ ip + ":8000/main_isyw/paview";

    /*if(model.gameName().length > 0){
      game_name = model.gameName();
    }
    else{
      game_name = "None";
    }*/
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
      //model.teamCount()
    };
    //console.log("lobbyrepport", report);
    var report_string = JSON.stringify(report);



    //console.log(report_string);
    //$.post(url, report_string);
    $.post("http://192.168.32.1:8000/pastats/paview", report_string);
    //$.post("http://192.168.1.103:8000/pastats/paview", report_string);
    //$.post("http://172.20.10.6:8000/pastats/paview", report_string);
    $.post("http://192.168.1.119:8000/pastats/paview", report_string);
  }
  return
}

(function (){
  setInterval(SendList, 1000);
})();
