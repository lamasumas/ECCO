/*jshint esversion: 6 */
var loadedJsons;
var generalJSON;
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
    country = getCountry(theCountrySelected);
		var co2 = 0;
		switch(typeOfEnergy)
		{
			case "wind":
					var esaved_wind = getJSONData(country, "esaved_wind");
					co2 = (yearProduction * esaved_wind) / 1000;
					break;
			case "pV":
					var esaved_PV = getJSONData(country, "esaved_PV");
					co2 = (yearProduction * esaved_PV) / 1000;
					break;
			case "Hydroelectric":
					var esaved_hydro = getJSONData(country, "esaved_hydro");
					 co2 = (yearProduction * esaved_hydro) / 1000;
					 break;
        }


        var trees = (co2 * 1000) / getJSONData(country, "etree");
        var houses = (co2 * 1000) / getJSONData(country, "ehouse");
        res.send( co2.toString() + "@" + trees.toString() + "@" + houses.toString());
        
 });

 app.get("/index.html/WoodChips", function(req, res){

    var countryJSON = getCountry(req.query.country);
    var outputheat = parseFloat(req.query.outputheat);
    var outputelec = parseFloat(req.query.outputelec);
    var usefulC = parseFloat(req.query.usefulC);
    var surroundingsC = parseFloat(req.query.surroundingsC);
    var tonsTransportedChipsYear = parseFloat(req.query.tonsTransportedChipsYear);
    var moistwoodParam = parseFloat(req.query.moistwoodParam);
    var moistchipsParam = parseFloat(req.query.moistchipsParam);
    var feedstock_chips_loss = parseFloat(req.query.feedstock_chips_loss);
    var electricityChipping = parseFloat(req.query.electricityChipping);
    var transported_chips_loss = parseFloat(req.query.transported_chips_loss);
    var seperated_chips_loss = parseFloat(req.query.seperated_chips_loss);
    var chips_loss = parseFloat(req.query.chips_loss);
    var wood_chips_loss = parseFloat(req.query.wood_chips_loss);
    var kmTruckTransport_chips = parseFloat(req.query.kmTruckTransport_chips);
    var heatTransportedChips = parseFloat(req.query.heatTransportedChips);
    var electricityTransportedChips = parseFloat(req.query.electricityTransportedChips);
    var electricityMegneticSeparation = parseFloat(req.query.electricityMegneticSeparation);





    var theRespose = calculateWoodChips(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
        moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
       wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation);
    
    res.send(theRespose);
 });



 app.get("/index.html/WoodPellets", function(req, res){

    
    var countryJSON = getCountry(req.query.country);
    var outputheat = parseFloat(req.query.outputheat);
    var outputelec = parseFloat( req.query.outputelec);
    var usefulC = parseFloat(req.query.usefulC);
    var surroundingsC = parseFloat(req.query.surroundingsC);
    var tonsTransportedPelletsYear = parseFloat(req.query.tonsTransportedPelletsYear);
    var moistpelletsParam = parseFloat(req.query.moistpelletsParam);
    var moistFeedstockSawdustParam = parseFloat(req.query.moistFeedstockSawdustParam);
    var pellets_loss = parseFloat(req.query.pellets_loss);
    var electricityPelletization = parseFloat(req.query.electricityPelletization);
    var transported_pellets_loss = parseFloat(req.query.transported_pellets_loss);
    var percentege_feedstock_sawdust_loss = parseFloat(req.query.percentege_feedstock_sawdust_loss);
    var sawdust_loss = parseFloat(req.query.sawdust_loss);
    var kmTruckTransport_pellets = parseFloat(req.query.kmTruckTransport_pellets);
    var heatTransportedPellets = parseFloat(req.query.heatTransportedPellets);
    var electricityTransportedPellets = parseFloat(req.query.electricityTransportedPellets);
    var heatPelletication = parseFloat(req.query.heatPelletication);

    var data = calculateWoodPellets(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
        moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
        sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication);
        
    console.log("Data: " + data);
    res.send(data.toString());
 });


 function getCountry(name){
    for( i = 0; i< loadedJsons.length; i++)
    {
        if (loadedJsons[i].country == name)
        {
            return loadedJsons[i] ;
            
        }
    }
 }
 
 function readData(){
               
    fs.readFile(__dirname+"/json/Countries.json", (err, fileData) => {
        if(err){
            console.log("Error while loading the json files");
        }
        try{
            
            loadedJsons = JSON.parse(fileData);
            generalJSON = getCountry("EU-28");
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



 function calculateWoodPellets(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
    moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
    sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication){


    console.log("CALCULATING WOOD CHIPS DATA");
//eelec = telec
//eheat = thear
    var pgas_combustion = heatTransportedPellets;
    var pelec_combustion = electricityTransportedPellets;
    var efossil_heat = getJSONData(countryJSON , "eheat");
    var efossil_elec = getJSONData(countryJSON, "eelec")/3.6;
    var celec = 1;
    var egas = getJSONData(countryJSON, "egas" );
    var efuel = getJSONData(countryJSON, "efuel");
    var nvehical = getJSONData(countryJSON,"nvehicle_Dry");
    var lengthtransport = ( kmTruckTransport_pellets== 0)? 50:  kmTruckTransport_pellets;
    var inflow = tonsTransportedPelletsYear;
    var cheat =  getCheatValue(usefulC, surroundingsC);
    var moistpellets = (moistpelletsParam == 0)?6:moistpelletsParam;
    var moistfeedstock_sawdust = (moistFeedstockSawdustParam == 0)? 40: moistFeedstockSawdustParam ;
    var lhv = getJSONData(countryJSON, "LHV_Sawdust");
    var pelec_pelletization = (electricityPelletization == 0)?  115 : electricityPelletization ;
    var pgas_pelletization = heatPelletication;
    var nwfeedstock = 1- percentege_feedstock_sawdust_loss /100;
    var telec = efossil_elec;


    var nheat = ( inflow == 0 ) ? 0.45 : outputheat / ( inflow * ( 1 - moistpellets / 100 )* lhv);
    var nelec = (inflow == 0) ? 0.45 : 3.6 * outputelec / ( inflow * (1 - moistpellets/ 100) * lhv);
    var afheat = cheat * nheat / ( celec* nelec + cheat * nheat) ;
    var afelec = celec * nelec / (celec * nelec +  cheat * nheat);
    
    var nwsawdust = 1 - sawdust_loss /100;
    var nwpelletization = nwsawdust * ( 1 - moistfeedstock_sawdust / 100) / (1 - moistpellets / 100);
    var nwconvertion = 1- pellets_loss /100;
    var nwtransport = 1- transported_pellets_loss /100;

    var nwtotal =  nwfeedstock * nwpelletization  * nwtransport * nwconvertion;
    var theYield = 1000 * nwtotal * (1 - moistpellets / 100) * lhv;
  

    var eCO2 = 0;
    var eCH4 = 0;
    var eN2O = 0;
    var fCH4_CO2 = getJSONData(countryJSON, "fCH4_CO2");
    var fN2O_CO2 = getJSONData(countryJSON,"fN2O_CO2");
    
    var edirect_combustion = 1000 *(eCO2 + eCH4 * (fCH4_CO2) + eN2O * (fN2O_CO2)) ;

    var etransport_exhaust = getJSONData(countryJSON,"etransport_exhaust_Dry");
    
    var epelltization = nwfeedstock * ( 3.6 * pelec_pelletization * telec + pgas_pelletization* egas)/theYield;
    var ecombustion = (nwfeedstock * nwpelletization * nwtransport)* (edirect_combustion + 3.6* pelec_combustion* telec + pgas_combustion *egas) /theYield;
    var etransport = ( nwfeedstock  * nwpelletization) * lengthtransport  *( nvehical * efuel + etransport_exhaust) / theYield;
    
    var E = epelltization + etransport + ecombustion;
    var Eelec = E * afelec ;
    var Eheat = E * afheat ;
    

    var ghgSavedHeat = 100 * ( efossil_heat - Eheat / nheat ) / efossil_heat ;
    var ghgsaved_elec = 100 * ( efossil_elec - Eelec / nelec) / efossil_elec ;
    var ghgSavedTotal = (afheat * ghgSavedHeat) + ( afelec *  ghgsaved_elec);
    var co2 =  (outputheat + 3.6 * outputelec) * (efossil_heat * afheat + efossil_elec * afelec)*(ghgSavedTotal /100) /1000;
    

    var trees = (co2 * 1000) / getJSONData(countryJSON, "etree");
    var houses = (co2 * 1000) / getJSONData(countryJSON, "ehouse");
    return co2.toString() + "@" + trees.toString() + "@" + houses.toString();

 }





 function calculateWoodChips(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
     moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
    wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation){

    console.log("CALCULATING WOOD CHIPS DATA");

//eelec = telec
//eheat = thear

    var pgas_combustion = heatTransportedChips;
    var pelec_combustion = electricityTransportedChips;
    var pelec_separation = (electricityMegneticSeparation==0)? 0.6: electricityMegneticSeparation;
    var efossil_heat = getJSONData(countryJSON , "eheat");
    var efossil_elec = getJSONData(countryJSON, "eelec")/3.6;
    var celec = 1;
    var egas = getJSONData(countryJSON, "egas" );
    var efuel = getJSONData(countryJSON, "efuel");
    var nvehical = getJSONData(countryJSON, "nvehicle_Dry");
    var lengthtransport = ( kmTruckTransport_chips== 0)? 50:  kmTruckTransport_chips;
    var inflow = tonsTransportedChipsYear;
    var cheat =  getCheatValue(usefulC, surroundingsC);
    var moistchips = (moistchipsParam == 0)? 33: moistchipsParam ;
    var moistwood = (moistwoodParam == 0)? 50: moistwoodParam;
    var lhv = getJSONData(countryJSON, "LHV_Demolitoion_Wood");
    var pelec_chipping = (electricityChipping == 0)?  75 : electricityChipping ;
    var nwfeedstock = 1- feedstock_chips_loss /100;
    var telec = efossil_elec;


    var nheat = ( inflow == 0 ) ? 0.45 : outputheat / ( inflow * ( 1 - moistchips / 100 )* lhv);
    var nelec = (inflow == 0) ? 0.45 : 3.6 * outputelec / ( inflow * (1 - moistchips/ 100) * lhv);
    var afheat = cheat * nheat / ( celec* nelec + cheat * nheat) ;
    var afelec = celec * nelec / (celec * nelec +  cheat * nheat);
    
    var nwchips = 1- wood_chips_loss /100;
    var nwchipping = nwchips * (1 - moistwood/100) /(1 - moistchips/100);
    var nwconvertion = 1- transported_chips_loss /100;
    var nwtransport = 1- seperated_chips_loss /100;
    var nwseparation = 1- chips_loss /100;

    var nwseperation = 1- chips_loss /100; 
    var nwtotal =  nwfeedstock * nwchipping * nwseparation * nwtransport * nwconvertion;
    var theYield = 1000 * nwtotal * (1 - moistchips / 100) * lhv;
  

    var eCO2 = 0;
    var eCH4 = 0;
    var eN2O = 0;
    var fCH4_CO2 = getJSONData(countryJSON, "fCH4_CO2");
    var fN2O_CO2 = getJSONData(countryJSON, "fN2O_CO2");
    
    var edirect_combustion = 1000 *(eCO2 + eCH4 * (fCH4_CO2) + eN2O * (fN2O_CO2)) ;

    var etransport_exhaust =getJSONData(countryJSON, "etransport_exhaust_Dry");
    
    var echipping = nwfeedstock * (3.6 * pelec_chipping * telec) / theYield;
    var ecombustion = (nwfeedstock * nwchipping* nwseperation * nwtransport)* (edirect_combustion + 3.6* pelec_combustion* telec + pgas_combustion *egas) /theYield;
    var etransport =(nwfeedstock * nwchipping * nwseperation) * lengthtransport  *(nvehical * efuel + etransport_exhaust) / theYield;
    var eseperation = (nwfeedstock * nwchipping)* (3.6* pelec_separation * telec) /(nwseperation * theYield);
    var E = echipping +eseperation + etransport + ecombustion;
    var Eelec = E * afelec / nelec;
    var Eheat = E * afheat / nheat;

    
    var ghgSavedHeat = 100 * ( 1 - Eheat / efossil_heat);
    var ghgsaved_elec = 100 * ( 1 - Eelec / efossil_elec);
    var ghgSavedTotal = (afheat * ghgSavedHeat) + ( afelec *  ghgsaved_elec);
    var co2 =  (outputheat + 3.6 * outputelec) * (efossil_heat * afheat + efossil_elec * afelec)*(ghgSavedTotal /100) /1000;
    

    var trees = (co2 * 1000) / getJSONData(countryJSON, "etree");
    var houses = (co2 * 1000) / getJSONData(countryJSON, "ehouse");

    return co2.toString() + "@" + trees.toString() + "@" + houses.toString();


}


function getJSONData(countryJSON ,desiredData){

    var theData = parseFloat(countryJSON[desiredData]);
    if(isNaN(theData))
        return parseFloat(generalJSON[desiredData]);
    else
        return theData;
    
}


function getCheatValue(th,to){

    if (th ==0)
        th = 90;

    if ( th > 150)
        return (th- to)/(th + 273);
    else
        return 0.3546;
}