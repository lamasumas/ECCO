/*jshint esversion: 6 */
var loadedJsons;
var express = require("express");
var fs = require("fs");
var app = express();
readData();



app.use(express.static("public"));

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 });

app.get('/index.html/countries', function (req, res) {
    
   var names ="";
    loadedJsons.forEach((item) => {
        names += item.country +"@";
    });
    res.send(names);

       
});

 app.get("/index.html/Irradiation", function(req, res) 
 {
    var theCountrySelected = req.query.country;
    var typeOfEnergy = req.query.typeOfEnergy;
    var yearProduction = req.query.yearProduction;

    var theSelectedCountryData;
    for( i = 0; i< loadedJsons.length; i++)
    {
        if (loadedJsons[i].country == theCountrySelected)
        {
            theSelectedCountryData = loadedJsons[i];
            break;
        }
    }
		var co2 = 0;
		switch(typeOfEnergy)
		{
			case "wind":
					var esaved_wind = parseFloat(theSelectedCountryData.esaved_wind);
					co2 = (yearProduction * esaved_wind) / 1000;
					break;
			case "pV":
					var esaved_PV = parseFloat(theSelectedCountryData.esaved_PV);
					co2 = (yearProduction * esaved_PV) / 1000;
					break;
			case "Hydroelectric":
					var esaved_hydro = parseFloat(theSelectedCountryData.esaved_hydro);
					 co2 = (yearProduction * esaved_hydro) / 1000;
					 break;
        }

        res.send(co2.toString());
 });

 function readData(){
               
    fs.readFile(__dirname+"/json/Countries.json", (err, fileData) => {
        if(err){
            console.log("Error while loading the json files");
        }
        try{
            
            loadedJsons = JSON.parse(fileData);
        }
        catch(error){
            console.log(error);
        }
    } );
 }


 var server = app.listen(8081, function(){
     var host= server.address().address;
     var port = server.address().port;
 });




 function calculateWoodChipsCo2(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear, moistchipsParam){
    // mCO2_total = (outputheat + 3.6 outputelec) (Efossil_heat afheat + Efossil_elec afelec) (%GHGsaved_total/100) /1000
    // %GHGsaved_total = (afheat %GHGsaved_heat) + (afelec %GHGsaved_elec)
    // %GHGsaved_heat = 100 (1 - Eheat /Efossil_heat)
    // %GHGsaved_elec = 100 (1 - Eelec /Efossil_elec)
    // Eheat = E afheat /nheat
    // Eelec = E afelec /nelec
    // afheat = Cheat nheat/(Celec nelec + Cheat nheat)
    // afelec = Celec nelec/(Celec nelec + Cheat nheat)
    // nelec = 3.6 outputelec /(inflow (1 - moistchips/100) LHV)
    // nheat = outputheat /(inflow (1 - moistchips/100) LHV)

    var efossil_heat = countryJSON.eheat;
    var efossil_elec = countryJSON.eelec;
    var cheat =  getCheatValue(usefulC, surroundingsC);
    var celec = 1;
    var inflow = tonsTransportedChipsYear;
    var moistchips = (moistchipsParam == 0)? 33: moistchipsParam ;
    var lhv = countryJSON.LHV_Demolitoion_Wood;
    var nheat = ( inflow == 0 ) ? 0.45 : outputheat / ( inflow * ( 1 - moistchips / 100 )* lhv);
    var nelec = (inflow == 0) ? 0.45 : 3.6 * outputelec / ( inflow * (1 - moistchips/ 100) * lhv);
    var afheat = cheat * nheat / ( celec* nelec + cheat * nheat) ;
    var afelec = celec * nelec / (celec * nelec +  cheat * nheat);

    var ghgSavedTotal = (afheat * ghgSavedHeat) + ( afelec *  ghgsaved_elec);
    var mCO2_totla = (outputheat + 3.6 * outputelec) * (Efossil_heat * afheat + Efossil_elec * afelec)*(ghgSavedTotal /100) /1000;



}


function getCheatValue(th,to){

    if (th ==0)
        th = 90;

    if ( th > 150)
        return (th- to)/(th + 273);
    else
        return 0.3546;
}