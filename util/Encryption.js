class Encryption{

    constructor(standardFramework,objectFramework){
        this.standardFramework = standardFramework;
        this.objectFramework = objectFramework;
    }
    encrypt(data,saltRounds){
        return this.standardFramework.hashSync(data,saltRounds);
    }
    decrypt(){

    }
    encryptObject(key,data){
        return this.objectFramework.encrypt(key,data);
    }
    decryptObject(encryptedData,key){
        return this.objectFramework.decrypt(key,encryptedData);
    }

}
module.exports = Encryption;