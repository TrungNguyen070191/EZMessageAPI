"use strict";
var uuid = require("uuid"),
  errors = require("../common/errorMessage"),
  QuestionRepository = require("../repositories/questionRepository"),
  questionRepo = new QuestionRepository();

// USING FOR server.js
exports.GetAll = async function(req, res) {
  let questions = await questionRepo.GetAllAsync();
  if (!questions) {
    res.status(500).json({
      status: 500,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Questions successfully!",
    results: questions
  });
  console.log("Running GetAllQuestions()");
  return true;
};

exports.GetById = async function(req, res) {
  let question = await questionRepo.GetOneAsync(req.body._id);
  if (!question) {
    res.status(404).json({
      status: 404,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Question successfully!",
    results: question
  });
  res.end(JSON.stringify(question));
  console.log("Running GetQuestionById()");
  return true;
};

exports.AddNew = async function(req, res) {
  // Generate a v1 (time-based) id
  req.body.hash = uuid.v1();
  let result = await questionRepo.AddNewAsync(req.body);
  if (!result) {
    res.status(500).json({
      status: 500,
      message: "Create new question is not working!"
    });
    return false;
  }
  res.status(201).json({
    status: 201,
    message: "Question added successfully",
    result: {
      ...result,
      id: result._id
    }
  });
  console.log("Running Create New question");
  return true;
};

exports.Update= async (req, res, next) => {
  let question = await questionRepo.UpdateOneAsync(req.body);
  console.log(question);
  if (question.n <= 0) {
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

exports.Delete = async (req, res, next) => {
  let question = await questionRepo.DeleteOneAsync(req.body);
  if (question.n <= 0) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  } else {
    res.status(200).json({
      status: 200,
      message: "Delete successful!"
    });
  }
};

exports.GetByFilter = async function(req, res) {
  let questions = await questionRepo.GetManyAsync(req.body);
  if (!questions) {
    res.status(401).json({
      status: 401,
      message: "Not authorized!"
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching question successfully!",
    results: questions
  });
  console.log("Running GetQuestionsByFilter()");
  return true;
};
