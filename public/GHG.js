/*jshint esversion: 6 */


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

		var thePathName = location.pathname.split("/");
		var htmlName = thePathName[thePathName.length-1];
		loadTooltips(htmlName);
	
});


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
}

function maximize()
{
	var parentNode = event.target.parentElement.parentElement;
	parentNode.nextElementSibling.className= 'showRow';
	event.target.innerHTML ="-";
	event.target.removeEventListener("click", maximize);
	event.target.addEventListener("click", minimize);
}
function minimize()
{
	var parentNode = event.target.parentElement.parentElement;
	parentNode.nextElementSibling.className="hiddenRow";
	event.target.innerHTML ="+";
	event.target.removeEventListener("click", minimize);
	event.target.addEventListener("click", maximize );
}


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
 

function changeFormInDisplay(theId){
	var copy = document.getElementById(theId).cloneNode(true);
	copy.style.display = "block";
	var generalDisplay = document.getElementById("show");
	generalDisplay.replaceChild(copy, generalDisplay.childNodes[0]);
			

}



function loadFirstScreen(){
	
	$(".intro").css("display","none");
	$(".firstScreen").fadeIn().css("display","block");
	
}

function calculatePellets()
{
	var theCountry = document.getElementById("country").value;
	var allParameters ="country="+theCountry + "&";
	allParameters += "outputheat="+getValidatedInput("pelletHeatOutput")+"&";
    allParameters += "outputelec="+getValidatedInput("pelletEllectOutput")+"&";
	allParameters += "usefulC="+getValidatedInput("usefulC_pellets")+"&";
	allParameters += "surroundingsC="+getValidatedInput("surroundC_pellets")+"&";
    allParameters += "tonsTransportedPelletsYear="+getValidatedInput("trasportedPellets")+"&";
    allParameters += "moistpelletsParam="+getValidatedInput("moisture_pellets")+"&";
    allParameters += "moistFeedstockSawdustParam="+getValidatedInput("moisture_dust_pellets")+"&";
    allParameters += "pellets_loss="+getValidatedInput("pellets_loss")+"&";
    allParameters += "electricityPelletization="+getValidatedInput("electricityPelletization")+"&";
    allParameters += "transported_pellets_loss="+getValidatedInput("transported_pellets_loss")+"&";
    allParameters += "percentege_feedstock_sawdust_loss="+getValidatedInput("percentege_feedstock_sawdust_loss")+"&";
    allParameters += "sawdust_loss="+getValidatedInput("sawdust_loss")+"&";
    allParameters += "kmTruckTransport_pellets="+getValidatedInput("kmTruckTransport_pellets")+"&";
	allParameters += "heatTransportedPellets="+getValidatedInput("heatTransportedPellets")+"&";
	allParameters += "electricityTransportedPellets="+getValidatedInput("electricityTransportedPellets")+"&";
	allParameters += "heatPelletication="+getValidatedInput("heatPelletication");

	$.get("/formulas/WoodPellets?"+allParameters, (response) => writeResults(response));
}
function calculateChips()
{
	var theCountry = document.getElementById("country").value;
	var allParameters ="country="+theCountry + "&";
	allParameters += "outputheat="+getValidatedInput("chipsHeatOutput")+"&";
	allParameters += "outputelec="+getValidatedInput("chipsellectOutput")+"&";
	allParameters += "usefulC="+getValidatedInput("usefulC_chips")+"&";
	allParameters += "surroundingsC="+getValidatedInput("surroundC_chips")+"&";
	allParameters += "tonsTransportedChipsYear="+getValidatedInput("trasportedChips")+"&";
	allParameters += "moistwoodParam="+getValidatedInput("moisture_wood_chips")+"&";
	allParameters += "moistchipsParam="+getValidatedInput("moisture_chips")+"&";
	allParameters += "feedstock_chips_loss="+getValidatedInput("feedstock_chips_loss")+"&";
	allParameters += "electricityChipping="+getValidatedInput("electricityChipping")+"&";
	allParameters += "transported_chips_loss="+getValidatedInput("transported_chips_loss")+"&";
	allParameters += "seperated_chips_loss="+getValidatedInput("seperated_chips_loss")+"&";
	allParameters += "chips_loss="+getValidatedInput("chips_loss")+"&";
	allParameters += "wood_chips_loss="+getValidatedInput("wood_chips_loss")+"&";
	allParameters += "kmTruckTransport_chips="+getValidatedInput("kmTruckTransport_chips")+"&";
	allParameters += "heatTransportedChips="+getValidatedInput("heatTransportedChips")+"&";
	allParameters += "electricityTransportedChips="+getValidatedInput("electricityTransportedChips")+"&";
	allParameters += "electricityMegneticSeparation="+getValidatedInput("electricityMegneticSeparation");
	$.get("/formulas/WoodChips?"+allParameters, (response) => writeResults(response));

}
function getValidatedInput(theId){
	var x = parseFloat(document.getElementById(theId).value);
	if(isNaN(x))
		return 0;
	else
		return x;
}

