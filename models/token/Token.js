class Token{
    constructor(header,payload,signature){
        this.header = null;
        if(header){this.header = header}
        this.payload = null;
        if(payload){this.payload = payload}
        this.signature = null;
        if(signature){this.signature = signature}
    }
    toString(){
        return this.header+'.'+this.payload+'.'+this.signature;
    }
}
module.exports = Token;