/*jshint esversion: 6 */
//Required modules
var fs = require("fs");
var express = require('express');
var calculator = require("./calculator.js");
var router = express.Router();

var loadedJsons;

//Read all the json again
//readData();

//This will handle the get request for the pv/wind/hidro calculation
router.get("/Irradiation", function(req, res) 
{
   var theCountrySelected = req.query.country;
   var typeOfEnergy = req.query.typeOfEnergy;
   var yearProduction = req.query.yearProduction;
   var countryJSON = getCountry(theCountrySelected);
   var result = calculator.calculateWind( countryJSON, typeOfEnergy, yearProduction);
   res.send( result);
       
});

//This will handle the get request for the wood chips calculation
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





    var theRespose = calculator.calculateWoodChips(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
        moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
       wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation);
    
    res.send(theRespose);
 });


//This will handle the get request for the wood pellets calculation
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

    var data = calculator.calculateWoodPellets(countryJSON,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
        moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
        sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication);
        
    console.log("Data: " + data);
    res.send(data.toString());
 });



//This will handle the get request for the manure calculation
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

    var data = calculator.calculateManure(countryJSON, outputelec, outputheat,heatCombustionManure,electricityCombustionManure, kmTruckManure, annualManureWeight, usefulC, 
        surroundingsC,manure_loss, percentege_feedstock_manure_loss, transported_manures_loss, biogas_loss,
        efficienyManureTransformation, methane_content,co2ProducedManure,ch4ProducedManure, heatDigestionManure,
        electricityTranportedManure, n2oProducedManure, electricityDigestionManure);
    res.send(data);
    
});


//export this router to use in our index.js
module.exports = router;


 
/**
 * This method will return the country json requested
 * 
 * @param {String} name, name of the country
 */
function getCountry(name){
    for( i = 0; i< loadedJsons.length; i++)
    {
        if (loadedJsons[i].country == name)
        {
            return loadedJsons[i] ;
            
        }
    }
 }
 
/**
  * This method will load all the json and it will set up the one array of json and the general european json
  */
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




