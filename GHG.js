

function energySelector(){
	var option = document.getElementById("selector").value;
	switch (option)
	{
		case "IWH":
			$("#title").attr("src", "img/IWH.png");
			setUpIWH();
			break;
		case "DW":
			$("#title").attr("src", "img/DW.png");
			break;
		case "Saw":
			$("#title").attr("src", "img/Saw.png");
			break;
		case "Man":
			$("#title").attr("src", "img/Man.png");
			break;


	}
}


function setUpIWH(){

	var spanToWrite = document.getElementById("ExtraData");
	spanToWrite.innerHTML = "<h3> Output</h3> <br> The annual production of the system:<br> ";

	var theSpan = document.createElement("span");
	theSpan.innerHTML= "MWhelectricity/year<br> Type of energy<br> "
	var inputAnnual = document.createElement("input");
        inputAnnual.type="text";
        inputAnnual.id="yearProduction"
	var inputType = document.createElement("input");
	inputType.type ="text";
	inputType.type ="typeOfEnergy";
	var btnCalculate = document.createElement("button");
	btnCalculate.innerHTML= 'Calculate';
	btnCalculate.addEventListener("click", function(){
		calculate(inputType, inputAnnual);
	});
	spanToWrite.appendChild(inputAnnual);
	spanToWrite.appendChild(theSpan);
        
	spanToWrite.appendChild(inputType);
	spanToWrite.appendChild(btnCalculate);
	
}

function calculate(typeOfEnergy, yearProduction)
{
	

	var theCountry = document.getElementById("country").value;

	switch (theCountry)
        {
                case "EU-28":
                        var co2 = 1000;
                        if (typeOfEnergy.value == "Wind")
                                 co2 = (yearProduction.value  * 383.0) / 1000;
                        else if(typeOfEnergy.value == "PV")
                                 co2 = (yearProduction.value * 363.0) / 1000;
                        else if(typeOfEnergy.value == "Hydroelectric")
                                 co2 = (yearProduction.value * 363.0) / 1000;
                        var trees = (co2 * 1000)/60;
                        var house = ( co2 * 1000)/1887.48;

                        document.getElementById("co2").innerHTML = co2;
                        document.getElementById("trees").innerHTML= trees;
                        document.getElementById("houses").innerHTML= house;
                        break;
        }

}
