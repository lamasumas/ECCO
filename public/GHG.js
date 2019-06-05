/*jshint esversion: 6 */


$(document).ready(function (e) {

		$(".maximizeRow").attr("onclick", "maximize()");
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

function setUpIWH(){

	calculate();
}


function loadFirstScreen(){
	
	$(".intro").css("display","none");
	$(".firstScreen").fadeIn().css("display","block");
	
}

function calculate()
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
