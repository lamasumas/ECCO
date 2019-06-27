


$(document).ready(function(e){
    
    setReferenceTooltips();
});
function setReferenceTooltips()
{
    var settings = {
        "async": true,
        "url": "./references.json",
        "method": "GET"
    };


	$.ajax(settings).done(function(response){
		$(".fa-question-circle").each((x,y) =>{
            
            switch(y.id)
            {
                case "1":
                y.setAttribute("title", "-" + response["2"]);
                break;

                case "1-1":
                y.setAttribute("title", "-"+ response["9"]);
                break;

                case "2":
                y.setAttribute("title", "-" + response["2"]);
                break;

                case "2-1":
                y.setAttribute("title", "-"+ response["10"]);
                break;

                case "3":
                y.setAttribute("title", "-" + response["5"]);
                break;

                case "4":
                y.setAttribute("title", "-" + response["5"]);
                break;

                case "5":
                y.setAttribute("title", "-" + response["4"]);
                break;

                case "6":
                y.setAttribute("title", "-" + response["4"]);
                break;

                case "7":
                y.setAttribute("title", "-" + response["5"]);
                break;

                case "8":
                y.setAttribute("title", "-" + response["5"]);
                break;

                case "9":
                y.setAttribute("title", "-" + response["3"]);
                break;

                case "10":
                y.setAttribute("title", "-" + response["6"]);
                break;

                case "11":
                y.setAttribute("title", "-" + response["5"]);
                break;

                case "12":
                y.setAttribute("title", "- (Click on the question) " + response["7"]);
                y.parentElement.setAttribute("href", response[7]);
                y.parentElement.setAttribute("target", "_blank");
                break;

                case "13-1":
                y.setAttribute("title", "- (Click on the question) " + response["7"]);
                y.parentElement.setAttribute("href", response[7]);
                y.parentElement.setAttribute("target", "_blank");
                break;

                case "13-2":
                y.setAttribute("title", "- (Click on the question) " + response["11"]);
                y.parentElement.setAttribute("href", response[11]);
                y.parentElement.setAttribute("target", "_blank");
                break;


                
            }
            
		});
    });
}

function openTooltip(url){
    window.open(url, '_blank');

}