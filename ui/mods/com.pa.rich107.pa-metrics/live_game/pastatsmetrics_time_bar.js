//get time in seconds and as string
function SendTimeData() {
	var TimeData = model.currentTimeInSeconds();

	console.log("send time data time_bar.js");
	api.Panel.message(api.Panel.parentId, "TimeData", [TimeData]);
	return;
}

(function () {
	setInterval(SendTimeData, 200);
})();
