
var fs = require('fs');
var countries;
module.exports = {
    listFiles: function()
    {   
        fs.readFile(__dirname+"/json/Countries.json", (err,fileData) => {
                if(err){
                    console.log("Error while loading the json files");
                }
                try{
                    countries= JSON.parse(fileData);
                    console.log(jsonFile[0].country);

                }
                catch(err){
                    console.log("an erro");
                }

            });
            
    },
    getCountriesName: function(){



    }
};

   
