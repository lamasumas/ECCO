/*jshint esversion: 6 */
var loadedJsons;
var generalJSON;

//Some necessary modules
var express = require("express");
var fs = require("fs");
var app = express();
//Read the json files
readData();
var formulas = require("./Formulas.js");

//Declare where the static elements are stored (html, css, js(client_side))
app.use(express.static("public"));

//Declare route for the get/post request of the formula calculation
app.use("/formulas", formulas);


app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 });

 //A get request of the client, in order to get the country names
app.get('/index.html/countries', function (req, res) {
    
   var names ="";
    loadedJsons.forEach((item) => {
        names += item.country +"@";
    });
    res.send(names);

       
});


 
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
            generalJSON = getCountry("EU-28");
        }
        catch(error){
            console.log(error);
        }
    } );
 }


 var server = app.listen(8081);

