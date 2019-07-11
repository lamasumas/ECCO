/*jshint esversion: 6 */

//Some necessary modules
var express = require("express");
var fs = require("fs");
var bodyParser = require("body-parser");
var app = express();
 
var mongo = require("mongoose");
//mongo.connect("mongodb://mongo/ecco",  { useNewUrlParser: true });
//mongo.connect("mongodb://localhost/ecco",  { useNewUrlParser: true });
mongo.connect("mongodb+srv://GHG:GHG@ecco-f52xt.mongodb.net/Ecco?retryWrites=true&w=majority",  { useNewUrlParser: true });
var db = mongo.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
    var countryScheme = new mongo.Schema({
    country: String,
    eelec: String,
    esaved_PV: String,
    esaved_wind: String,
    esaved_hydro: String,
    eheat: String,
    efuel: String,
    egas: String,
    fCH4_CO2: String,
    fN2O_CO2: String,
    nvehicle_Dry: String,
    etransport_exhaust_Dry: String,
    nvehicle_Liquid: String,
    etransport_exhaust_Liquid: String,
    LHV_Demolitoion_Wood: String,
    LHV_Sawdust: String,
    LHV_Methane: String,
    etree: String,
    ehouse: String
});

    var Country = mongo.model("country", countryScheme, "country");
    module.exports = mongo.model("country");

    /*Country.deleteMany({}, function(erro, theCountry)  {
        console.log("Database cleaned"); 
    });*/
/*
   fs.readdir(__dirname+"/json", (err, files) => {
            if(err){
                console.log("Error while loading the json files");
            }
            try{
                
                files.forEach(x =>  new Country(JSON.parse(fs.readFileSync(__dirname+"/json/"+x))).save(function(err, theCountry) {
                    console.log("element added: "+ theCountry);
                }));
              
            }
            catch(error){
                console.log(error);
            }
        } );*/


//Read the json files
//readData();
var formulas = require("./Formulas.js");


app.set('view engine', 'ejs');

app.use(bodyParser.json());
//Declare where the static elements are stored (html, css, js(client_side))
app.use(express.static("public"));

//Declare route for the get/post request of the formula calculation

app.use("/formulas", formulas);


//Pre-loading of the language files beforehand
var englishLanguage = JSON.parse(fs.readFileSync("languages/english.json"));
var spanishLanguage = JSON.parse(fs.readFileSync("languages/spanish.json"));
var frenchLanguage = JSON.parse(fs.readFileSync("languages/french.json"));

//Send to the client the  main window template in french 
app.get('/', function (req, res) {

    console.log("English");
    res.render("index.ejs", englishLanguage );
 });

//Send to the client the  main window template in french 
 app.get('/spanish', function (req, res) {
    console.log("Spanish");
    res.render("index.ejs", spanishLanguage );
 });

//Send to the client the  main window template in french 
 app.get('/french', function (req, res) {
    console.log("French");
    res.render("index.ejs", frenchLanguage );
 });


 //Send the databaseuserview template to the client side
 app.get('/databaseUserView', function (req, res) {
    console.log("Database user view");
    mongo.model("country").find({}, function(err, names) 
    {

        res.render("databaseView.ejs", {countries: names});
    });
});



 //A get request of the client, in order to get the country names
app.get('/index.html/countries', function (req, res) {
    
    mongo.model("country").find({}, "country", function(err, names) {
    var data = "";
    names.forEach(name => data+="@"+ name.country);
    res.send(data);
    });

    

       
});

//The server start listening for more requests
 var server = app.listen(8081);
       


   

    
});




