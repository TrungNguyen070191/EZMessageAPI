"use strict";

var enums = require("../common/constants");
var dbAccess = require("../dbAccess");

var db = new dbAccess();

class UserRepository {
  constructor() {
    this.key = enums.collectionsName.USER;
  }

  // User Login
  async GetOneAsync(data) {
    return await db.GetOneAsync(this.key,{ $or: [{ email: data }, { _id: data }] });
  }

  // User Register
  async AddNewAsync(data) {
    return await db.AddNewAsync(data);
  }

  // User Update
  async UpdateOneAsync(data) {
    return await db.UpdateAsync(
      this.key,
      { _id: data._id },
      {
        $set: {
          token: data.token
        }
      }
    );
  }
}

module.exports = UserRepository;
