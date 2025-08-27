//get info about LOOSERS
handlers.army_defeated = function(payload){
  model.processArmyDefeated(payload);
  api.Panel.message(api.Panel.parentId, "comKillData", payload)
}


