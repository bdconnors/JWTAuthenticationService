class Database{
    constructor(framework,config){
        this.framework = framework;
        this.config = config;
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
    async executePreparedStatement (statement,params){
        const stmnt = await this.connection.prepare(statement).catch((e)=>{
            console.log(e);
            console.log('error preparing query');
        });
        const results = stmnt.execute(params).catch((e)=>{
            console.log(e);
            console.log('error executing prepared statement');
        });
        stmnt.close();
        return results;

    }
    async query(statement){

        return await this.connection.query(statement).catch((e) => {
            console.log(e);
            console.log('error executing query on database');
        });

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
}

module.exports = Database;