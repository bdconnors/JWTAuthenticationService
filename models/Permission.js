class Permission{
    constructor(appId,permId){
        this.appId = appId;
        this.permId = permId;
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = Permission;