'use strict';
var jwt = require('jsonwebtoken'),
    jsonwebtoken = require("jsonwebtoken"),
    bcrypt = require('bcrypt'),
    uuid = require('uuid'),
    config = require("../common/config"),
    errors = require("../common/errorMessage"),
    Helpers = require('../common/helpers'),
    BlogRepository = require('../repositories/blogRepository'),
    blogRepo = new BlogRepository();

// USING FOR server.js
exports.GetAllBlogs = async function (req, res) {
    let blogs = await blogRepo.GetAllAsync();
    if (!blogs) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(blogs));
    console.log('Running GetAllBlogs()');
    return true;
};

exports.GetBlogDetail = async function (req, res) {
    let blog = await blogRepo.GetOneAsync(req.body.hash);
    if (!blog) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(blog));
    console.log('Running GetBlogDetail()');
    return true;
};

exports.GetBlogByCategory = async function (req, res) {
    let blogs = await blogRepo.GetManyAsync(req.body.hash);
    if (!blogs) {
        res.end(errors.serverNotFound);
        return false;
    }
    res.end(JSON.stringify(blogs));
    console.log('Running GetBlogDetail()');
    return true;
};

exports.AddNewBlog = async function (req, res) {
    // Generate a v1 (time-based) id
    req.body.hash = uuid.v1();
    let result = await blogRepo.AddNewAsync(req.body);
    if (!result) {
        res.end('Create new blog is not working!');
        return false;
    }
    res.end(JSON.stringify(result));
    console.log('Running Create New Blog');
    return true;
};