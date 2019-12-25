/**Import Configuration**/
const config = require('./config');
const SQL = require('./sql/sql');

/**3rd party libs**/
const bcrypt = require('bcrypt-nodejs');
const crypto = require('crypto');
const sjcl = require('sjcl');
const express = require('express');
const MySQL = require('promise-mysql2');

/**Import Utility Components**/
const Encoding = require('./util/Encoding');
const Encryption = require('./util/Encryption');

/**Import Data Access Components**/
const PermissionFactory = require('./factories/PermissionFactory');
const CredentialFactory = require('./factories/CredentialFactory');
const AccountFactory = require('./factories/AccountFactory');
const ApplicationFactory = require('./factories/ApplicationFactory');
const HeaderFactory = require('./factories/HeaderFactory');
const ClaimFactory = require('./factories/ClaimFactory');
const TokenFactory = require('./factories/TokenFactory');

const AccountBuilder = require('./builders/AccountBuilder');
const TokenBuilder = require('./builders/TokenBuilder');

const AccountRepository = require('./repositories/AccountRepository');
const ApplicationRepository = require('./repositories/ApplicationRepository');

/**Import Service Components**/
const TokenService = require('./services/TokenService');
const AccountService = require('./services/AccountService');

const ApplicationService = require('./services/ApplicationService');

/**Import Controllers**/
const TokenController = require('./controllers/TokenController');
const AccountController = require('./controllers/AccountController');
const ApplicationController = require('./controllers/ApplicationController');

/**Import Server Components*/
const Database = require('./Database');
const Router = require('./Router');
const Server = require('./Server');

/**Declare Utility Components**/
let encoding;
let encryption;

let permissionFactory;
let credentialFactory;
let accountFactory;
let applicationFactory;
let headerFactory;
let claimFactory;
let tokenFactory;

let accountBuilder;
let tokenBuilder;

/**Declare Data Access Components**/
let accountRepo;
let applicationRepo;

/**Declare Service Components**/
let accountService;
let applicationService;
let tokenService;

/**Declare Controllers**/
let tokenController;
let accountController;
let applicationController;

/**Declare Server Components**/
let db;
let router;
let server;

async function startServer(){
    server = new Server(express,config.host,config.port);
    await server.start(router).catch((e)=>{console.log(e)});
}
function initializeControllers(){
    tokenController = new TokenController(tokenService);
    accountController = new AccountController(accountService);
    applicationController = new ApplicationController(applicationService);
}
function initializeRoutes(){
    router = new Router(express);
    router.register('GET','/',function(req,res){res.send('index')});
    router.register('GET','/api/tokens/getToken',tokenController.getToken.bind(tokenController));
    router.register('POST','/api/applications/registerApp',applicationController.registerApp.bind(applicationController));
    router.register('POST','/api/accounts/signUp',accountController.signUp.bind(accountController));
    router.register('GET','/api/accounts/login',accountController.login.bind(accountController));

}
function initializeServices(){
    tokenService = new TokenService(applicationRepo,accountRepo,tokenBuilder,config.token);
    accountService = new AccountService(accountRepo,encryption);
    applicationService = new ApplicationService(applicationRepo);
}
function initializeUtilities(){
    encoding = new Encoding(crypto,config.encoding);
    encryption = new Encryption(bcrypt,sjcl);
}
function initializeFactories(){
    permissionFactory = new PermissionFactory();
    credentialFactory = new CredentialFactory();
    accountFactory = new AccountFactory();
    applicationFactory = new ApplicationFactory();
    headerFactory = new HeaderFactory();
    claimFactory = new ClaimFactory();
    tokenFactory = new TokenFactory();
}
function initializeBuilders(){
    accountBuilder = new AccountBuilder(accountFactory,permissionFactory,credentialFactory);
    tokenBuilder = new TokenBuilder(encoding,encryption,headerFactory,claimFactory,tokenFactory)
}
async function initializeRepositories(){

    applicationRepo = new ApplicationRepository(SQL,db,applicationFactory);
    await applicationRepo.load().catch((e)=>{console.log(e)});

    accountRepo = new AccountRepository(SQL,db,accountBuilder);
    await accountRepo.load().catch((e)=>{console.log(e)});
}
async function initializeDatabaseConnection(){
    db = new Database(MySQL,config.db,config.storedProcedures);
    await db.connect().catch((e)=>{console.log(e)});
}
async function run(){
    initializeUtilities();
    initializeFactories();
    initializeBuilders();
    await initializeDatabaseConnection();
    await initializeRepositories();
    initializeServices();
    initializeControllers();
    initializeRoutes();
    await startServer();
}
module.exports = run();