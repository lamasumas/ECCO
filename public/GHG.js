


$(document).ready(function (e) {

		$(".maximizeRow").attr("onclick", "maximize()");
		var xhttp = new XMLHttpRequest();  
		xhttp.open("GET", "/index.html/countries", true);
		xhttp.send();
		
	
});
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
	var option = document.getElementById("selector").value;
	$("#results").fadeOut();
	switch (option)
	{
		case "IWH":
			$("#title").attr("src", "img/IWH.png");
			changeFormInDisplay("WindForm");
			break;
		case "DW":
			$("#title").attr("src", "img/DW.png");
			changeFormInDisplay("woodChips")
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

	calculate(document.getElementById("typeOfEnergy"), document.getElementById("yearProduction"));
}


function loadFirstScreen(){
	
	$(".intro").css("display","none");
	$(".firstScreen").fadeIn().css("display","block");
	
}

function calculate(typeOfEnergy, yearProduction)
{
	

	var theCountry = document.getElementById("country").value;

	switch (theCountry)
        {
                case "EU-28":
                        var co2 = 1000;
                        if (typeOfEnergy.value == "wind")
                                 co2 = (yearProduction.value  * 383.0) / 1000;
                        else if(typeOfEnergy.value == "pV")
                                 co2 = (yearProduction.value * 363.0) / 1000;
                        else if(typeOfEnergy.value == "Hydroelectric")
                                 co2 = (yearProduction.value * 363.0) / 1000;
                        var trees = (co2 * 1000)/60;
                        var house = ( co2 * 1000)/1887.48;

                        document.getElementById("co2").innerHTML = co2;
                        document.getElementById("trees").innerHTML= trees;
                        document.getElementById("houses").innerHTML= house;
			document.getElementById("results").style.display ="block";
                        break;
        }

}
