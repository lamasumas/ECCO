 /*jshint esversion:  8*/

 var fs = require("fs");
 var mongo = require("mongoose");
 mongo.connect("mongodb://localhost/ecco",  { useNewUrlParser: true });
 //docmongo.connect("mongodb://54.91.147.51:27017",  { useNewUrlParser: true });

 var generalJSON;
  mongo.model("country").find({country:"EU-28"}, function(erro, theCountry)
 {
     generalJSON = theCountry[0];
 }.bind(this));

/**
 * This exported method will calculate the value of the co2, trees and houses of the wood chips
 */
exports.calculateWoodChips = function (res, countryName,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
    moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
   wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation){
    
    mongo.model("country").findOne({country: countryName},  function(err, countryJSON)
    {
        

    countryJSON = countryJSON[0];
    console.log(countryJSON);
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
   
      res.send(co2.toString() + "@" + trees.toString() + "@" + houses.toString());
        
    });
   };

/**
 * This exported method will calculate the value of the co2, trees and houses of the manure
 */
   exports.calculateManure = function (res, countryName, outputelec, outputheat,heatCombustionManure,electricityCombustionManure, kmTruckManure, annualManureWeightn, usefulC, 
       surroundingsC,manure_loss, percentege_feedstock_manure_loss, transported_manures_loss, biogas_loss,
       efficienyManureTransformation, methane_content,co2ProducedManure,ch4ProducedManure, heatDigestionManure,
       electricityTranportedManure, n2oProducedManure, electricityDigestionManure)
   {
    mongo.model("country").findOne({country: countryName},  function(err, countryJSON)
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
       res.send(co2.toString() + "@" + trees.toString() + "@" + houses.toString());
   });}; 

 

/**
 * This exported method will calculate the value of the co2, trees and houses of the wood pellets
 */
exports.calculateWoodPellets = function(res, countryName,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
    moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
    sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication){

        mongo.model("country").findOne({country: countryName},  function(err, countryJSON)
        {
           
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
    res.send(co2.toString() + "@" + trees.toString() + "@" + houses.toString());

 });};

/**
 * This exported method will calculate the value of the co2, trees and houses of the wind/pv/hydro
 */
exports.calculateWind = function (res, countryName, typeOfEnergy, yearProduction) {
    mongo.model("country").findOne({country: countryName},  function(err, countryJSON)
    {
       
    var co2 = 0;
       switch(typeOfEnergy)
       {
           case "wind":
                   var esaved_wind = getJSONData(countryJSON, "esaved_wind");
                   co2 = (yearProduction * esaved_wind) / 1000;
                   break;
           case "pV":
                   var esaved_PV = getJSONData(countryJSON, "esaved_PV");
                   co2 = (yearProduction * esaved_PV) / 1000;
                   break;
           case "Hydroelectric":
                   var esaved_hydro = getJSONData(countryJSON, "esaved_hydro");
                    co2 = (yearProduction * esaved_hydro) / 1000;
                    break;
       }

       var trees = (co2 * 1000) / getJSONData(countryJSON, "etree");
       var houses = (co2 * 1000) / getJSONData(countryJSON, "ehouse");
       
       res.send(co2.toString() + "@" + trees.toString() + "@" + houses.toString());
});};

/**
 * This will return value used in the formulas
 * @param {float} th, useful temperature
 * @param {float} to, surroung temperature 
 */
function getCheatValue(th,to){

    if (th ==0)
        th = 90;

    if ( th > 150)
        return (th- to)/(th + 273);
    else
        return 0.3546;
}

/**
 * This will check if the value exist in the json and returned.
 * If the value is missing it will search in the general json (EU-28) and return that instead
 * 
 * @param {string} countryJSON, selected json country
 * @param {string} desiredData , Desired key of the country json
 */
function getJSONData(countryJSON ,desiredData){

    var theData = parseFloat(countryJSON[desiredData]);
    if(isNaN(theData))
        return parseFloat(generalJSON[desiredData]);
    else
        return theData;
    
}


