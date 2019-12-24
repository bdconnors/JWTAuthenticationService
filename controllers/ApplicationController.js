class ApplicationController{
    constructor(applications){
        this.applications = applications;
    }
    async registerApp(req,res){
       const app = await this.applications.register(req.query).catch((e)=>{res.send(e)});
       console.log(app);
       res.send(app);
    }

}
module.exports = ApplicationController;