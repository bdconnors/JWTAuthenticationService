class TokenHeader{

    constructor(alg,typ){
        this.alg = null;
        if(alg){this.alg = alg}
        this.typ = null;
        if(typ){this.typ = typ}
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = TokenHeader;