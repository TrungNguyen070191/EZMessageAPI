"use strict";
const MongoClient = require("mongodb").MongoClient;
const pwd = encodeURIComponent(process.env.DB_PWD);
const url =
  process.env.DB_PRECONNECTSTRING + pwd + process.env.DB_SUFCONNECTSTRING;
// const url = process.env.DB_LOCALCONNECTIONSTRING;
const dbName = process.env.DB_NAME;
// const mongoose = require('mongoose');
// mongoose.Promise = global.Promise;
// mongoose.connect(url);
const mysql = require("mysql");
const connection = mysql.createConnection({
  host: process.env.DB_MYSQL_HOST,
  user: process.env.DB_MYSQL_USER,
  password: process.env.DB_MYSQL_PASSWORD,
  database: process.env.DB_MYSQL_NAME
});

class DBAccess {
  async TestConnectDb() {
    connection.connect(error => {
      if (error) throw error;
      console.log("Successfully connected to the database.");
    });
  }

  async GetOneAsync(collectionName, filter) {
    let client;

    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      let db = client.db(dbName);
      let result = await db.collection(collectionName).findOne(filter);
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async GetManyAsync(collectionName, filter, body) {
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      let db = client.db(dbName);
      if (body.pageSize && body.currentPage) {
        return await db
          .collection(collectionName)
          .find({})
          .filter(filter)
          .limit(body.pageSize)
          .skip((body.currentPage - 1) * body.pageSize)
          .sort(body.sortColumn, body.sortType)
          .toArray();
      } else {
        return await db
          .collection(collectionName)
          .find({})
          .filter(filter)
          .sort(body.sortColumn, body.sortType)
          .toArray();
      }
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async GetAllAsync(collectionName) {
    const pipeLine = [{ isDeleted: false }];
    let client;
    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      let db = client.db(dbName);
      return await db
        .collection(collectionName)
        .find()
        .filter({
          $and: pipeLine
        })
        .toArray();
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async AddNewAsync(collectionName, data) {
    let client;

    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      let db = client.db(dbName);
      let result = await db.collection(collectionName).insertOne(data);
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  async UpdateAsync(collectionName, filter, data) {
    let client;

    try {
      client = await MongoClient.connect(url, { useNewUrlParser: true });
      let db = client.db(dbName);
      let result = await db.collection(collectionName).updateOne(filter, data);
      return result;
    } catch (err) {
      console.error(err);
    } finally {
      if (client) {
        client.close();
      }
    }
  }

  DeleteAsync(collectionName, condition) {
    return new Promise((resolve, reject) => {
      return client.connect(url).then(db => {
        db.collection(collectionName)
          .deleteOne(condition)
          .then(result => {
            db.close();
            console.log("Collection is closed!");
            return resolve(true);
          });
      });
    }).catch(err => {
      return reject(err);
    });
  }
}

module.exports = DBAccess;
