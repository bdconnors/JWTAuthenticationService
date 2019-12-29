class AccountFactory{
    constructor(accountBuilder){
        this.accountBuilder = accountBuilder;
    }
    make(accountId,firstName,lastName,email,password,permissions){
        this.accountBuilder.buildId(accountId);
        this.accountBuilder.buildUser(firstName,lastName);
        this.accountBuilder.buildCredentials(email,password);
        this.accountBuilder.buildPermissions(permissions);
        return this.accountBuilder.getAccount();
    }
}
module.exports =AccountFactory;