'use strict';
var jwt = require('jsonwebtoken'),
    jsonwebtoken = require("jsonwebtoken"),
    bcrypt = require('bcrypt'),
    uuid = require('uuid'),
    config = require("../common/config"),
    errors = require("../common/errorMessage"),
    Helpers = require('../common/helpers'),
    CategoryRepository = require('../repositories/categoryRepository'),
    categoryRepo = new CategoryRepository();

// USING FOR server.js
exports.GetAllCategories = async function (req, res) {
    let categories = await categoryRepo.GetAllAsync();
    if (!categories) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(categories));
    console.log('Running GetAllCategories()');
    return true;
};

exports.GetCategoryDetail = async function (req, res) {
    let categories = await categoryRepo.GetOneAsync(req.body.hash);
    if (!categories) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(categories));
    console.log('Running GetCategoryDetail()');
    return true;
};

exports.AddNewCategory = async function (req, res) {
    // Generate a v1 (time-based) id
    req.body.hash = uuid.v1();
    let result = await categoryRepo.AddNewAsync(req.body);
    if (!result) {
        res.end('Create new category is not working!');
        return false;
    }
    res.end(JSON.stringify(result));
    console.log('Running Create New Category');
    return true;
};