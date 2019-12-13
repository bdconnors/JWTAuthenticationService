class TokenBuilder{
    constructor(encoding,encryption,headerFactory,claimFactory,tokenFactory){
        this.encoding = encoding;
        this.encryption = encryption;
        this.headers = headerFactory;
        this.claims = claimFactory;
        this.tokens = tokenFactory;
    }
    build(header,claim,signature){
        return this.tokens.make(header.toString(),claim.toString(),signature);
    }
    buildHeader(alg,typ){
        const header = this.headers.make(alg,typ);
        return this.encoding.encodeBase64(header.toString());

    }
    buildClaim(appId,accId,exp,permission,key){
        const claim = this.claims.make(appId,accId,exp,permission);
        const encryptedClaim = this.encryption.encryptObject(key,claim.toString());
        return this.encoding.encodeBase64(encryptedClaim);
    }
    buildSignature(headerString,claimString,key){
        const input = headerString+'.'+claimString;
        return this.encoding.encodeHMAC(input,key);
    }
}
module.exports = TokenBuilder;