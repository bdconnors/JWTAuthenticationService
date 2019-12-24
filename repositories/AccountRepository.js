class AccountRepository{

    constructor(sql,database,accountBuilder){
        this.SQL = sql;
        this.db = database;
        this.builder = accountBuilder;
        this.accounts = [];
        this.credentials = [];
    }
    getCredential(accountId){
        return this.credentials.find((cred)=>{return cred.accountId === accountId});

    }
    getById(id){
        console.log(id);
        console.log(typeof id);
        console.log(this.accounts);
        const account = this.accounts.find((acc)=>{return acc.id === id});
        console.log(account);
        return account;
    }
    getByEmail(email){
        return this.accounts.find((acc)=>{return acc.email === email});
    }
    async create(appId,permId,firstName,lastName,email,password){
        const createSQL = this.SQL.createAccount;
        const createParams = [appId,permId,firstName,lastName,email,password];
        const result = await this.db.executePreparedStatement(createSQL,createParams).catch((e)=>{
            console.log(e);
            console.log('error creating account');
        });
        const rawAccount = result[0][0][0];
        const account = this.builder.build(rawAccount.id,firstName,lastName,email,[]);
        const permission = this.builder.buildPermission(rawAccount.appid,rawAccount.permid);
        const credential = this.builder.buildCredential(rawAccount.id,rawAccount.password);
        account.permissions.push(permission);
        this.accounts.push(account);
        this.credentials.push(credential);
        return account;
    }
    async load() {
        this.accounts = [];
        const accData = await this.getAllAccountData();
        const permData = await this.getAllAccountPermissionData();
        this.accounts = this.loadAllAccounts(accData,permData);
        this.credentials = this.loadAllCredentials(accData);
        console.log(this.accounts);
        console.log(this.credentials);

    }
    loadAllAccounts(accData,permData){
        const processedAccounts = [];
        console.log(accData.length);
        console.log(permData.length);
        for(let i = 0; i < accData.length; i++){
            const curAccountPermissionData = permData.filter((perm)=>{return perm.accId === accData[i].id});
            const curAccountPermissions = this.builder.buildMultiplePermissions(curAccountPermissionData);
            const curAccount = this.builder.build(
                accData[i].id,
                accData[i].firstname,
                accData[i].lastname,
                accData[i].email,
                curAccountPermissions
            );
            processedAccounts.push(curAccount);
        }
        return processedAccounts;
    }
    loadAllCredentials(accData){
        const credentials = [];
        console.log(accData);
        for(let i = 0; i < accData.length; i++){
            const credential = this.builder.buildCredential(accData[i].id,accData[i].password);
            credentials.push(credential);
        }
        return credentials
    }
    async getAllAccountData(){
        const results = await this.db.query(this.SQL.getAllAccounts).catch((e) => {
            console.log('error loading account data from db');
            console.log(e);
        });
        console.log(results[0]);
        return results[0][0];
    }
    async getAllAccountPermissionData(){
        const permResults = await this.db.query(this.SQL.getAllAppPermissions).catch((e) => {
            console.log('error loading account permission data from database');
            console.log(e);
        });
        console.log(permResults[0]);
        return permResults[0][0];
    }


}
module.exports = AccountRepository;