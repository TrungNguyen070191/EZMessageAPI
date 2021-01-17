'use strict';
var jwt = require('jsonwebtoken'),
    jsonwebtoken = require("jsonwebtoken"),
    bcrypt = require('bcrypt'),
    uuid = require('uuid'),
    config = require("../common/config"),
    errors = require("../common/errorMessage"),
    Helpers = require('../common/helpers'),
    ContactRepository = require('../repositories/contactRepository'),
    contactRepo = new ContactRepository();

// USING FOR server.js
exports.GetAllContacts = async function (req, res) {
    let contacts = await contactRepo.GetAllAsync();
    if (!contacts) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(contacts));
    console.log('Running GetAllContacts()');
    return true;
};

exports.GetContactDetail = async function (req, res) {
    let contact = await contactRepo.GetOneAsync(req.body.hash);
    if (!contact) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(contact));
    console.log('Running GetContactDetail()');
    return true;
};

exports.GetContactByCategory = async function (req, res) {
    let contacts = await contactRepo.GetManyAsync(req.body.hash);
    if (!contacts) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(contacts));
    console.log('Running GetContactDetail()');
    return true;
};

exports.AddNewContact = async function (req, res) {
    // Generate a v1 (time-based) id
    req.body.hash = uuid.v1();
    let result = await contactRepo.AddNewAsync(req.body);
    if (!result) {
        res.end('Create new contact is not working!');
        return false;
    }
    res.end(JSON.stringify(result));
    console.log('Running Create New Contact');
    return true;
};