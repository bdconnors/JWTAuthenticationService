const fs = require('fs');
class TokenService {

    constructor(config,encryption,builder) {
        this.config = config;
        this.encryption = encryption;
        this.builder = builder;
    }
    createToken(appId,account){
        const secret = fs.readFileSync(this.config.key);
        const permission = account.permissions.find((perm)=>{return perm.appId === appId});
        this.builder.buildHeader(this.config.alg,this.config.typ);
        this.builder.buildPayload(account.id,account.user,permission);
        let token = this.builder.getToken();
        return this.signToken(token);
    }
    signToken(token){
        const secret = fs.readFileSync(this.config.key);
        const headerString = this.encryption.encryptBase64(token.header.toString());
        const payloadString =this.encryption.encryptBase64(token.payload.toString());
        const signature = this.encryption.encryptHMAC(headerString+'.'+payloadString,secret);
        token.header = headerString;
        token.payload = payloadString;
        this.builder.buildSignature(signature);
        return this.builder.getToken();
    }

}

module.exports = TokenService;