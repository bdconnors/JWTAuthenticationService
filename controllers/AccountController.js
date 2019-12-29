class AccountController{
    constructor(accountService,tokenService){
        this.accountService = accountService;
        this.tokenService = tokenService;
    }
    async register(req,res){
        console.log(req);
        const appId = parseInt(req.query.appId);
        const roleId = parseInt(req.query.roleId);
        const firstName = req.query.firstName;
        const lastName = req.query.lastName;
        const email = req.query.email;
        const password = req.query.password;
        const account = await this.accountService.register(appId,roleId,firstName,lastName,email,password);
        res.send(account);

    }
    authenticate(req,res){
        const validAccount = this.accountService.authenticate(req.query.email,req.query.password);
        if(validAccount){
            const token = this.tokenService.createToken(req.query.appId,validAccount);
            res.send(token.toString());
        }else{
            res.send('login failed');
        }
    }
}
module.exports = AccountController;