const bcrypt = require('bcrypt');
const ExpressError = require('./ExpressError');
const userSchema = require('../models/userSchema');
const messageSchema = require('../models/messageSchema');

module.exports = helpers = {
    comparePassword: function (password, hash_password) {
        return bcrypt.compare(password, hash_password);
    },

    latestDate: (arr) => {
        let latestMessage = arr[0];
        let latestDate = latestMessage.createdDate;
        arr.forEach(message => {
            if (message.createdDate > latestDate) {
                latestDate = message.createdDate;
                latestMessage = message;
            }
        });
        return latestMessage;
    },

    catchAsync: func => {
        return (req, res, next) => {
            func(req, res, next).catch(e => next(e));
        }
    },

    validateUserCredentials: (req) => {
        const { error } = userSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            return new ExpressError(msg, 400);
        } else {
            return false;
        }
    },

    validateMessage: (req) => {
        const { error } = messageSchema.validate(req.body);
        if (error) {
            const msg = error.details.map(el => el.message).join(',');
            return new ExpressError(msg, 400);
        } else {
            return false;
        }
    },
}



