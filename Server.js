const fs = require('fs');
const express = require('express');
const https = require('https');

class Server{

    constructor(config){
        this.config = config;
        this.server = express();
        this.router = express.Router();
    }
    registerController(controller){
        const controllerName = controller.constructor.name;
        const routes = this.config.routes.filter((route)=>{return route.controller === controllerName});
        for(let i = 0; i < routes.length; i++){

            const route = routes[i];
            console.log(route);
            const path = route.path;
            const functionName = route.name;
            const httpMethod = route.method;
            this.router[httpMethod](path,controller[functionName].bind(controller));
        }
    }
    async start(){
        this.server.use(express.urlencoded({ extended: true }));
        this.server.use(express.json());
        this.server.use(this.router);
        https.createServer({
            key: fs.readFileSync(this.config.key),
            cert: fs.readFileSync(this.config.cert)},
            this.server)
            .listen(this.config.port, ()=> {
                console.log('Server Started. Navigate to https://'+this.config.host+':'+this.config.port)
            });
    }
}
module.exports = Server;

