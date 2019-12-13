const Application = require('../models/Application');

class ApplicationFactory{
    constructor(){}
    make(id,name,tokenKey){
        return new Application(id,name,tokenKey);
    }
}
module.exports = ApplicationFactory;