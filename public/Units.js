

export class Unit{

constructor(value,theActualUnit)
{
    this.value = value;
    this.theActualUnit = theActualUnit;
}
    getValue ( desireUnit ){
        
        
        return this.wants[desireUnit].calculate(this.is[this.theActualUnit].calculate(this.value) );
    }

}


Unit.prototype.is = {};
Unit.prototype.wants = {};
Unit.prototype.is.km = { 
    calculate: function(value){
        return 1000 * value;
    }

};
Unit.prototype.is.dm = { 
    calculate: function(value){
        return 10 * value;
    }

};
Unit.prototype.is.hm = { 
    calculate: function(value){
        return 100 * value;
    }

};
Unit.prototype.is.m = { 
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


