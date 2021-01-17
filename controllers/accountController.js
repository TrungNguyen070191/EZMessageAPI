'use strict';
var Helpers = require('../common/helpers'),
    AccountRepository = require('../repositories/accountRepository'),
    accountRepo = new AccountRepository();


// USING FOR server.js
exports.Index = function (req, res) {
    res.send('NOT IMPLEMENTED: Site Home Page');
};

exports.GetAllAccounts = async function (req, res) {
    let accounts = await accountRepo.GetAllAsync();
    if (accounts === null) {
        res.end('Accounts is not found!');
        return false;
    }
    res.end(JSON.stringify(accounts));
    console.log('Running GetAllAccounts()');
    return true;
};

exports.SignIn = async function (req, res) {
    let account = await accountRepo.SignInAsync(req.body.userName, req.body.password);
    console.log('AA:' + account);
    if (account === null || account === undefined) {
        res.end('Authentication failed. Account is not found!');
        return false;
    } else {
        if (!Helpers.comparePassword(req.body.password, account.password)) {
            res.status(401).json({ message: 'Authentication failed. Wrong password.' });
        } else {
            return res.json({ token: jwt.sign({ email: user.email, fullName: user.fullName, _id: user._id }, 'RESTFULAPIs') });
        }
    }
};

exports.Register = async function (req, res) {
    req.body.password = bcrypt.hashSync(req.body.password, 10);
    let result = await userRepo.AddNewAsync(req.body);
    if (result === null || result === undefined) {
        res.end('Register is not working!');
        return false;
    }
    res.end(JSON.stringify(result));
    console.log('Running Register Account()');
    return true;
};

exports.LoginRequired = function (req, res) {
    if (req.user) {
        next();
    } else {
        return res.status(401).json({ message: 'Unauthorized user!' });
    }
};

// USING FOR api.js

class AccountController {
    async GetAllAccounts(req, res) {
        let accounts = await accountRepo.GetAllAsync();
        if (accounts === null) {
            res.end('Accounts is not found!');
            return false;
        }
        res.end(JSON.stringify(accounts));
        console.log('Running GetAllAccounts()');
        return true;
    }

    async SignIn(req, res) {
        let account = await accountRepo.SignInAsync(req.body.userName, req.body.password);
        if (account === null) {
            res.end('Account is not found!');
            return false;
        }
        res.end(JSON.stringify(accounts));
        console.log('Running SignIn()');
        return true;
    }

    async Index(req, res) {
        res.send('NOT IMPLEMENTED: Site Home Page');
    }
}
// module.exports = AccountController;
