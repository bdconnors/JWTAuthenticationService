class AccountService{

    constructor(repo,encryption){
        this.repo = repo;
        this.encryption = encryption;
    }

    validate(email,password){
        const account = this.repo.getAccountByEmail(email);
        const accCredentials = account.credentials;
        return this.encryption.compareData(password,accCredentials.password);
    }
    async register(appId,roleId,firstName,lastName,email,password){
        const accId = this.encryption.generateUUID();
        const hash = this.encryption.encryptData(password,11);
        const account = await this.repo.createAccount(appId,roleId,accId,firstName,lastName,email,hash);
        return this.repo.addAccount(account);
    }
    authenticate(email,password){
        const account = this.repo.getAccountByEmail(email);
        const valid = this.encryption.compareData(password,account.credentials.password);
        if(valid){
            return account;
        }else{
            return false;
        }
    }

}
module.exports = AccountService;