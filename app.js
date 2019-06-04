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
        catch(err){
            console.log(err);
        }
    } );
 }


 var server = app.listen(8081, function(){
     var host= server.address().address;
     var port = server.address().port;
 });