class TokenPayload{
    constructor(accountId,user,permission,expiration){
        this.accountId = null;
        if(accountId){this.accountId = accountId}
        this.user = null;
        if(user){this.user = user}
        this.permission = null;
        if(permission){this.permission = permission}
        this.expiration = null;
        if(expiration){this.expiration = expiration}
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = TokenPayload;