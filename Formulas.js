/*jshint esversion: 6 */

var fs = require("fs");
var express = require('express');
var router = express.Router();
var loadedJsons;
var generalJSON;

readData();

router.get("/Irradiation", function(req, res) 
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


 router.get("/WoodChips", function(req, res){

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



router.get("/WoodPellets", function(req, res){

    
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




 router.get("/Manure", function(req, res){

    var countryJSON = getCountry(req.query.country);
    var outputelec = parseFloat(req.query.outputelec);
    var outputheat = parseFloat(req.query.outputheat);
    var heatCombustionManure = parseFloat(req.query.heatCombustionManure);
    var electricityCombustionManure = parseFloat(req.query.electricityCombustionManure);
    var kmTruckManure = parseFloat(req.query.kmTruckManure);
    var annualManureWeight = parseFloat(req.query.annualManureWeight);
    var usefulC = parseFloat(req.query.usefulC);
    var surroundingsC = parseFloat(req.query.surroundingsC);
    var manure_loss= parseFloat(req.query.manure_loss);
    var percentege_feedstock_manure_loss = parseFloat(req.query.percentege_feedstock_manure_loss);
    var transported_manures_loss= parseFloat(req.query.transported_manures_loss);
    var biogas_loss = parseFloat(req.query.biogas_loss);
    var efficienyManureTransformation = parseFloat(req.query.efficienyManureTransformation);
    var methane_content = parseFloat(req.query.methane_content);
    var co2ProducedManure = parseFloat(req.query.co2ProducedManure);
    var ch4ProducedManure = parseFloat(req.query.ch4ProducedManure);
    var heatDigestionManure = parseFloat(req.query.heatDigestionManure); 
    var electricityTranportedManure= parseFloat(req.query.electricityTranportedManure);
    var n2oProducedManure = parseFloat(req.query.n2oProducedManure);
    var electricityDigestionManure = parseFloat(req.query.electricityDigestionManure);

    var data = calculateManure(countryJSON, outputelec, outputheat,heatCombustionManure,electricityCombustionManure, kmTruckManure, annualManureWeight, usefulC, 
        surroundingsC,manure_loss, percentege_feedstock_manure_loss, transported_manures_loss, biogas_loss,
        efficienyManureTransformation, methane_content,co2ProducedManure,ch4ProducedManure, heatDigestionManure,
        electricityTranportedManure, n2oProducedManure, electricityDigestionManure);
    res.send(data);
    
});






//export this router to use in our index.js
module.exports = router;


function getJSONData(countryJSON ,desiredData){

    var theData = parseFloat(countryJSON[desiredData]);
    if(isNaN(theData))
        return parseFloat(generalJSON[desiredData]);
    else
        return theData;
    
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



 function calculateWoodPellets(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
    moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
    sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication){


    console.log("CALCULATING WOOD PELLETS DATA");
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


function calculateManure(countryJSON, outputelec, outputheat,heatCombustionManure,electricityCombustionManure, kmTruckManure, annualManureWeightn, usefulC, 
    surroundingsC,manure_loss, percentege_feedstock_manure_loss, transported_manures_loss, biogas_loss,
    efficienyManureTransformation, methane_content,co2ProducedManure,ch4ProducedManure, heatDigestionManure,
    electricityTranportedManure, n2oProducedManure, electricityDigestionManure)
{

    var pgas_combustion = heatCombustionManure;
    var pellec_combustion = electricityCombustionManure;
    var efossil_heat = getJSONData(countryJSON , "eheat");
    var efossil_elec = getJSONData(countryJSON, "eelec")/3.6;
    var celec = 1;
    var egas = getJSONData(countryJSON, "egas" );
    var efuel = getJSONData(countryJSON, "efuel");
    var nvehical = getJSONData(countryJSON,"nvehicle_Liquid");
    var lengthtransport = ( kmTruckManure== 0)? 50:  kmTruckManure;
    var inflow = annualManureWeightn;
    var cheat =  getCheatValue(usefulC, surroundingsC);
    var lhv = getJSONData(countryJSON, "LHV_Methane");
    
    var nwfeedstock = 1- percentege_feedstock_manure_loss /100;
    var telec = efossil_elec;

    var ratioCH4 = ( methane_content == 0)? 55 : methane_content; 
    var denCH4 = 0.71;
   
    var nwdigestion = (efficienyManureTransformation  == 0)?21: efficienyManureTransformation;
    var nwtransport = 1- manure_loss /100;
    var nwstorage = 1- transported_manures_loss / 100;
    var nwconvertion = 1 - biogas_loss / 100;
    var nwtotal = (( nwfeedstock * nwtransport * nwconvertion * nwstorage * nwdigestion) == nwdigestion)? nwdigestion*0.95: nwfeedstock * nwtransport * nwconvertion * nwstorage * nwdigestion;

    var nheat =  ( inflow == 0)? 45: 1000* outputheat / (inflow * nwfeedstock * nwtransport * nwstorage * nwdigestion * denCH4 * lhv * ratioCH4 /100);
    var nelec = (inflow == 0) ? 0.35 : 3600 * outputelec / (inflow * nwfeedstock * nwtransport * nwstorage * nwdigestion * denCH4* lhv * ratioCH4 /100);
    var afheat = cheat * nheat / ( celec* nelec + cheat * nheat) ;
    var afelec = celec * nelec / (celec * nelec +  cheat * nheat);
    
  
    var theYield = nwtotal * (ratioCH4 / 100) * denCH4 *lhv;
  
    var eCO2_combustion = 0;
    var eCH4_combustion = 0;
    var eN2O_combustion = 0;
    var eCO2_storage = co2ProducedManure;
    var eCH4_storage = ch4ProducedManure;
    var eN2O_storage = n2oProducedManure;
    var fCH4_CO2 = getJSONData(countryJSON, "fCH4_CO2");
    var fN2O_CO2 = getJSONData(countryJSON,"fN2O_CO2");

    var pgas_digestion = heatDigestionManure;
    var pelec_storage = electricityTranportedManure;
    var pelec_digestion = electricityDigestionManure;
    var edirect_combustion = 1000 * (eCO2_combustion + eCH4_combustion * fCH4_CO2 + eN2O_combustion * fN2O_CO2);
    var etransport_exhaust = getJSONData(countryJSON,"etransport_exhaust_Dry");
    var eCH4_leakage = denCH4 *nwdigestion * ratioCH4/10000;
    var edirect_digestion = 1000* eCH4_leakage * fCH4_CO2;
    var edirect_storage = 1000 * ( eCO2_storage + eCH4_storage * fCH4_CO2 + eN2O_storage * fN2O_CO2); 
   
    var ecombustion = (nwfeedstock * nwtransport * nwstorage * nwdigestion) * (edirect_combustion + 3.6 * pellec_combustion * telec + pgas_combustion * egas) /theYield;
    var etransport = nwfeedstock * lengthtransport * ( nvehical * efuel + etransport_exhaust)/ theYield;
    var edigestion = (nwfeedstock * nwtransport * nwstorage)* (edirect_digestion + 3.6 * pelec_digestion * telec + pgas_digestion *egas)/ theYield;
    var estorage = (nwfeedstock * nwtransport ) * (edirect_storage + 3.6 * pelec_storage * telec) / theYield;
   
    var E = estorage + edigestion +etransport + ecombustion;
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


function getCheatValue(th,to){

    if (th ==0)
        th = 90;

    if ( th > 150)
        return (th- to)/(th + 273);
    else
        return 0.3546;
}
