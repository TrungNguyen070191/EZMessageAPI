'use strict';

var ObjectId = require('mongodb').ObjectID;
var enums = require('../common/constants');
var dbAccess = require('../dbAccess');

var db = new dbAccess();

class CategoryRepository {
    constructor() {
        this.key = enums.collectionsName.CATEGORY;
    }

    async GetAllAsync() {
        return await db.GetAllAsync(this.key);
    }

    async GetOneAsync(hash) {
        return await db.GetOneAsync(this.key, { $or: [{ hash: hash }] });
    }

    async AddNewAsync(data) {
        return await db.AddNewAsync(this.key, data);
    }
}

module.exports = CategoryRepository;