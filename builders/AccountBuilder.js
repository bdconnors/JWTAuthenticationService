class AccountBuilder{
    constructor(accountFactory,permissionFactory){
        this.accounts = accountFactory;
        this.permissions = permissionFactory;
    }
    build(id,firstName,lastName,email,password,permissions){
        return this.accounts.make(id,firstName,lastName,email,password,permissions);
    }
    buildMultiplePermissions(permData){
        const permissions = [];
        for(let j = 0; j < permData.length; j++){
            const curPermission = this.permissions.make(permData[j].appId,permData[j].permId);
            permissions.push(curPermission);
        }
        return permissions;
    }
    buildPermission(appId,permId){
        return this.permissions.make(appId,permId);
    }
}
module.exports = AccountBuilder;