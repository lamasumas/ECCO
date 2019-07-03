
/*jshint esversion: 6 */

/**
 * Class used to manage the equivalences between the different possible units
 */
class Unit{

    constructor()
    {}
    /**
     * 
     * @param {Float64Array} value Current value of the input
     * @param {String} theActualUnit Simbol code for the current unit
     * @param {String} desireUnit Simbol code fot the desired unit
     * 
     * This function searchs in two dictionaries of functions with two codes, and apply them to the value so
     * its converted
     */
        getValue(value,theActualUnit, desireUnit ){
            
            console.log(this.wants[desireUnit].calculate(this.is[theActualUnit].calculate(value) ));
            return this.wants[desireUnit].calculate(this.is[theActualUnit].calculate(value) );
        }
    
    }
    
    //Intialization of the dictionary of the functions to get the current unit
    Unit.prototype.is = {};

     //Intialization of the dictionary of the functions to get the desired unit
    Unit.prototype.wants = {};

    //Function added for the generic Kilo 
    Unit.prototype.is.K = { 
        calculate: function(value){
            return 1000 * value;
        }
    
    };

    //Function added for the decameter
        Unit.prototype.is.Dm = { 
        calculate: function(value){
            return 10 * value;
        }
    
    };
    //Function added for the hectometer
    Unit.prototype.is.hm = { 
        calculate: function(value){
            return 100 * value;
        }
    
    };

    //Function added for the Ton 
    Unit.prototype.is.Ton = { 
        calculate: function(value){
            return 1000000 * value;
        }
    };

    //Function added for the generic Mega 
    Unit.prototype.is.M = { 
        calculate: function(value){
            return 1000000 * value;
        }
    };
    //Function added for the generic Giga
    Unit.prototype.is.G = { 
        calculate: function(value){
            return 1000000000 * value;
        }
    };

    //Function added for the generic unit (m, g, ...)
    Unit.prototype.is.simple = { 
        calculate: function(value){
            return value;
        }
    
    };
    
//The same but with desired untis
    Unit.prototype.wants.K ={
        calculate:function(value)
        {
            return value/1000;
        }
    };
    Unit.prototype.wants.Ton ={
        calculate:function(value)
        {
            return value/1000000;
        }
    };
    
    
    Unit.prototype.wants.M ={
        calculate:function(value)
        {
            return value/1000000;
        }
    };
    Unit.prototype.wants.G = {
        calculate: function(value)
        {
            return value/1000000000;
        }
    };
    
    
    