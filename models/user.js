// 'use strict';

// const mongoose = require('mongoose');
// const Schema = mongoose.Schema;
// const bcrypt = require('bcrypt');

// const userSchema = new Schema({
//     firstName: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     lastName: {
//         type: String,
//         trim: true,
//         required: true
//     },
//     gender: String,
//     phone: String,
//     email: {
//         type: String,
//         unique: true,
//         lowercase: true,
//         trim: true,
//         required: true,
//     },
//     password: {
//         type: String,
//         required: true
//     },
//     createdDate: {
//         type: Date,
//         default: Date.now
//     },
//     authToken: {
//         type: String
//     },
//     notiToken: [{
//         type: String
//     }]
// });

// userSchema.statics.findAndValidate = async function (email, password) {
//     const foundUser = await this.findOne({ email });
//     const isValid = await bcrypt.compare(password, foundUser.password);
//     return isValid ? foundUser : false;
// }

// userSchema.pre('save', async function (next) {
//     if (!this.isModified('password')) return next();
//     this.password = await bcrypt.hash(this.password, 12);
//     next();
// })

// // userSchema.methods.comparePassword = function (password) {
// //     return bcrypt.compareSync(password, this.password);
// // };

// module.exports = mongoose.model('User', userSchema);