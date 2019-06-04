/*jshint esversion: 6 */
var express = require("express");
var fs = require("fs");
var app = express();
app.use(express.static("public"));

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 });

app.get('/index.html/countries', function (req, res) {
    
            
    fs.readFile(__dirname+"/json/Countries.json", (err,fileData) => {
        if(err){
            console.log("Error while loading the json files");
        }
        try{
            var names = "";
            var jsons= JSON.parse(fileData);
            jsons.forEach((item) => {
                names += item.country +"@";
            });
            res.send(names);
        }
        catch(err){
            console.log(err);
        }

    });
 });

 var server = app.listen(8081, function(){
     var host= server.address().address;
     var port = server.address().port;
 });