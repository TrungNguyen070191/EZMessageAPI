"use strict";
const jwt = require("jsonwebtoken"),
  jsonwebtoken = require("jsonwebtoken"),
  bcrypt = require("bcrypt"),
  config = require("../common/config"),
  errors = require("../common/errorMessage"),
  Helpers = require("../common/helpers"),
  PusherRepository = require("../repositories/pusherRepository"),
  pusherRepo = new PusherRepository();

// USING FOR server.js
exports.updateToken = async (req, res, next) => {
    res.send("COMING SOON");
}

exports.getTokens = async (req, res, next) => {
    res.send("COMING SOON");
}

exports.sendNotification = async (req, res, next) => {
    res.send("COMING SOON");
}

exports.getNotification = async (req, res, next) => {
    res.send("COMING SOON");
}
// exports.register = async function (req, res) {
//   const dup = await UserRepo.GetOneAsync(req.body.email);
//   if (dup) {
//     res.status(500).json({
//       status: 500,
//       message: errors.duplicatedIndex
//     });
//     return false;
//   }
//   req.body.password = bcrypt.hashSync(req.body.password, 12);
//   req.body.createdDate = new Date();
//   const newUser = new User(req.body);
//   let result = await UserRepo.AddNewAsync(newUser);
//   if (!result) {
//     res.status(500).json({
//       status: 500,
//       message: errors.ivalidCredentials
//     });
//     return false;
//   }
//   res.status(201).json({
//     status: 201,
//     message: "User created successfully",
//     result: {
//       ...result,
//       id: result.id
//     }
//   });
//   console.log("Running Register Account()");
//   return true;
// };

// exports.login = async function (req, res) {
//   let user = await UserRepo.GetOneAsync(req.body.email, req.body.password);
//   if (!user) {
//     res.status(401).json({
//       status: 401,
//       message: errors.userNotFound
//     });
//     return false;
//   } else {
//     if (!Helpers.comparePassword(req.body.password, user.password)) {
//       res.status(401).json({
//         status: 401,
//         message: errors.pwdIncorrect
//       });
//     } else {
//       console.log("User Logged In!");
//       const exp = new Date();
//       user.token = jwt.sign(
//         {
//           email: user.email,
//           _id: user._id,
//           exp: exp.setMinutes(exp.getMinutes() + config.jwtToken.expires)
//         },
//         config.jwtToken.secret
//       );
//       await UserRepo.UpdateOneAsync(user);
//       res.status(200).json
//         ({
//           token: user.token
//         });
//     }
//   }
// };

// exports.IsAuthenticated = function (req, res, next) {
//   if (
//     req.headers && req.headers.authorization && req.headers.authorization.split(" ")[0] === config.jwtToken.key
//   ) {
//     jsonwebtoken.verify(
//       req.headers.authorization.split(" ")[1],
//       config.jwtToken.secret,
//       function (err, decode) {
//         if (err || decode === undefined) {
//           req.user = undefined;
//           return res.json({ message: errors.unauthorized });
//         } else {
//           req.user = decode;
//           var current = new Date();
//           console.log(decode.exp, decode._id, req.params.user_id);
//           if (current.getTime() > decode.exp) {
//             return res.json({ message: errors.unauthorized });
//           }
//           if (req.params.user_id !== decode._id) {
//             return res.json({ message: errors.unauthorized });
//           }
//           return next();
//         }
//       }
//     );
//   } else {
//     req.user = undefined;
//     return res.json({ message: errors.unauthorized });
//   }
// };

// exports.updateUser = async (req, res, next) => {
//   let user = await UserRepo.UpdateOneAsync(req.userId, req.body);
//   console.log(user);
//   if (!user) {
//     res.status(401).json({
//       status: 401,
//       message: "Not authorized!"
//     });
//     return false;
//   } else {
//     res.status(200).json({
//       status: 200,
//       message: "Update successful!"
//     });
//   }
// };