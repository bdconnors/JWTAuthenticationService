const MySQL = require('promise-mysql2');
class Database{
    constructor(config){
        this.config = config;
        this.connection = null;
    }
    async connect(){
        const noConnection= !(this.isConnected());
        if(noConnection) {
            this.connection = await MySQL.createConnection(this.config.settings);
            console.log('connected to DB');
        }else{
            console.log('connection already exists, close connection before calling connect');
        }
    }
    async disconnect(){
        return this.connection.close().catch((e)=>{
            console.log(e);
            console.log('error closing database connection');
        })
    }
    async execute(procedure,params){

        return await this.connection.query(procedure, params).catch((e) => {
            console.log(e);
            console.log('sql error');
        });

    }
    async createApplication(application){
        const id = application.id;
        const name = application.name;
        const key = application.key;
        return await this.execute(this.config.createApplication,[id,name,key]);
    }
    async createAccount(appId,account){
        const parameters = this.getAccountAsParameters(appId,account);
        return await this.execute(this.config.createAccount,parameters).catch((e)=>{console.log(e)});
    }
    async getAllAccounts(){
        return await this.execute(this.config.getAllAccounts);
    }
    async getAccount(id){
        return await this.execute(this.config.getAccount,[id]);
    }
    isConnected(){
        let connected = false;
        if(this.connection) {
            if (this.connection.connection.state === 'authenticated') {
                connected = true;
            }
        }
        return connected;
    }
    getAccountAsParameters(appId,account){
        const params = [];
        const appPermission = account.permissions.find((perm)=>{return perm.applicationId === appId});
        params.push(appPermission.applicationId);
        params.push(appPermission.roleId);
        params.push(account.id);
        params.push(account.user.firstName);
        params.push(account.user.lastName);
        params.push(account.credentials.email);
        params.push(account.credentials.password);
        return params;
    }
}

module.exports = Database;