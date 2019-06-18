/*jshint esversion: 6 */

//Some necessary modules
var express = require("express");
var fs = require("fs");
var app = express();

console.log("Eduardo Lamas 1");
var mongo = require("mongoose");
mongo.connect("mongodb://localhost/ecco",  { useNewUrlParser: true });
<<<<<<< HEAD
//mongo.connect("mongodb://54.91.147.51:27017",  { useNewUrlParser: true });
=======
>>>>>>> parent of a21f179... docker compose set up
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

    Country.deleteMany({}, function(erro, theCountry)  {
        console.log("Database cleaned"); 
    });

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
        } );
       


   

    
});


console.log("Eduardo Lamas 3");
//Read the json files
//readData();
var formulas = require("./Formulas.js");

//Declare where the static elements are stored (html, css, js(client_side))
app.use(express.static("public"));

//Declare route for the get/post request of the formula calculation
app.use("/formulas", formulas);


app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.html" );
 });
console.log("Eduardo Lamas 4");
 //A get request of the client, in order to get the country names
app.get('/index.html/countries', function (req, res) {
    
    mongo.model("country").find({}, function(err, names) {
    var data = "";
    names.forEach(name => data+="@"+ name.country);
    console.log("The countries: " + data);
    res.send(data);
    });

    

       
});
mongo.model("country").find({}, function(err, names) {
    var data = "";
    names.forEach(name => data+="@"+ name.country);
    console.log("The countries: " + data);
    console.log("HI");
    });

 var server = app.listen(8081);


