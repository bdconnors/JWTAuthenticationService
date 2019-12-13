const Header = require('../models/Header');
class HeaderFactory{
    constructor(){}

    make(alg,typ){
        return new Header(alg,typ);
    }
}
module.exports = HeaderFactory;