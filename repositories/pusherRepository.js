"use strict";

var enums = require("../common/constants");
var dbAccess = require("../dbAccess");

var db = new dbAccess();

class PusherRepository {
  constructor() {
    this.key = enums.collectionsName.PUSHER;
  }

  // User Login
  async GetOneAsync(email, password) {
    return await db.GetOneAsync(this.key, { $or: [{ email: email }, { password: password }] });
  }

  // User Register
  async AddNewAsync(data) {
    return await db.AddNewAsync(this.key, data);
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

module.exports = PusherRepository;
