class AccountRepository{

    constructor(sql,database,accountBuilder){
        this.SQL = sql;
        this.db = database;
        this.builder = accountBuilder;
        this.accounts = [];
    }

    getById(id){
        return this.accounts.find((acc)=>{return acc.id === id});
    }
    getByEmail(email){
        return this.accounts.find((acc)=>{return acc.email === email});
    }
    create(firstName,lastName,email,password,appId,permId){
        const createSQL = this.SQL.createAccount;
        const createParams = [firstName,lastName,email,password,appId,permId];
        const results = this.db.executePreparedStatement(createSQL,createParams).catch((e)=>{
            console.log(e);
            console.log('error creating account');
        });
        const account = this.builder.build(results[0],firstName,lastName,email,password,[]);
        account.permissions.push(this.builder.buildPermission(appId,permId));
        this.accounts.push(account);
        return account;
    }
    async load() {
        const accData = await this.getAllAccountData();
        const permData = await this.getAllAccountPermissionData();
        this.accounts = this.loadAllAccounts(accData,permData);

    }
    loadAllAccounts(accData,permData){
        const processedAccounts = [];
        for(let i = 0; i < accData.length; i++){
            const curAccountPermissionData = permData.filter((perm)=>{return perm.accId === accData[i].id});
            const curAccountPermissions = this.builder.buildMultiplePermissions(curAccountPermissionData);
            const curAccount = this.builder.build(
                accData[i].id,
                accData[i].firstname,
                accData[i].lastname,
                accData[i].email,
                accData[i].password,curAccountPermissions
            );
            processedAccounts.push(curAccount);
        }
        return processedAccounts;
    }
    async getAllAccountData(){
        const results = await this.db.query(this.SQL.getAllAccounts).catch((e) => {
            console.log('error loading account data from db');
            console.log(e);
        });
        return results[0];
    }
    async getAllAccountPermissionData(){
        const permResults = await this.db.query(this.SQL.getAllAppPermissions).catch((e) => {
            console.log('error loading account permission data from database');
            console.log(e);
        });
        return permResults[0];
    }


}
module.exports = AccountRepository;