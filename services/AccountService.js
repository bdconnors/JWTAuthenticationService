class AccountService{

    constructor(accounts,encryption){
        this.accounts = accounts;
        this.encryption = encryption;
    }

    signUp(params){
        const hash = this.encryption.encrypt(params.password,11);
        return this.accounts.create(params.firstName,params.lastName,params.email,hash,params.appId,params.permId);
    }
    login(params){
        const result = false;
        const account = this.accounts.getByEmail(params.email);
        if(account){

        }

    }
    logOut(params){

    }
}
module.exports = AccountService;