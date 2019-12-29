/**Import Configuration**/
const config = require('./config');
/**Import Application Base**/
const Database = require('./Database');
const database = new Database(config.database);
const Server = require('./Server');
const server = new Server(config.server);
/**Import Utilities**/
const Encryption = require('./util/Encryption');
const encryption = new Encryption(config.encryption);
/**Import Builders**/
const AccountBuilder = require('./builders/AccountBuilder');
const accountBuilder = new AccountBuilder();
const TokenBuilder = require('./builders/TokenBuilder');
const tokenBuilder = new TokenBuilder();
/**Import Factories**/
const AccountFactory = require('./factories/AccountFactory');
const accountFactory = new AccountFactory(accountBuilder);
/**Import Repositories**/
const AccountRepository = require('./repositories/AccountRepository');
const accountRepo = new AccountRepository(database,accountFactory);
/**Import Services**/
const TokenService = require('./services/TokenService');
const tokenService =  new TokenService(config.token,encryption,tokenBuilder);
const AccountService = require('./services/AccountService');
const accountService = new AccountService(accountRepo,encryption);
/**Import Controllers**/
const MainController = require('./controllers/MainController');
const mainController = new MainController();
const AccountController = require('./controllers/AccountController');
const accountController = new AccountController(accountService,tokenService);

async function run(){
    server.registerController(mainController);
    server.registerController(accountController);
    await database.connect().catch((e)=>{console.log(e)});
    await accountRepo.load().catch((e)=>{console.log(e)});
    await server.start().catch((e)=>{console.log(e)});
}
module.exports = run();