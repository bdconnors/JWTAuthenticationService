class Account{
    constructor(id,firstName,lastName,email,permissions){
        this.id = id;
        this.firstName = firstName;
        this.lastName = lastName;
        this.email = email;
        this.permissions = permissions;
    }
}
module.exports = Account;