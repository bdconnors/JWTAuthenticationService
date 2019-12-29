class Account{
    constructor(id,user,credentials,permissions){
        this.id = null;
        if(id){this.id = id}
        if(user){this.user = user}
        this.credentials = null;
        if(credentials){this.credentials = credentials}
        this.permissions = null;
        if(permissions){this.permissions = permissions}
    }
}
module.exports = Account;