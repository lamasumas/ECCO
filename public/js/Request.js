/*jshint esversion: 6 */





/**
 * This medthod sends a get request to the nodejs server, so it can calculate the co2, trees 
 * and houses value of the pellets energy
 * 
 */
function calculatePellets()
{
	var theCountry = document.getElementById("country").value;
	var dataToSend= {
		country: theCountry,
		outputheat: getValidatedUnitInputValue("pelletHeatOutput","G"), 
		outputelec: getValidatedUnitInputValue("pelletEllectOutput","M"),
		usefulC: getValidatedInput("usefulC_pellets"),
		surroundingsC: getValidatedInput("surroundC_pellets"),
		tonsTransportedPelletsYear: getValidatedUnitInputValue("trasportedPellets","Ton"),
		moistpelletsParam: getValidatedInput("moisture_pellets"),
		moistFeedstockSawdustParam: getValidatedInput("moisture_dust_pellets"),
		pellets_loss: getValidatedInput("pellets_loss"),
		electricityPelletization: getValidatedUnitInputValue("electricityPelletization","K"),
		transported_pellets_loss: getValidatedInput("transported_pellets_loss"),
		percentege_feedstock_sawdust_loss: getValidatedInput("percentege_feedstock_sawdust_loss"),
		sawdust_loss: getValidatedInput("sawdust_loss"),
		kmTruckTransport_pellets: getValidatedUnitInputValue("kmTruckTransport_pellets","K"),
		heatTransportedPellets: getValidatedUnitInputValue("heatTransportedPellets","M"),
		electricityTransportedPellets: getValidatedUnitInputValue("electricityTransportedPellets", "K"),
		heatPelletication: getValidatedUnitInputValue("heatPelletication","M")
	};
	$.ajax({
        url: "/formulas/WoodPellets",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
		success: (response) => writeResults(response)
	});
}


/**
 * This medthod sends a get request to the nodejs server, so it can calculate the co2, trees 
 * and houses value of the wood chips energy
 * 
 */
function calculateChips()
{

	var theCountry = document.getElementById("country").value;
	var dataToSend= {
		country: theCountry,
		outputheat: getValidatedUnitInputValue("chipsHeatOutput","G"),
		outputelec: getValidatedUnitInputValue("chipsellectOutput","M"),
		usefulC: getValidatedInput("usefulC_chips"),
		surroundingsC: getValidatedInput("surroundC_chips"),
		tonsTransportedChipsYear: getValidatedUnitInputValue("trasportedChips","Ton"),
		moistwoodParam: getValidatedInput("moisture_wood_chips"),
		moistchipsParam: getValidatedInput("moisture_chips"),
		feedstock_chips_loss: getValidatedInput("feedstock_chips_loss"),
		electricityChipping: getValidatedUnitInputValue("electricityChipping","K"),
		transported_chips_loss: getValidatedInput("transported_chips_loss"),
		seperated_chips_loss: getValidatedInput("seperated_chips_loss"),
		chips_loss: getValidatedInput("chips_loss"),
		wood_chips_loss: getValidatedInput("wood_chips_loss"),
		kmTruckTransport_chips: getValidatedUnitInputValue("kmTruckTransport_chips","K"),
		heatTransportedChips: getValidatedUnitInputValue("heatTransportedChips","M"),
		electricityTransportedChips: getValidatedUnitInputValue("electricityTransportedChips","K"),
		electricityMegneticSeparation: getValidatedUnitInputValue("electricityMegneticSeparation","K")
	

	};

	$.ajax({
        url: "/formulas/WoodChips",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
		success: (response) => writeResults(response)
	});
}


/**
 * This medthod sends a get request to the nodejs server, so it can calculate the co2, trees 
 * and houses value of the manure energy
 * 
 */
function calculateManure(){

	var theCountry = document.getElementById("country").value;
	var dataToSend = {
		country: theCountry,
		outputheat: getValidatedUnitInputValue("manureHeatOutput", "G"),
		outputelec: getValidatedUnitInputValue("manurellectOutput","M"),
		usefulC: getValidatedInput("usefulC_Manure"),
		surroundingsC: getValidatedInput("surroundC_Manure"),
		heatCombustionManure: getValidatedUnitInputValue("heatCombustionManure","M"),
		electricityCombustionManure: getValidatedUnitInputValue("electricityCombustionManure","K"),
		kmTruckManure: getValidatedUnitInputValue("kmTruckManure","K"),
		annualManureWeight: getValidatedUnitInputValue("annualManureWeight","Ton"),
		manure_loss: getValidatedInput("manure_loss"),
		percentege_feedstock_manure_loss: getValidatedInput("percentege_feedstock_manure_loss"),
		transported_manures_loss: getValidatedInput("transported_manures_loss"),
		biogas_loss: getValidatedInput("biogas_loss"),
		efficienyManureTransformation: getValidatedInput("efficienyManureTransformation"),
		methane_content: getValidatedInput("methane_content"),
		co2ProducedManure: getValidatedInput("co2ProducedManure"),
		ch4ProducedManure: getValidatedInput("ch4ProducedManure"),
		electricityTranportedManure: getValidatedUnitInputValue("electricityTranportedManure","K"),
		n2oProducedManure: getValidatedInput("N2oProducedManure"),
		electricityDigestionManure: getValidatedUnitInputValue("electricityDigestionManure","K"),
		heatDigestionManure: getValidatedUnitInputValue("heatDigestionManure","M")
	};

	$.ajax({
        url: "/formulas/Manure",
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
		success: (response) => writeResults(response)
	});

}


/**
 * This medthod sends a get request to the nodejs server, so it can calculate the co2, trees 
 * and houses value of the wind/hidro/pv energy
 * 
 */
function calculateWind()
{
	

	var theCountry = document.getElementById("country").value;
	var typeOfEnergy= document.getElementById("typeOfEnergy").value;
	var dataToSend = {
		country: theCountry,
		typeOfEnergy: typeOfEnergy,
		yearProduction: getValidatedUnitInputValue("yearProduction","M")

	};

$.ajax({
        url: '/formulas/Irradiation',
        type: 'POST',
        contentType: 'application/json',
        data: JSON.stringify(dataToSend),
		success: (response)=> writeResults(response)
	} );

}

/**
 * This method loads the tooltips depending on the language into the html
 * 
 * @param {string} htmlName name of the html file 
 */
function loadTooltips(language){
	var settings;

	switch (language)
	{
		case "en":
			settings = {
				"async": true,
       			"url": "./tooltips_en.json",
        		"method": "GET"
			};
			break;
		case "es":
			settings = {
			"async": true,
			"url": "./tooltips_es.json",
			  "method": "GET"
			};
			break;
		default:
			settings = {
				"async": true,
				"url": "./tooltips_en.json",
				"method": "GET"
			};
			break;
	}
	

	$.ajax(settings).done(function(response){
		console.log("hi");
		console.log(response);
		$(".fa-question-circle").each((x,y) =>{
			y.setAttribute("title", response[y.id]);
		});
	});
	
	
}