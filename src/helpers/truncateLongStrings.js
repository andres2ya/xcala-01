export const truncateLongString=String.prototype.truncateLongString=String.prototype.truncateLongString||
    function(characters) {
        return(this.length>characters)? this.substr(0,characters-1)+'...':this;
    };