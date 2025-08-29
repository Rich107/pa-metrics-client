/*


All functions have String equivalents
model.energyGain (there's also one with GainString) ==> net gain
model.energyLoss ==> net consumption
model.energyNet ==> net production
model.energyEfficiencyPerc this is the production/consumption percentage - if 1 then 100%, if 5.55 then the ratio is 555% :)
model.currentEnergy ==> current storage value
model.maxEnergy ==> storage maximum

same applies to model.metal


*/

function SendEco() {
	var EnergyGain = model.energyGain();
	var EnergyLoss = model.energyLoss();
	var EnergyNet = model.energyNet();
	var EnergyEfficiencyPerc = model.energyEfficiencyPerc();
	var EnergyCurrentEnergy = model.currentEnergy();
	var EnergyMaxEnergy = model.maxEnergy();

	var MetalGain = model.metalGain();
	var MetalLoss = model.metalLoss();
	var MetalNet = model.metalNet();
	var MetalEfficiencyPerc = model.metalEfficiencyPerc();
	var MetalCurrentMetal = model.currentMetal();
	var MetalMaxMetal = model.maxMetal();

	console.log("send eco data economy_bar.js");
	api.Panel.message(api.Panel.parentId, "EcoDataAll", [
		EnergyGain,
		EnergyLoss,
		EnergyNet,
		EnergyEfficiencyPerc,
		EnergyCurrentEnergy,
		EnergyMaxEnergy,
		MetalGain,
		MetalLoss,
		MetalNet,
		MetalEfficiencyPerc,
		MetalCurrentMetal,
		MetalMaxMetal,
	]);
	return;
}

function initEconomyTracking() {
	setInterval(SendEco, 1000);
}
initEconomyTracking();
