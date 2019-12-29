const TokenHeader = require('../models/token/TokenHeader');
const TokenPayload = require('../models/token/TokenPayload');
const Token = require('../models/token/Token');

class TokenBuilder{
    constructor(){
        this.token = new Token();
    }
    buildHeader(alg,typ){
        this.token.header = new TokenHeader(alg,typ);
    }
    buildPayload(accountId,user,permission,expiration){
        this.token.payload = new TokenPayload(accountId,user,permission,expiration);
    }
    buildSignature(signature){
        this.token.signature = signature;
    }
    getToken(){
        return this.token;
    }
}
module.exports = TokenBuilder;