/*jshint esversion: 6 */
//Required modules
var fs = require("fs");
var express = require('express');
var router = express.Router();
setTimeout(function(){
    //do what you need here
var calculator = require("./calculator.js");
//This will handle the get request for the pv/wind/hidro calculation
router.post("/Irradiation", function(req, res) 
{
   var theCountrySelected = req.body.country;
   var typeOfEnergy = req.body.typeOfEnergy;
   var yearProduction = req.body.yearProduction;
   calculator.calculateWind( res, theCountrySelected, typeOfEnergy, yearProduction);
       
});

//This will handle the get request for the wood chips calculation
 router.post("/WoodChips", function(req, res){

    var country = req.body.country;
    var outputheat = parseFloat(req.body.outputheat);
    var outputelec = parseFloat(req.body.outputelec);
    var usefulC = parseFloat(req.body.usefulC);
    var surroundingsC = parseFloat(req.body.surroundingsC);
    var tonsTransportedChipsYear = parseFloat(req.body.tonsTransportedChipsYear);
    var moistwoodParam = parseFloat(req.body.moistwoodParam);
    var moistchipsParam = parseFloat(req.body.moistchipsParam);
    var feedstock_chips_loss = parseFloat(req.body.feedstock_chips_loss);
    var electricityChipping = parseFloat(req.body.electricityChipping);
    var transported_chips_loss = parseFloat(req.body.transported_chips_loss);
    var seperated_chips_loss = parseFloat(req.body.seperated_chips_loss);
    var chips_loss = parseFloat(req.body.chips_loss);
    var wood_chips_loss = parseFloat(req.body.wood_chips_loss);
    var kmTruckTransport_chips = parseFloat(req.body.kmTruckTransport_chips);
    var heatTransportedChips = parseFloat(req.body.heatTransportedChips);
    var electricityTransportedChips = parseFloat(req.body.electricityTransportedChips);
    var electricityMegneticSeparation = parseFloat(req.body.electricityMegneticSeparation);



    calculator.calculateWoodChips( res, country,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedChipsYear,moistwoodParam,
        moistchipsParam,feedstock_chips_loss, electricityChipping, transported_chips_loss, seperated_chips_loss, chips_loss,
       wood_chips_loss, kmTruckTransport_chips, heatTransportedChips,electricityTransportedChips, electricityMegneticSeparation);
    
 });


//This will handle the get request for the wood pellets calculation
router.post("/WoodPellets", function(req, res){

    
    var country = req.body.country;
    var outputheat = parseFloat(req.body.outputheat);
    var outputelec = parseFloat( req.body.outputelec);
    var usefulC = parseFloat(req.body.usefulC);
    var surroundingsC = parseFloat(req.body.surroundingsC);
    var tonsTransportedPelletsYear = parseFloat(req.body.tonsTransportedPelletsYear);
    var moistpelletsParam = parseFloat(req.body.moistpelletsParam);
    var moistFeedstockSawdustParam = parseFloat(req.body.moistFeedstockSawdustParam);
    var pellets_loss = parseFloat(req.body.pellets_loss);
    var electricityPelletization = parseFloat(req.body.electricityPelletization);
    var transported_pellets_loss = parseFloat(req.body.transported_pellets_loss);
    var percentege_feedstock_sawdust_loss = parseFloat(req.body.percentege_feedstock_sawdust_loss);
    var sawdust_loss = parseFloat(req.body.sawdust_loss);
    var kmTruckTransport_pellets = parseFloat(req.body.kmTruckTransport_pellets);
    var heatTransportedPellets = parseFloat(req.body.heatTransportedPellets);
    var electricityTransportedPellets = parseFloat(req.body.electricityTransportedPellets);
    var heatPelletication = parseFloat(req.body.heatPelletication);

    var data = calculator.calculateWoodPellets( res, country,outputheat, outputelec, usefulC, surroundingsC, tonsTransportedPelletsYear,moistpelletsParam,
        moistFeedstockSawdustParam, pellets_loss, electricityPelletization, transported_pellets_loss, percentege_feedstock_sawdust_loss,
        sawdust_loss, kmTruckTransport_pellets, heatTransportedPellets,electricityTransportedPellets,heatPelletication);
    
 });



//This will handle the get request for the manure calculation
 router.post("/Manure", function(req, res){

    var country = req.body.country;
    var outputelec = parseFloat(req.body.outputelec);
    var outputheat = parseFloat(req.body.outputheat);
    var heatCombustionManure = parseFloat(req.body.heatCombustionManure);
    var electricityCombustionManure = parseFloat(req.body.electricityCombustionManure);
    var kmTruckManure = parseFloat(req.body.kmTruckManure);
    var annualManureWeight = parseFloat(req.body.annualManureWeight);
    var usefulC = parseFloat(req.body.usefulC);
    var surroundingsC = parseFloat(req.body.surroundingsC);
    var manure_loss= parseFloat(req.body.manure_loss);
    var percentege_feedstock_manure_loss = parseFloat(req.body.percentege_feedstock_manure_loss);
    var transported_manures_loss= parseFloat(req.body.transported_manures_loss);
    var biogas_loss = parseFloat(req.body.biogas_loss);
    var efficienyManureTransformation = parseFloat(req.body.efficienyManureTransformation);
    var methane_content = parseFloat(req.body.methane_content);
    var co2ProducedManure = parseFloat(req.body.co2ProducedManure);
    var ch4ProducedManure = parseFloat(req.body.ch4ProducedManure);
    var heatDigestionManure = parseFloat(req.body.heatDigestionManure); 
    var electricityTranportedManure= parseFloat(req.body.electricityTranportedManure);
    var n2oProducedManure = parseFloat(req.body.n2oProducedManure);
    var electricityDigestionManure = parseFloat(req.body.electricityDigestionManure);

    var data = calculator.calculateManure(res, country, outputelec, outputheat,heatCombustionManure,electricityCombustionManure, kmTruckManure, annualManureWeight, usefulC, 
        surroundingsC,manure_loss, percentege_feedstock_manure_loss, transported_manures_loss, biogas_loss,
        efficienyManureTransformation, methane_content,co2ProducedManure,ch4ProducedManure, heatDigestionManure,
        electricityTranportedManure, n2oProducedManure, electricityDigestionManure);
    
});
}, 500);

//export this router to use in our index.js
module.exports = router;


 

