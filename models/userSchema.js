const Joi = require('joi');
module.exports = userSchema = Joi.object({
        firstName: Joi.string().alphanum().min(2).max(30).required().trim(),
        lastName: Joi.string().alphanum().min(2).max(30).required().trim(),
        gender: Joi.allow('M', 'F'),
        phone: Joi.string(),
        email: Joi.string().email({ minDomainSegments: 2, tlds: { allow: ['com', 'net'] } }).trim().lowercase().required(),
        password: Joi.string().pattern(new RegExp('^[a-zA-Z0-9]{3,30}$')).required(),
        createdDate: Joi.date().default(Date.now),
});