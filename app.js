var express = require("express");
var app = express();
var fileManager = require(__dirname+"/FileManager.js");
app.use(express.static("public"));

app.get('/index.html', function (req, res) {
    res.sendFile( __dirname + "/" + "index.htm" );
 });

app.get('/index.html/countries', function (req, res) {
    fileManager.listFiles();
    
 });

 var server = app.listen(8081, function(){
     var host= server.address().address;
     var port = server.address().port;
 })