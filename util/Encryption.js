const bcrypt = require('bcrypt-nodejs');
const sjcl = require('sjcl');
const uuid = require('uuid/v4');
const crypto = require('crypto');

class Encryption{

    constructor(config){
        this.config = config;
    }

    encryptData(data,saltRounds){
        const salt = bcrypt.genSaltSync(saltRounds);
        return bcrypt.hashSync(data,salt);
    }
    compareData(plainData,hashedData){
        return bcrypt.compareSync(plainData,hashedData);
    }
    encryptObject(key,data){
        return sjcl.encrypt(key,data);
    }
    decryptObject(encryptedData,key){
        return sjcl.decrypt(key,encryptedData);
    }
    generateUUID(){
        return uuid();
    }
    encryptHMAC(input,key){
        return crypto.createHmac(this.config.HMAC.hash,key).update(input).digest(this.config.HMAC.input);
    }
    encryptBase64(input){
        let output = "";
        let chr1, chr2, chr3, enc1, enc2, enc3, enc4;
        let i = 0;

        input = this.encryptUtf8(input);

        while (i < input.length) {

            chr1 = input.charCodeAt(i++);
            chr2 = input.charCodeAt(i++);
            chr3 = input.charCodeAt(i++);

            enc1 = chr1 >> 2;
            enc2 = ((chr1 & 3) << 4) | (chr2 >> 4);
            enc3 = ((chr2 & 15) << 2) | (chr3 >> 6);
            enc4 = chr3 & 63;

            if (isNaN(chr2)) {
                enc3 = enc4 = 64;
            } else if (isNaN(chr3)) {
                enc4 = 64;
            }

            output = output +
                this.config.base64.key.charAt(enc1) + this.config.base64.key.charAt(enc2) +
                this.config.base64.key.charAt(enc3) + this.config.base64.key.charAt(enc4);

        }

        return output;
    }
    decryptBase64(input){
        let output = "";
        let chr1, chr2, chr3;
        let enc1, enc2, enc3, enc4;
        let i = 0;

        input = input.replace(this.config.base64.whiteSpace, "");

        while (i < input.length) {

            enc1 = this.config.base64.key.indexOf(input.charAt(i++));
            enc2 = this.config.base64.key.indexOf(input.charAt(i++));
            enc3 = this.config.base64.key.indexOf(input.charAt(i++));
            enc4 = this.config.base64.key.indexOf(input.charAt(i++));

            chr1 = (enc1 << 2) | (enc2 >> 4);
            chr2 = ((enc2 & 15) << 4) | (enc3 >> 2);
            chr3 = ((enc3 & 3) << 6) | enc4;

            output = output + String.fromCharCode(chr1);

            if (enc3 !== 64) {
                output = output + String.fromCharCode(chr2);
            }
            if (enc4 !== 64) {
                output = output + String.fromCharCode(chr3);
            }

        }

        output = this.decryptUtf8(output);

        return output;

    }
    encryptUtf8(input){
        input = input.replace(this.config.base64.hidden,"\n");
        let output = "";

        for (let n = 0; n < input.length; n++) {

            let c = input.charCodeAt(n);

            if (c < 128) {
                output += String.fromCharCode(c);
            }
            else if((c > 127) && (c < 2048)) {
                output += String.fromCharCode((c >> 6) | 192);
                output += String.fromCharCode((c & 63) | 128);
            }
            else {
                output += String.fromCharCode((c >> 12) | 224);
                output += String.fromCharCode(((c >> 6) & 63) | 128);
                output += String.fromCharCode((c & 63) | 128);
            }

        }

        return output;
    }
    decryptUtf8(input){
        let output = "";
        let i = 0;
        let c3;
        let c2 = 0;
        let c1 = c2;
        let c = c1;


        while ( i < input.length ) {

            c = input.charCodeAt(i);

            if (c < 128) {
                output += String.fromCharCode(c);
                i++;
            }
            else if((c > 191) && (c < 224)) {
                c2 = input.charCodeAt(i+1);
                output += String.fromCharCode(((c & 31) << 6) | (c2 & 63));
                i += 2;
            }
            else {
                c2 = input.charCodeAt(i+1);
                c3 = input.charCodeAt(i+2);
                output += String.fromCharCode(((c & 15) << 12) | ((c2 & 63) << 6) | (c3 & 63));
                i += 3;
            }

        }

        return output;
    }

}
module.exports = Encryption;