"use strict";

var ObjectId = require("mongodb").ObjectID;
var enums = require("../common/constants");
var dbAccess = require("../dbAccess");
var ObjectID = require("mongodb").ObjectID;

var db = new dbAccess();

class ApplicationRepository {
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
          type: data.type,
          idAssignee: data.idAssignee,
          createdDate: data.createdDate,
          assignedDate: data.assignedDate,
          appointmentDate: data.appointmentDate,
          completedDate: data.completedDate,
          questionData: {
            id: Data.questionData.id,
            answerList: Data.questionData.answerList
          },
          address: data.address,
          customerData: data.idCustomerData,
          location: {
            latitude: data.location.latitude,
            longitute: data.location.longitute
          },
          status: data.status,
          isDeleted: data.isDeleted
        }
      }
    );
  }

  async UpdateOneByAsync(data) {
    return await db.UpdateAsync(
      this.key,
      { _id: ObjectID(data._id) },
      {
        $set: {
          name: data.name,
          type: data.type,
          idAssignee: data.idAssignee,
          createdDate: data.createdDate,
          assignedDate: data.assignedDate,
          appointmentDate: data.appointmentDate,
          completedDate: data.completedDate,
          address: Data.address,
          questionData: {
            id: Data.questionData.id,
            answerList: Data.questionData.answerList
          },
          customerData: {
            id: data.customerData.id,
            name: data.customerData.name,
            pID: data.customerData.pID,
            phoneNumber: data.customerData.phoneNumber
          },
          imageData: {
            front: data.listImages.front,
            identify: data.listImages.identify,
            addition: data.listImages.addition
          },
          status: data.status,
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
    if (body.idAssignee) {
      pipeLine.push({ idAssignee: body.idAssignee });
    }
    if (body.status && body.status.toLowerCase() !== "all") {
      pipeLine.push({
        status: new RegExp("^" + body.status.toLowerCase(), "i")
      });
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
        createdDate: {
          $gte: "2011-10-05T14:48:00.000Z",
          $lte: "2030-10-05T14:48:00.000Z"
        }
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
}

module.exports = ApplicationRepository;
