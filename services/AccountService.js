class AccountService{

    constructor(accounts,encryption){
        this.accounts = accounts;
        this.encryption = encryption;
    }

    async signUp(params){
        const hash = this.encryption.encrypt(params.password,11);
        return await this.accounts.create(params.appId,params.permId,params.firstName,params.lastName,params.email,hash);
    }
    login(params){
        let success = false;
        const email = params.email;
        const password = params.password;
        const account = this.accounts.getByEmail(email);
        if(account) {
            const credential = this.accounts.getCredential(account.id);
            success = this.encryption.compare(password,credential.password);
        }
        return success;
    }
    logOut(params){

    }
}
module.exports = AccountService;