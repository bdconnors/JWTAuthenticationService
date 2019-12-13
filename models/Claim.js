class Claim{
    constructor(appId,accId,exp,permission){
        this.appId = appId;
        this.accId = accId;
        this.exp = exp;
        this.permission = permission;
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = Claim;