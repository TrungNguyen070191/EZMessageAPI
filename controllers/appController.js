"use strict";
var uuid = require("uuid"),
  errors = require("../common/errorMessage"),
  ApplicationRepository = require("../repositories/applicationRepository"),
  applicationRepo = new ApplicationRepository();

// USING FOR server.js
exports.GetAllApplications = async function(req, res) {
  let applications = await applicationRepo.GetAllAsync();
  if (!applications) {
    res.status(500).json({
      status: 500,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Apps successfully!",
    results: applications
  });
  console.log("Running GetAllApplications()");
  return true;
};

exports.GetApplicationById = async function(req, res) {
  let application = await applicationRepo.GetOneAsync(req.body._id);
  if (!application) {
    res.status(404).json({
      status: 404,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching App successfully!",
    results: application
  });
  console.log("Running GetApplicationById()");
  return true;
};

exports.AddNewApplication = async function(req, res) {
  // Generate a v1 (time-based) id
  req.body.hash = uuid.v1();
  let result = await applicationRepo.AddNewAsync(req.body);
  if (!result) {
    res.status(500).json({
      status: 500,
      message: "Create new application is not working!"
    });
    return false;
  }
  res.status(201).json({
    status: 201,
    message: "App added successfully",
    result: {
      ...result,
      id: createdPost._id
    }
  });
  console.log("Running Create New Application");
  return true;
};

exports.UpdateApp = async (req, res, next) => {
  let app = await applicationRepo.UpdateOneAsync(req.body);
  if (app.n <= 0) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  } else {
    res.status(200).json({
      status: 200,
      message: "Update successful!"
    });
  }
};

exports.UpdateByAgent = async (req, res, next) => {
  let app = await applicationRepo.UpdateOneByAsync(req.body);
  if (app.n <= 0) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  } else {
    res.status(200).json({
      status: 200,
      message: "Update successful!"
    });
  }
};

exports.GetAppsByFilter = async function(req, res) {
  let apps = await applicationRepo.GetManyAsync(req.body);
  if (!apps) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching App successfully!",
    results: apps
  });
  console.log("Running GetAppsByFilter()");
  return true;
};