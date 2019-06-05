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

 app.get("index.html/WoodChipsC02", function(req, res){

    var countryJSON = getCountry();
    var outputheat;
    var outputelec;
    var usefulC;
    var surroundingsC;
    var tonsTransportedChipsYear;
    var moistwoodParam;
    var moistchipsParam;
    var feedstock_chips_loss;
    var electricityChipping;
    var transported_chips_loss;
    var seperated_chips_loss;
    var chips_loss;
    var wood_chips_loss;
    var kmTruckTransport_chips;
    var heatTransportedChips;
    var electricityTransportedChips;
    var electricityMegneticSeparation;





    var co2 = calculateWoodChipsCo2(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
        moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
       wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation);
 })

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




 function calculateWoodChipsCo2(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
     moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
    wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation){
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



//eelec = telec
//eheat = thear
    var pgas_combustion = heatTransportedChips;
    var pelec_combustion = electricityTransportedChips;
    var pelec_separation = (electricityMegneticSeparation==0)? 0.6: electricityMegneticSeparation;
    var efossil_heat = countryJSON.eheat;
    var efossil_elec = countryJSON.eelec;
    var celec = 1;
    var egas =countryJSON.egas ;
    var efuel = countryJSON.efuel;
    var nvehical = countryJSON.nvehicle_Dry;
    var lengthtransport = ( kmTruckTransport_chips== 0)? 50:  kmTruckTransport_chips;
    var inflow = tonsTransportedChipsYear;
    var cheat =  getCheatValue(usefulC, surroundingsC);
    var moistchips = (moistchipsParam == 0)? 33: moistchipsParam ;
    var moistwood = (moistwoodParam == 0)? 50: moistwoodParam;
    var lhv = countryJSON.LHV_Demolitoion_Wood;
    var pelec_chipping = (electricityChipping == 0)?  75 : electricityChipping ;
    var nwfeedstock = 1- feedstock_chips_loss /100;
    var telec = efossil_elec;


    var nheat = ( inflow == 0 ) ? 0.45 : outputheat / ( inflow * ( 1 - moistchips / 100 )* lhv);
    var nelec = (inflow == 0) ? 0.45 : 3.6 * outputelec / ( inflow * (1 - moistchips/ 100) * lhv);
    var afheat = cheat * nheat / ( celec* nelec + cheat * nheat) ;
    var afelec = celec * nelec / (celec * nelec +  cheat * nheat);
    
    
    var theYield = 1000 * nwtotal * (1 - moistchips / 100) * lhv;
    var nwchips = 1- wood_chips_loss /100;
    var nwchipping = nwchips * (1 - moistwood/100) /(1 - moistchips/100);
    var nwconvertion = 1- transported_chips_loss /100;
    var nwtransport = 1- seperated_chips_loss /100;
    var nwseparation = 1- chips_loss /100;

    //there is no seperation;
    var nwseperation = 1- chips_loss /100; 
    var nwtotal =  nwfeedstock * nwchipping * nwseparation * nwtransport * nwconvertion;

    // ther is a 0 hardcoded
    var eCO2 = 0;
    var eCH4 = 0;
    var eN2O = 0;
    var fCH4_CO2 = countryJSON.fCH4_CO2;
    var fN2O_CO2 = countryJSON.fN2O_CO2;
    
    //This formula is bad written
    var edirect_combustion = 1000 *(eCO2 + eCH4 * (fCH4_CO2) + eN2O * (fN2O_CO2)) ;

    var etransport_exhaust = countryJSON.etransport_exhaust_Dry;
    
    var echipping = nwfeedstock * (3.6 * pelec_chipping * telec) / theYield;
    var ecombustion = (nwfeedstock * nwchipping* nwseperation * nwtransport)* (edirect_combustion + 3.6* pelec_combustion* telec + pgas_combustion *egas) /theYield;
    var etransport =(nwfeedstock * nwchipping * nwseperation) * lengthtransport  *(nvehical * efuel + etransport_exhaust) / theYield;
    var eseperation = (nwfeedstock * nwchipping)* (3.6* pelec_separation * telec) /(nwseperation * theYield);
    var E = echipping +eseperation + etransport + ecombustion;
    var Eelec = E * afelec / nelec;
    var Eheat = E * afheat / nheat;

   
    
    
    
    
    var ghgSavedHeat = 100 * ( 1 - Eheat / efossil_heat);
    var ghgsaved_elec = 100 * ( 1 - Eelec / efossil_elec)
    var ghgSavedTotal = (afheat * ghgSavedHeat) + ( afelec *  ghgsaved_elec);
    return (outputheat + 3.6 * outputelec) * (efossil_heat * afheat + efossil_elec * afelec)*(ghgSavedTotal /100) /1000;



}


function getCheatValue(th,to){

    if (th ==0)
        th = 90;

    if ( th > 150)
        return (th- to)/(th + 273);
    else
        return 0.3546;
}