"use strict";
var uuid = require("uuid"),
  errors = require("../common/errorMessage"),
  SurveyRepository = require("../repositories/surveyRepository"),
  surveyRepo = new SurveyRepository();

// USING FOR server.js
exports.GetAllSurveys = async function(req, res) {
  let surveys = await surveyRepo.GetAllAsync();
  if (!surveys) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(surveys));
  console.log("Running GetAllSurveys()");
  return true;
};

exports.GetSurveyById = async function(req, res) {
  let survey = await surveyRepo.GetOneAsync(req.body.hash);
  if (!survey) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(survey));
  console.log("Running GetSurveyById()");
  return true;
};

exports.AddNewSurvey = async function(req, res) {
  // Generate a v1 (time-based) id
  req.body.hash = uuid.v1();
  let result = await surveyRepo.AddNewAsync(req.body);
  if (!result) {
    res.end("Create new survey is not working!");
    return false;
  }
  res.end(JSON.stringify(result));
  console.log("Running Create New Survey");
  return true;
};
