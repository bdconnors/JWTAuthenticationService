class User{
    constructor(firstName,lastName){
        this.firstName = null;
        if(firstName){this.firstName = firstName}
        this.lastName = null;
        if(lastName){this.lastName = lastName}

    }
}
module.exports = User;