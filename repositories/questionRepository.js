"use strict";

var ObjectId = require("mongodb").ObjectID;
var enums = require("../common/constants");
var dbAccess = require("../dbAccess");
var ObjectID = require("mongodb").ObjectID;

var db = new dbAccess();

class QuestionRepository {
  constructor() {
    this.key = enums.collectionsName.APPLICATION;
  }

  async GetAllAsync() {
    return await db.GetAllAsync(this.key);
  }

  async GetOneAsync(_id) {
    return await db.GetOneAsync(this.key, { $or: [{ _id: ObjectID(_id) }] });
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
          version: data.version,
          listQuestion: data.listQuestion,
          isDeleted: data.isDeleted
        }
      }
    );
  }

  async DeleteOneAsync(data) {
    return await db.UpdateAsync(
      this.key,
      { _id: ObjectID(data._id) },
      {
        $set: {
          isDeleted: true
        }
      }
    );
  }

  async GetManyAsync(body) {
    let pipeLine = [];

    if (body.id) {
      pipeLine.push({ id: body.id });
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
}

module.exports = QuestionRepository;
