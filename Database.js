class Database{
    constructor(framework,config,procedures){
        this.framework = framework;
        this.config = config;
        this.procedures = procedures;
        this.connection = null;
    }
    async connect(){

        const noConnection= !(this.isConnected());
        if(noConnection) {
            this.connection = await this.framework.createConnection(this.config);
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
        const verified = this.verifyProcedure(procedure);
        if(verified) {
            return await this.connection.query(procedure, params).catch((e) => {
                console.log(e);
                console.log('sql error');
            });
        }else{
            throw new Error('invalid procedure');
        }
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
    verifyProcedure(procedure){
        let verified = false;
        const splitString = procedure.split('(');
        const procedureName = splitString[0];
        const exists= this.procedures.find((prod)=>{return prod === procedureName});
        if(exists){verified = true;}
        return verified;
    }
}

module.exports = Database;