const Account = require('../models/Account');
class AccountFactory{
    constructor(){}
    make(accId,firstName,lastName,email,password,permissions){
        return new Account(accId,firstName,lastName,email,password,permissions);
    }
}
module.exports =AccountFactory;