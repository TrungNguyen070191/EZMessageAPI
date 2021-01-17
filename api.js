const express = require('express');
const finalhandler = require('finalhandler');
const bodyParser = require('body-parser');
const http = require('http');
const Router = require('router');
const routers = express.Router();

const app = express();
const hostName = '127.0.0.1';
const port = process.env.PORT || 3000;

// ROUTERS
var opts = { mergeParams: true };
var router = new Router(opts);
var api = new Router();
var users = new Router();
var accounts = new Router();

router.use('/api/', api);
api.use('/users/', users);
api.use('/accounts/', accounts);



api.use(bodyParser.json());
users.use(bodyParser.json());
accounts.use(bodyParser.json());

// CONTROLLERS
const UserController = require('./controllers/userController');
const AccountController = require('./controllers/accountController');

var userService = new UserController();
var accountService = new AccountController();


/*---------------------------------------------------
DEFINE APIs OF USER
---------------------------------------------------*/
users.get('', function (req, res) {
    userService.GetAllUsers(req, res);
});

/*---------------------------------------------------
DEFINE APIs OF ACCOUNT
---------------------------------------------------*/
accounts.get('', function (req, res) {
    accountService.GetAllAccounts(req, res);
});

accounts.post('/signin/', function (req, res) {
    accountService.SignIn(req, res);
});

// CREATE SERVER
const server = http.createServer((req, res) => {
    req.on('error', (err) => {
        console.error(err);
    });

    res.on('error', (err) => {
        console.error(err);
    });

    router(req, res, finalhandler(req, res));
});

server.listen(port, () => {
    console.log(`Server is running at http://${hostName}:${port}/`);
})

