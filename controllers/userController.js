"use strict";
const jwt = require("jsonwebtoken");
const jsonwebtoken = require("jsonwebtoken");
const bcrypt = require("bcrypt");
const config = require("../common/config");
const errors = require("../common/errorMessage");
const helpers = require("../common/helpers");
const UserRepository = require("../repositories/userRepository");
const UserRepo = new UserRepository();
  // User = require("../models/user");

// USING FOR server.js
exports.register = async function (req, res, next) {
  const dup = await UserRepo.GetOneAsync(req.body.email);
  if (dup) {
    res.status(500).json({
      status: 500,
      message: errors.duplicatedIndex
    });
    return false;
  }
  req.body.password = bcrypt.hashSync(req.body.password, 12);
  req.body.createdDate = new Date();
  const invalid = helpers.validateUserCredentials(req);
  if(invalid) {
    return res.send(JSON.stringify(invalid));
  }
  // const newUser = new User(req.body);
  let result = await UserRepo.AddNewAsync(req.body);
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

exports.login = async function (req, res, next) {
  let user = await UserRepo.GetOneAsync(req.body.email, req.body.password);
  if (!user) {
    res.status(401).json({
      status: 401,
      message: errors.authIncorrect
    });
    return false;
  } else {
    if (!helpers.comparePassword(req.body.password, user.password)) {
      res.status(401).json({
        status: 401,
        message: errors.authIncorrect
      });
    } else {
      console.log("User Logged In!");
      const exp = new Date();
      user.authToken = jwt.sign(
        {
          email: user.email,
          _id: user._id,
          exp: exp.setMinutes(exp.getMinutes() + config.jwtToken.expires)
        },
        config.jwtToken.secret
      );
      await UserRepo.UpdateOneAsync(user);
      res.status(200).json
        ({
          authToken: user.authToken
        });
    }
  }
};

exports.IsAuthenticated = function (req, res, next) {
  if (
    req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === config.jwtToken.key
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
          console.log(req.user.exp, req.user._id, req.params.user_id);
          if (current.getTime() > req.user.exp) {
            return res.json({ message: errors.unauthorized });
          }
          if (req.params.user_id !== req.user._id) {
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

exports.updateUser = async (req, res, next) => {
  let user = await UserRepo.UpdateOneAsync(req.userId, req.body);
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

