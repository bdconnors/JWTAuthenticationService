class Header{

    constructor(alg,typ){
        this.alg = alg;
        this.typ = typ;
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = Header;