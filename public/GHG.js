/*jshint esversion: 6 */

/**
 * Executed when the document is loaded
 */
$(document).ready(function (e) {
		$(".maximizeRow").attr("onclick", "maximize()");
		$("#calculateWind").attr("onclick", "calculateWind()");
		$("#calculateChips").attr("onclick", "calculateChips()");
		$("#calculatePellets").attr("onclick", "calculatePellets()");
		$("#calculateManure").attr("onclick", "calculateManure()");
		
		$.get('/index.html/countries', function(responseText) {
			var countries = responseText;
			addCountries(countries);
		});
 
		loadTooltips(document.documentElement.lang);

	theUnit = new Unit();
});

var theUnit;
/**
 * This method adds to the html country selector the actual values
 * 
 * @param {string} countries, string formated with the name of all the countries of the server
 */
function addCountries(countries)
{
	var countryNames = countries.split("@");
	countryNames.forEach((item) => {
		if( item != "")
		{
			var option = new Option(item, item);
			$("#country").append(option);
		}
	});
	$('#country [value="EU-28"]').prop("selected", true);

}


/**
 * This method is a "event listener" for the energy selector, so it can call to the "animation" of 
 * changing the energy form
 */
function energySelector(){

	document.getElementById("results").style.display = "block";
	var option = document.getElementById("selector").value;
	$("#title").css("display","none");
	switch (option)
	{
		case "IWH":
			changeFormInDisplay("WindForm");
			break;
		case "DW":
			changeFormInDisplay("woodChips");
			break;
		case "Saw":
			changeFormInDisplay("woodPellets");
			break;
		case "Man":
			changeFormInDisplay("manure");
			break;


	}
}
 
/**
 * This is th actual animation of changing the energy form
 * @param {String} theId id of the energy form 
 */
function changeFormInDisplay(theId){
	var copy = document.getElementById(theId).cloneNode(true);
	copy.style.display = "block";
	var generalDisplay = document.getElementById("show");
	generalDisplay.replaceChild(copy, generalDisplay.childNodes[0]);
			

}


/**
 * This will prepare the first screen
 */
function loadFirstScreen(){
	
	$(".intro").css("display","none");
	$(".firstScreen").fadeIn().css("display","block");
	
}

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
	}
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
 * This is a method that maximize the next row in the table thanks to the tree sheme of the html
 */
function maximize()
{
	var parentNode = event.target.parentElement.parentElement;
	parentNode.nextElementSibling.className= 'showRow';
	event.target.innerHTML ="-";
	event.target.removeEventListener("click", maximize);
	event.target.addEventListener("click", minimize);
}

/**
 * This is a method that minimize the next row in the table thanks to the tree sheme of the html
 */
function minimize()
{
	var parentNode = event.target.parentElement.parentElement;
	parentNode.nextElementSibling.className="hiddenRow";
	event.target.innerHTML ="+";
	event.target.removeEventListener("click", minimize);
	event.target.addEventListener("click", maximize );
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
		$(".fa-question-circle").each((x,y) =>{
			y.setAttribute("title", response[y.id]);
		});
	}

	);
	
	
}
function writeDots(theData)
	{
		var stringData = theData.toString();

		var numberOfDots = (stringData.length-1)/3;
		var rgx = /(\d+)(\d{3})/;
		while (rgx.test(stringData)) {
			stringData = stringData.replace(rgx, '$1' + ',' + '$2');
		}
		return stringData;

	}
 

/**
 * This method will validate the input, and it will try to parse it into a number.
 * If the input is not valid, a 0 will be reutrn 
 * @param {string} theId, id of the text field
 */
function getValidatedInput(theId){
	var x = parseFloat(document.getElementById(theId).value);
	if(isNaN(x))
		return 0;
	else
		return x;
}

function getValidatedUnitInputValue(theId, desiredUnit){
	var input = document.getElementById(theId)
	var x = parseFloat(input.value);
	if(isNaN(x))
		return 0;
	else
	{
		return theUnit.getValue(x, input.nextElementSibling.selectedOptions[0].value, desiredUnit);
	}
}

/**
 * This method will write into the result table the calculated data
 * @param {String} response, a formated string with the actual values
 */
function writeResults(response){
	var splittedResponse = response.split("@");
	var co2 = parseFloat(splittedResponse[0]);
	var trees = parseFloat(splittedResponse[1]);
	var houses  = parseFloat(splittedResponse[2]);

	document.getElementById("co2").innerHTML = writeDots(Math.round(co2));
	document.getElementById("trees").innerHTML= writeDots(Math.round(trees));
	document.getElementById("houses").innerHTML= writeDots(Math.round(houses));
}
