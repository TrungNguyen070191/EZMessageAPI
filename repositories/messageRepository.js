'use strict';
const enums = require('../common/constants');
const dbAccess = require('../dbAccess');

const db = new dbAccess();

class MessageRepository {
    constructor() {
        this.key = enums.collectionsName.MESSAGE;
    }

    // Get Message by MessageID
    async GetOneAsync(id) {
        return await db.GetOneAsync(this.key, { $or: [{ _id: id }] });
    }

    // Get All Messages by UserID + // Get Latest Message
    async GetManyAsync(user_id) {
        return await db.GetManyAsync(this.key, { $or: [{ from: user_id }] });
    }

    // Create New Message
    async AddNewAsync(data) {
        return await db.AddNewAsync(this.key, data);
    }
}

module.exports = MessageRepository;