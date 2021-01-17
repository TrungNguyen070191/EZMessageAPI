'use strict'
// var mongoose = require('mongoose');
// var Schema = mongoose.Schema;
// var Account = new Schema(
//     {
//         _id: Schema.Types.ObjectId,
//         userId: Schema.Types.ObjectId,
//         userName: String,
//         password: String,
//         role: { type: Number, min: 0, max: 3, required: true },
//     })
// var AccountModel = mongoose.model('ipvn_account', Account);
// var query = AccountModel.findOne({ userName: "admin" }).populate('ipvn_account').exec(function (err, result) {
//     if (err) return console.log(err);
//     console.log(result);
//     // result contains an ordered list of 5 result who play Tennis
// });

var AccountModel = {
    _id: String,
    userId: String,
    userName: String,
    password: String,
    role: Number,
};

module.exports = AccountModel;