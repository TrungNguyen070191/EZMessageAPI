const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const enums = require('../common/constants');

const messageSchema = new Schema({
    body: {
        type: String,
        required: true
    },
    createdDate: {
        type: Date,
        default: Date.now,
        required: true
    },
    from: {
        type: Schema.Types.ObjectId,
        ref: enums.collectionsName.USER
    },
    to: {
        type: Schema.Types.ObjectId,
        ref: enums.collectionsName.USER
    },
});

module.exports = mongoose.model(enums.collectionsName.MESSAGE, messageSchema);