'use strict';

var mongoose = require('mongoose'),
    bcrypt = require('bcrypt'),
    Schema = mongoose.Schema;

/**
 * User Schema
 */
var ProductSchema = new Schema({
    hash: String,
    name: {
        type: String,
        trim: true,
        required: true
    },
    price: {
        type: Number,
        trim: true,
        required: true
    },
    main_image: {
        type: String,
        required: true
    },
    short_description: {
        type: String,
        required: true
    },
    description: {
        type: String,
        required: true
    },
    images: [
        {
            type: String,
            required: true
        }
    ],
    createdDate: {
        type: Date,
        default: Date.now
    }
});

UserSchema.methods.comparePassword = function (password) {
    return bcrypt.compareSync(password, this.password);
};


var UserModel = mongoose.model('User', UserSchema);

module.exports = UserModel;