const Token = require('../models/Token');

class TokenFactory{

    constructor(){}

    make(headerString,claimString,signature){
        return new Token(headerString,claimString,signature);
    }

}
module.exports = TokenFactory;