class AccountController{
    constructor(accounts){
        this.accounts = accounts;
    }

    async signUp(req,res){
        const acc = await this.accounts.signUp(req.query).catch((e)=>{res.send(e)});
        res.send(acc);
    }
    login(req,res){
        res.send(this.accounts.login(req.query));
    }
    logOut(req,res){
        res.send(this.accounts.logOut(req.query));
    }

}
module.exports = AccountController;