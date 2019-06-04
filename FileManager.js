
function FileManager()
{   

    var fs = require('fs');
    var directory = "json/";
    this.listFiles = function ()
    {    
        var files = fs.readdirSync(directory);
        alert(files);
    }
        
    
}