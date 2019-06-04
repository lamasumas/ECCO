
module.exports = {
    listFiles: function()
    {    

        var fs = require('fs');
        fs.readdir(__dirname+"/json", function (err, files) {
            //handling error
            if (err) {
                return console.log('Unable to scan directory: ' + err);
            } 
            //listing all files using forEach
            console.log(files);
        });
    }
};
    
