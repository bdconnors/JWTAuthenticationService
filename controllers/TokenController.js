class TokenController{

    constructor(tokenService){
        this.service = tokenService
    }

    getToken(req,res){
        const token = this.service.getToken(req.query);
        res.send(token.toString());
    }

}
module.exports = TokenController;