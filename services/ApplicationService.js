class ApplicationService{
    constructor(applications){
        this.applications = applications;
    }
    async register(params){
        return await this.applications.createApplication(params.name).catch((e)=>{
            console.log(e);
            console.log('error registering app');
        });
    }
}
module.exports = ApplicationService;