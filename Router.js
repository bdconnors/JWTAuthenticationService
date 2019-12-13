class Router{

    constructor(framework){
        this.framework = framework;
        this.routes = this.framework.Router();
    }
    register(verb,path,destination){

        verb = verb.toUpperCase();

        switch(verb){
            case 'GET':
                this.routes.get(path,destination);
                break;
            case 'POST':
                this.routes.post(path,destination);
                break;
            case 'PUT':
                this.routes.put(path,destination);
                break;
            case 'DELETE':
                this.routes.delete(path,destination);
                break;
            default:
                this.routes.all(path,destination);
        }
    }


}

module.exports = Router;
