// 'use strict';

// var mongoose = require('mongoose'),
//     bcrypt = require('bcrypt'),
//     Schema = mongoose.Schema;

/**
 * User Schema
 */
// var UserSchema = new Schema({
//     firstName: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     lastName: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     gender: String,
//     phone: String,
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         required: true
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     createdDate: {
//         type: Date,
//         default: Date.now
//     }
// });

// UserSchema.methods.comparePassword = function (password) {
//     return bcrypt.compareSync(password, this.password);
// };

// var UserModel = mongoose.model('User', UserSchema);

// module.exports = UserModel;

const sql = require("./db.js");

// constructor
const User = function(user) {
  this.name = user.name;
  this.role = user.role;
  this.workPlace = user.workPlace;
  this.city = user.city;
  this.createdDate = user.createdDate;
  this.onboardedDate = user.onboardedDate;
  this.onboardedDate = user.onboardedDate;
  this.status = user.status;
  this.isDeleted = user.isDeleted;
  this.password = user.password;
};

User.create = (newUser, result) => {
  sql.query("INSERT INTO user SET ?", newUser, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    console.log("created user: ", { id: res.insertId, ...newUser });
    result(null, { id: res.insertId, ...newUser });
  });
};

User.findById = (userId, result) => {
  sql.query(`SELECT * FROM user WHERE id = ${userId}`, (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(err, null);
      return;
    }

    if (res.length) {
      console.log("found customer: ", res[0]);
      result(null, res[0]);
      return;
    }

    // not found Customer with the id
    result({ kind: "not_found" }, null);
  });
};

User.getAll = result => {
  sql.query("SELECT * FROM user", (err, res) => {
    if (err) {
      console.log("error: ", err);
      result(null, err);
      return;
    }

    console.log("users: ", res);
    result(null, res);
  });
};

// module.exports = User;
