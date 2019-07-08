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
		setInputBackground();
		setUpMaxHandler();
		
	theUnit = new Unit();
	lastOption = document.getElementById("resultsUnits").value;
});






var lastOption;
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

	document.getElementById("resultSection").style.display = "block";
	var option = document.getElementById("selector").value;
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

function initialEnergySelector(){

	document.getElementById("resultSection").style.display = "block";
	var option = document.getElementById("initialSelector").value;
	document.getElementById("firstScreen").style.display="none";
	document.getElementById("finalEnergySelector").style.display="block"
	$("#goDatabaseView").fadeIn().css("display","auto");
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
 * This will prepare the first screen
 */
function loadFirstScreen(){
	
	$(".intro").css("display","none");
	$("#firstScreen").fadeIn().css("display","block");
	
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

/**
 * 
 * @param {string} theId The id of the input that we want to validate the value
 * @param {string} desiredUnit The desired unit choosen by the user
 * 
 * This units gets and transforms the value of the inputs into a desired unit and 
 * it is returned.
 * If the input has not been modified by the user a 0 will be returned instead
 */
function getValidatedUnitInputValue(theId, desiredUnit){
	var input = document.getElementById(theId);
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
	var resultUnits = document.getElementById("resultsUnits");


	document.getElementById("co2").innerHTML = writeDots(Math.round(theUnit.getValue(co2, "Ton" , resultUnits.selectedOptions[0].value)));
	document.getElementById("trees").innerHTML= writeDots(Math.round(trees));
	document.getElementById("houses").innerHTML= writeDots(Math.round(houses));
}

/**
 * 
 * @param {string} theNumber
 * 
 * This function recive a string with the number format used in the result table ("100,300") and
 * it is transformed into a formal float number string in order to be parse (100300) 
 */
function removeDots(theNumber){
	var splittted = theNumber.split(",");
	
	return splittted.join("");
	
}

function setInputBackground(){
	$(document).on("input", "input", function()
	{
		if(this.value == "")
		{
			this.style.backgroundColor = "white"
		}
		else
		{
			this.style.backgroundColor = "wheat"
		}
	});
}

function setUpMaxHandler(){
	$(document).on("input", "input[type='number']", function()
	{
		if(this.max < parseInt(this.value))
			this.value = this.max;
		
		if(this.min > parseInt(this.value))
		{
			this.value = this.min;
		}
	});
}




/**
 * This is a listener for the unit selector of the result table, so the user is able to converted into any of the 
 * possible options available
 */
function resultTableListener(){
	var co2 = parseFloat(removeDots(document.getElementById("co2").innerHTML));
	document.getElementById("co2").innerHTML = writeDots(Math.round(theUnit.getValue(co2, lastOption, document.getElementById("resultsUnits").selectedOptions[0].value)));
	lastOption = document.getElementById("resultsUnits").selectedOptions[0].value;
	
}
