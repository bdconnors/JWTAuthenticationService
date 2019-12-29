const Permission = require('../models/account/Permission');
const Credentials = require('../models/account/Credentials');
const User = require('../models/account/User');
const Account = require('../models/account/Account');

class AccountBuilder{
    constructor(){
        this.account = new Account();
    }
    buildId(id){
        this.account.id = id;
    }
    buildUser(firstName,lastName){
        this.account.user = new User(firstName,lastName);
    }
    buildCredentials(email,password){
        this.account.credentials = new Credentials(email,password);
    }

    buildPermissions(permissionData){
        this.account.permissions = [];
        for(let i =0; i < permissionData.length; i++){
            const data = permissionData[i];
            const permission = new Permission(data.roleId,data.appId);
            this.account.permissions.push(permission);
        }
    }
    getAccount(){
        return this.account;
    }


}
module.exports = AccountBuilder;