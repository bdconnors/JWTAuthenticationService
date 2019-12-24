const Credential = require('../models/Credential');
class CredentialFactory{
    constructor(){}
    make(accountId,password){
        return new Credential(accountId,password);
    }
}
module.exports = CredentialFactory;