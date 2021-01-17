"use strict";
var jwt = require("jsonwebtoken"),
  jsonwebtoken = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  config = require("../common/config"),
  errors = require("../common/errorMessage"),
  Helpers = require("../common/helpers"),
  UserRepository = require("../repositories/userRepository"),
  userRepo = new UserRepository(),
  User = require("../models/user.model");

// USING FOR server.js
exports.GetAllUsers = async function (req, res) {
  let users = await userRepo.GetAllAsync();
  if (!users) {
    res.status(500).json({
      status: 500,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching Users successfully!",
    results: users
  });
  console.log("Running GetAllUser()");
  return true;
};

exports.Register = async function (req, res) {
  req.body.password = bcrypt.hashSync(req.body.password, 10);
  let result = await userRepo.AddNewAsync(req.body);
  if (!result) {
    res.status(500).json({
      status: 500,
      message: errors.ivalidCredentials
    });
    return false;
  }
  res.status(201).json({
    status: 201,
    message: "User created successfully",
    result: {
      ...result,
      id: result.id
    }
  });
  console.log("Running Register Account()");
  return true;
};

exports.SignIn = async function (req, res) {
  let user = await userRepo.SignIn(req.body.userName, req.body.password);
  if (!user) {
    res.status(401).json({
      status: 401,
      message: errors.userNotFound
    });
    return false;
  } else {
    if (!Helpers.comparePassword(req.body.password, user.password)) {
      res.status(401).json({
        status: 401,
        message: errors.pwdIncorrect
      });
    } else {
      var exp = new Date();
      res.status(200).json({
        token: jwt.sign(
          {
            userName: user.userName,
            name: user.name,
            _id: user._id,
            exp: exp.setMinutes(exp.getMinutes() + config.jwtToken.expires)
          },
          config.jwtToken.secret
        ),
        expiresIn: exp.setMinutes(exp.getMinutes() + config.jwtToken.expires),
        userId: user._id
      });
    }
  }
};

exports.UpdateUser = async (req, res, next) => {
  let user = await userRepo.UpdateOneAsync(req.body);
  console.log(user);
  if (!user) {
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

exports.GetAllUsersByFilter = async function (req, res) {
  let users = await userRepo.GetManyAsync(req.body);
  if (!users) {
    res.status(401).json({
      status: 401,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Users fetched successfully!",
    result: users
  });
  console.log("Running GetAllUserByFilter()");
  return true;
};

exports.IsAuthenticated = function (req, res, next) {
  if (
    req.headers &&
    req.headers.authorization &&
    req.headers.authorization.split(" ")[0] === config.jwtToken.key
  ) {
    jsonwebtoken.verify(
      req.headers.authorization.split(" ")[1],
      config.jwtToken.secret,
      function (err, decode) {
        if (err || decode === undefined) {
          req.user = undefined;
          return res.json({ message: errors.unauthorized });
        } else {
          req.user = decode;
          var current = new Date();
          if (current.getTime() > decode.exp) {
            return res.json({ message: errors.unauthorized });
          }
          return next();
        }
      }
    );
  } else {
    req.user = undefined;
    return res.json({ message: errors.unauthorized });
  }
};

exports.GetUserById = async function (req, res) {
  let user = await userRepo.GetOneAsync(req.body._id);
  if (!user) {
    res.status(404).json({
      status: 404,
      message: errors.serverNotFound
    });
    return false;
  }
  res.status(200).json({
    status: 200,
    message: "Fetching User successfully!",
    results: user
  });
  console.log("Running GetUserById()");
  return true;
};

exports.create = (req, res) => {
  // Validate request
  if (!req.body) {
    res.status(400).send({
      message: "Content can not be empty!"
    });
  }

  // Create a Customer
  const user = new User({
    name: req.body.name,
    role: req.body.role,
    workPlace: req.body.workPlace,
    city: req.body.city,
    status: req.body.status,
    isDeleted: req.body.isDeleted,
    password: req.body.password
  });

  // Save user in the database
  User.create(user, (err, data) => {
    if (err)
      res.status(500).send({
        message:
          err.message || "Some error occurred while creating the Customer."
      });
    else res.send(data);
  });
};

// USING FOR api.js
class UserController {
  async GetAllUsers(req, res) {
    let users = await userRepo.GetAllAsync();
    if (users === null || users === undefined) {
      res.end(errors.userNotFound);
      return false;
    }
    res.end(JSON.stringify(users));
    console.log("Running GetAllUser()");
    return true;
  }
}

// module.exports = UserController;
