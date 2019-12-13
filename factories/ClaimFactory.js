const Claim = require('../models/Claim');
class ClaimFactory{
    constructor(){}
    make(appId,accId,expiration,permission){
        return new Claim(appId,accId,expiration,permission);
    }
}
module.exports = ClaimFactory;