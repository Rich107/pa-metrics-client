// get info when game is over and add a button to access charts directly
function SendGameOver() {
	console.log("pastatsmetrics game over data message 1");
	var StateGameOver = model.state();
	var VictorsPlayers = model.victors();

	api.Panel.message(api.Panel.parentId, "TheGameOverData", [
		StateGameOver,
		VictorsPlayers,
	]);
	return;
}

function initGameOverTracking() {
	console.log("pastatsmetrics game over data message 2");
	setInterval(SendGameOver, 1000);
}
initGameOverTracking();

lobby_id = localStorage.lobbyId;

function superStatsReported() {}
function initSuperStatsButton() {
	console.log("pastatsmetrics game over data message 3");
	model.goToSuperStats = function () {
		engine.call("web.launchPage", "https://ggleaderboards.com/api/v1/pa-game-stats/charts=" + lobby_id);
	};
	$('input[value="REVIEW"]')
		.parent()
		.before('<div data-bind="visible:superStatsReported"><input type="button" value="PA STATS METRICS" data-bind="click:goToSuperStats" /></div>');
}
initSuperStatsButton();
