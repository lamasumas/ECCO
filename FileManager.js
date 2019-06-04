/*jshint esversion: 6 */
var fs = require('fs');
module.exports =  function() {
    var countries;
    return {
        listFiles: function()
        {   

            
            fs.readFile(__dirname+"/json/Countries.json", (err,fileData) => {
                    if(err){
                        console.log("Error while loading the json files");
                    }
                    try{
                        var jsons= JSON.parse(fileData);
                        countries = jsons[0].country;
                    }
                    catch(err){
                        console.log(err);
                    }

                });
            
                
        },
        getCountries: function(){
            return countries;
        }
}};

   
