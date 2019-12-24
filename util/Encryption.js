class Encryption{

    constructor(standardFramework,objectFramework){
        this.standardFramework = standardFramework;
        this.objectFramework = objectFramework;
    }
    encrypt(data,saltRounds){
        const salt = this.standardFramework.genSaltSync(saltRounds);
        return this.standardFramework.hashSync(data,salt);
    }
    compare(plainText,hash){
        return this.standardFramework.compareSync(plainText,hash);
    }
    encryptObject(key,data){
        return this.objectFramework.encrypt(key,data);
    }
    decryptObject(encryptedData,key){
        return this.objectFramework.decrypt(key,encryptedData);
    }

}
module.exports = Encryption;