function writeResults(response){
	var splittedResponse = response.split("@");
	var co2 = parseFloat(splittedResponse[0]);
	var trees = parseFloat(splittedResponse[1]);
	var houses  = parseFloat(splittedResponse[2]);

	document.getElementById("co2").innerHTML = Math.round(co2 * 100) / 100;
	document.getElementById("trees").innerHTML= Math.round(trees * 100) / 100;
	document.getElementById("houses").innerHTML= Math.round(houses * 100) / 100;
}

function calculateManure(){

	var theCountry = document.getElementById("country").value;
	var allParameters ="country="+theCountry + "&";
	allParameters += "outputheat="+getValidatedInput("manureHeatOutput")+"&";
	allParameters += "outputelec="+getValidatedInput("manurellectOutput")+"&";
	allParameters += "usefulC="+getValidatedInput("usefulC_Manure")+"&";
	allParameters += "surroundingsC="+getValidatedInput("surroundC_Manure")+"&";
	allParameters += "heatCombustionManure="+getValidatedInput("heatCombustionManure")+"&";
	allParameters += "electricityCombustionManure="+getValidatedInput("electricityCombustionManure")+"&";
	allParameters += "kmTruckManure="+getValidatedInput("kmTruckManure")+"&";
	allParameters += "annualManureWeight="+getValidatedInput("annualManureWeight")+"&";
	allParameters += "manure_loss="+getValidatedInput("manure_loss")+"&";
	allParameters += "percentege_feedstock_manure_loss="+getValidatedInput("percentege_feedstock_manure_loss")+"&";
	allParameters += "transported_manures_loss="+getValidatedInput("transported_manures_loss")+"&";
	allParameters += "biogas_loss="+getValidatedInput("biogas_loss")+"&";
	allParameters += "efficienyManureTransformation="+getValidatedInput("efficienyManureTransformation")+"&";
	allParameters += "methane_content="+getValidatedInput("methane_content")+"&";
	allParameters += "co2ProducedManure="+getValidatedInput("co2ProducedManure")+"&";
	allParameters += "ch4ProducedManure="+getValidatedInput("ch4ProducedManure")+"&";
	allParameters += "electricityTranportedManure="+getValidatedInput("electricityTranportedManure")+"&";
	allParameters += "n2oProducedManure="+getValidatedInput("N2oProducedManure")+"&";
	allParameters += "electricityDigestionManure="+getValidatedInput("electricityDigestionManure")+"&";
	allParameters += "heatDigestionManure="+getValidatedInput("heatDigestionManure");
	console.log(getValidatedInput("electricityDigestionManure"));
	$.get("/formulas/Manure?"+allParameters, (response) => writeResults(response) );


}

function calculateWind()
{
	

	var theCountry = document.getElementById("country").value;
	var typeOfEnergy= document.getElementById("typeOfEnergy").value;
	$.get("/formulas/Irradiation?country="+theCountry+"&typeOfEnergy="+(typeOfEnergy)+"&yearProduction="+
	(document.getElementById("yearProduction").value), (response) => writeResults(response));

}


function loadTooltips(htmlName){
	var settings;

	switch (htmlName)
	{
		case "index.html":
			settings = {
				"async": true,
				"url": "./tooltips_en.json",
				"method": "GET"
			};
			break;
		case "index_es.html":
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