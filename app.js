/*jshint esversion: 6 */
var loadedJsons;
var generalJSON;
var express = require("express");
var fs = require("fs");
var app = express();
readData();
var formulas = require("./Formulas.js");

app.use(express.static("public"));



app.use("/formulas", formulas);


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

