class ApplicationRepository{
    constructor(sql,database,applicationFactory){
        this.SQL = sql;
        this.db = database;
        this.factory = applicationFactory;
        this.applications = [];
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