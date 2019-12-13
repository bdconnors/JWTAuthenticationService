class AccountController{
    constructor(database,accounts){
        this.db = database;
        this.accounts = accounts;
    }

    signUp(req,res){
        res.send(this.accounts.signUp(req.query));
    }
    login(req,res){
        res.send(this.accounts.login(req.query));
    }
    logOut(req,res){
        res.send(this.accounts.logOut(req.query));
    }

}
module.exports = AuthenticationController;