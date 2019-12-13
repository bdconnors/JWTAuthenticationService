class Server{

    constructor(framework,host,port){
        this.framework = framework();
        this.host = host;
        this.port = port;
    }
    async start(router) {
        if(router){this.framework.use(router.routes);}

        this.framework.listen(this.port,()=>{
            console.log('Server Started. Navigate to http://'+this.host+':'+this.port);
        });

    }
}
module.exports = Server;

