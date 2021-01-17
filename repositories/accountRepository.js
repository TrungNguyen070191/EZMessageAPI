'use strict';

var ObjectId = require('mongodb').ObjectID;
var dbAccess = require('../dbAccess');
var enums = require('../common/constants');

var db = new dbAccess();

class AccountRepository {
    constructor() {
        this.key = enums.collectionsName.ACCOUNT;
    }

    async GetAllAsync() {
        return await db.GetAllAsync(this.key);
    }

    async SignInAsync(uName, pwd) {
        return await db.GetOneAsync(this.key, { $or: [{ userName: uName, password: pwd }] });
    }
}

module.exports = AccountRepository;