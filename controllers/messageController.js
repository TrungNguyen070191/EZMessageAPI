'use strict';
const errors = require("../common/errorMessage");
const helpers = require("../common/helpers");
const ObjectID = require('mongodb').ObjectID;
const Message = require("../models/message");
const MessageRepository = require('../repositories/messageRepository');
const messageRepo = new MessageRepository();
const UserRepository = require("../repositories/userRepository");
const UserRepo = new UserRepository();

// USING FOR server.js
exports.getAll = async function (req, res) {
  const messages = await messageRepo.GetManyAsync(ObjectID(req.params.user_id));
  console.log(messages);
  if (!messages) {
    res.end(errors.serverNotFound);
    return false;
  }
  res.end(JSON.stringify(messages));
  console.log('Running GetAllMessages()');
  return true;
};

exports.getMessageLatest = async function (req, res) {

  const messages = await messageRepo.GetManyAsync(ObjectID(req.params.user_id));
  if (!messages) {
    res.end(errors.serverNotFound);
    return false;
  }
  if (messages.length === 0) {
    res.end(errors.noMessage);
    return false;
  }
  const latestMessage = helpers.latestDate(messages);
  res.end(JSON.stringify(latestMessage));
  console.log('Running GetAllMessages()');
  return true;
};

exports.addNewmessage = async function (req, res) {
  const { user_id, to_user_id } = req.params;
  req.body.from = ObjectID(user_id);
  req.body.to = ObjectID(to_user_id);
  const receiver = await UserRepo.GetOneAsync(req.body.to);
  console.dir(req.body.to);
  if (!receiver) {
    res.end(errors.invalidReceiver);
    return false;
  }
  req.body.createdDate = new Date();
  const invalidMessage = helpers.validateMessage(req, res);
  if(invalidMessage) {
    return res.send(JSON.stringify(invalidMessage));
  }
  let newMessage = new Message(req.body);
  newMessage = await messageRepo.AddNewAsync(newMessage);

  if (!newMessage) {
    res.end('Create new message is not working!');
    return false;
  }
  res.end(JSON.stringify(newMessage));
  console.log('Running Create New message');
  return true;
};

exports.getMessageById = async function (req, res, next) {
    let message = await messageRepo.GetOneAsync(ObjectID(req.params.id));
    if (!message) {
      res.end(errors.noMessage);
      return false;
    }
    res.end(JSON.stringify(message));
    console.log('Running GetMessageById()');
    return true;
};




