class AccountRepository{

    constructor(database,factory){
        this.database = database;
        this.factory = factory;
        this.accounts = [];
    }
    getAccounts(){
        return this.accounts;
    }
    getAccountsByRoleId(roleId) {
        return this.accounts.filter((acc)=>{
            const appPerm = acc.permissions.find((perm)=>{return perm.roleId === roleId});
            if(appPerm){return acc}
        });
    }
    getAccountsByAppId(appId){
        return this.accounts.filter((acc)=>{
            const appPerm = acc.permissions.find((perm)=>{return perm.applicationId === appId});
            if(appPerm){return acc}
        });
    }
    getAccountById(accId) {
        return this.accounts.find((acc) => {
            return acc.id = accId
        });
    }
    getAccountByEmail(email){
        return this.accounts.find((acc)=>{return acc.credentials.email === email});
    }
    addAccount(account){
        this.accounts.push(account);
        return this.accounts.find((acc)=>{return acc.id === account.id});
    }
    async createAccount(appId,roleId,accId,firstName,lastName,email,password){
        const permission = [{roleId:roleId,appId:appId}];
        const account = this.factory.make(accId,firstName,lastName,email,password,permission);
        const result = await this.database.createAccount(appId,account);
        console.log(result);
        return account;
    }
    async load(){
        const results = await this.database.getAllAccounts().catch((e)=>{console.log(e)});
        const accountLoginData = results[0][0];
        const accountPermissionData = results[0][1];
        for(let i = 0; i < accountLoginData.length; i++){
            const accData = accountLoginData[i];
            const account = this.factory.make(accData.id,
                accData.firstname,
                accData.lastname,
                accData.email,
                accData.password,
                accountPermissionData);
            this.accounts.push(account);
            console.log(this.accounts);

        }
    }


}
module.exports = AccountRepository;