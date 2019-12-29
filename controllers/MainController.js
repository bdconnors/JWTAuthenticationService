class MainController{
    constructor(routes){}
    index(req,res){
        res.send(`<h1>JWT Authentication Service</h1>
            <b>To register an application use:</b> /api/applications/register?appName=#<br>
            <b> To authenticate an account login use:</b> /api/accounts/auth?email=#&password=#<br>
            <b>To register accounts use:</b>/api/accounts/signUp?appRoleId=#&firstName=#&lastName=#&email=#&password=#`);
    }

}
module.exports = MainController;