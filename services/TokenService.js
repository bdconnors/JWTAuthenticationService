class TokenService{
    constructor(applicationRepo,accountRepo,tokenBuilder,config){
        this.applications = applicationRepo;
        this.accounts = accountRepo;
        this.builder = tokenBuilder;
        this.config = config;
    }
    getToken(params){

        const account = this.accounts.getById(params.accId);
        const application = this.applications.getById(parseInt(params.appId));
        const key = application.tokenKey;
        const permission = account.permissions.find(perm=>perm.appId === params.appId);

        const header = this.builder.buildHeader(this.config.alg,this.config.typ);
        const claim = this.builder.buildClaim(params.appId,params.accId,this.config.exp,permission,key);
        const signature = this.builder.buildSignature(header,claim,key);

        const token = this.builder.build(header,claim,signature);

        return token.toString();
    }
    refreshToken(params){

    }
    revokeToken(params){

    }
}
module.exports = TokenService;