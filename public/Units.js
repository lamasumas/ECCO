

class Unit{

    constructor()
    {}
        getValue(value,theActualUnit, desireUnit ){
            
            console.log(this.wants[desireUnit].calculate(this.is[theActualUnit].calculate(value) ));
            return this.wants[desireUnit].calculate(this.is[theActualUnit].calculate(value) );
        }
    
    }
    
    
    Unit.prototype.is = {};
    Unit.prototype.wants = {};
    Unit.prototype.is.K = { 
        calculate: function(value){
            return 1000 * value;
        }
    
    };
    Unit.prototype.is.Dm = { 
        calculate: function(value){
            return 10 * value;
        }
    
    };
    Unit.prototype.is.hm = { 
        calculate: function(value){
            return 100 * value;
        }
    
    };

    Unit.prototype.is.Ton = { 
        calculate: function(value){
            return 1000000 * value;
        }
    };

    Unit.prototype.is.M = { 
        calculate: function(value){
            return 1000000 * value;
        }
    };

    Unit.prototype.is.G = { 
        calculate: function(value){
            return 1000000000 * value;
        }
    };

    
    Unit.prototype.is.simple = { 
        calculate: function(value){
            return value;
        }
    
    };
    
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
    }
    
    
    