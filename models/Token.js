class Token{
    constructor(header,claims,signature){
        this.header = header;
        this.claims = claims;
        this.signature = signature;
    }
    toString(){
        return this.header+'.'+this.claims+'.'+this.signature;
    }
}
module.exports = Token;