/*jshint esversion: 6 */


$(document).ready(function (e) {
		$(".maximizeRow").attr("onclick", "maximize()");
		$("#calculateWind").attr("onclick", "calculateWind()");
		$("#calculateChips").attr("onclick", "calculateChips()");
		$("#calculatePellets").attr("onclick", "calculatePellets()");
		$.get('/index.html/countries', function(responseText) {
			var countries = responseText;
				addCountries(countries);
		});
		
	
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
	switch (option)
	{
		case "IWH":
			$("#title").attr("src", "img/IWH.png");
			changeFormInDisplay("WindForm");
			break;
		case "DW":
			$("#title").attr("src", "img/DW.png");
			changeFormInDisplay("woodChips");
			break;
		case "Saw":
			$("#title").attr("src", "img/Saw.png");
			changeFormInDisplay("woodPellets");
			break;
		case "Man":
			$("#title").attr("src", "img/Man.png");
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

function calculatePellets(){
  //
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
	$.get("/index.html/WoodChips?"+allParameters, function(response){
		
		var splittedResponse = response.split("@");
		var co2 = parseFloat(splittedResponse[0]);
		var trees = parseFloat(splittedResponse[1]);
		var houses  = parseFloat(splittedResponse[2]);

		document.getElementById("co2").innerHTML = Math.round(co2 * 100) / 100;
		document.getElementById("trees").innerHTML= Math.round(trees * 100) / 100;
		document.getElementById("houses").innerHTML= Math.round(houses * 100) / 100;

	});

}
function getValidatedInput(theId){
	var x = parseFloat(document.getElementById(theId).value);
	if(isNaN(x))
		return 0;
	else
		return x;
}

function calculateWind()
{
	

	var theCountry = document.getElementById("country").value;
	var typeOfEnergy= document.getElementById("typeOfEnergy").value;
	$.get("/index.html/Irradiation?country="+theCountry+"&typeOfEnergy="+(typeOfEnergy)+"&yearProduction="+
	(document.getElementById("yearProduction").value), function(response) {
		
		var co2 = response;
		var trees = (co2 * 1000)/60;
		var house = ( co2 * 1000)/1887.48;
		document.getElementById("co2").innerHTML = Math.round(co2 * 100) / 100;
		document.getElementById("trees").innerHTML= Math.round(trees * 100) / 100;
		document.getElementById("houses").innerHTML= Math.round(house * 100) / 100;

	});


               

}
