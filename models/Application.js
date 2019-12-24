class Application{
    constructor(id,name,tokenKey){
        this.id = id;
        this.name = name;
        this.tokenKey = tokenKey;
    }
    toString(){
        return JSON.stringify(this);
    }
}
module.exports = Application;