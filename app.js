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

 app.get("/index.html/Irradiation", function(req, res) {
    var theCountrySelected = req.query.country;
            
    fs.readFile(__dirname+"/json/Countries.json", (err,fileData) => {
        if(err){
            console.log("Error while loading the json files");
        }
        try{
            var jsons= JSON.parse(fileData);
            var theSelectedCountryData;
            jsons.forEach((item) => {
                if(item.name == theCountrySelected)
                {
                    theSelectedCountryData = item;
                    break;
                }
            });


            res.send(names);
        }
        catch(err){
            console.log(err);
        }

    });


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