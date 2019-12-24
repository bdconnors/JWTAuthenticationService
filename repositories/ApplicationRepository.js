class ApplicationRepository{
    constructor(sql,database,applicationFactory){
        this.SQL = sql;
        this.db = database;
        this.factory = applicationFactory;
        this.applications = [];
    }
    async createApplication(name){
        const result = await this.db.executePreparedStatement(this.SQL.registerApplication,[name]);
        const rawApp = result[0][0][0];
        const application = this.factory.make(rawApp.id,rawApp.name,rawApp.tokenkey);
        this.applications.push(application);
        return application;
    }
    getById(id){
        return this.applications.find(app=>app.id === id);
    }
    async load(){
        const data = await this.getAllApplicationData();
        this.applications = this.loadAllApplications(data);
        console.log(this.applications);
    }
    loadAllApplications(appData){
        const applications = [];
        for(let i = 0; i < appData.length; i++){
            applications.push(this.factory.make(appData[i].id,appData[i].name,appData[i].tokenkey));
        }
        return applications;
    }
    async getAllApplicationData(){
        const results = await this.db.query(this.SQL.getAllApplications).catch((e) => {return e});
        return results[0];
    }

}
module.exports = ApplicationRepository;