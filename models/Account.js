class Account{
    constructor(id,firstName,lastName,email,password,permissions){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.password = password;
        this.permissions = permissions;
    }
}
module.exports = Account;