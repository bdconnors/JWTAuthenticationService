class Permission{
    constructor(roleId,applicationId){
        this.roleId = null;
        if(roleId){this.roleId = roleId}
        this.applicationId = null;
        if(applicationId){this.applicationId = applicationId}
    }
}
module.exports = Permission;