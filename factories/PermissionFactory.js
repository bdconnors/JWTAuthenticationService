const Permission = require('../models/Permission');
class PermissionFactory{
    constructor(){}
    make(appId,permId){
        return new Permission(appId,permId);
    }
}
module.exports =PermissionFactory;