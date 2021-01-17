"use strict";

var ObjectId = require("mongodb").ObjectID;
var enums = require("../common/constants");
var dbAccess = require("../dbAccess");
var ObjectID = require("mongodb").ObjectID;

var db = new dbAccess();

class UserRepository {
  constructor() {
    this.key = enums.collectionsName.USER;
  }

  async GetAllAsync() {
    return await db.GetAllAsync(this.key);
  }

  async SignIn(userName, password) {
    return await db.GetOneAsync(this.key, { $or: [{ userName: userName, password: password }] });
  }

  async AddNewAsync(data) {
    return await db.AddNewAsync(this.key, data);
  }

  async UpdateOneAsync(data) {
    return await db.UpdateAsync(
      this.key,
      { _id: ObjectID(data._id) },
      {
        $set: {
          name: data.name,
          role: data.role,
          address: data.address,
          phoneNumber: data.phoneNumber,
          createdDate: data.createdDate,
          onboardedDate: data.onboardedDate,
          listLocationID: data.listLocationID,
          userName: data.userName,
          password: data.password,
          isDeleted: data.isDeleted
        }
      }
    );
  }

  async GetManyAsync(body) {
    let pipeLine = [];
    if (body.fromDate && body.toDate) {
      pipeLine.push({
        createdDate: { $gte: body.fromDate, $lte: body.toDate }
      });
    }
    if (body.id) {
      pipeLine.push({ id: body.id });
    }
    if (body.isDeleted) {
      pipeLine.push({ isDeleted: body.isDeleted });
    }
    if (body.searchKey) {
      pipeLine.push({
        name: new RegExp(body.searchKey.toLowerCase(), "i")
      });
    }
    if (!body.sortColumn) {
      body.sortColumn = "name";
    }
    if (!body.sortType) {
      body.sortType = 1;
    }
    if (!body.fromDate) {
      pipeLine.push({
        createdDate: { $gte: "2011-10-05T14:48:00.000Z", $lte: "2030-10-05T14:48:00.000Z" }
      });
    }
    if (pipeLine.length === 0 && !body.pageSize && !body.currentPage) {
      return await db.GetAllAsync(this.key);
    }
    return await db.GetManyAsync(
      this.key,
      {
        $and: pipeLine
      },
      body
    );
  }

  async GetOneAsync(hash) {
    return await db.GetOneAsync(this.key, { $or: [{ _id: ObjectID(hash) }] });
  }
}

module.exports = UserRepository;
