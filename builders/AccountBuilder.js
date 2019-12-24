class AccountBuilder{
    constructor(accountFactory,permissionFactory,credentialFactory){
        this.accounts = accountFactory;
        this.permissions = permissionFactory;
        this.credentials = credentialFactory;
    }
    build(id,firstName,lastName,email,permissions){
        return this.accounts.make(id,firstName,lastName,email,permissions);
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
    buildCredential(accountId,password){
        return this.credentials.make(accountId,password);
    }
}
module.exports = AccountBuilder;