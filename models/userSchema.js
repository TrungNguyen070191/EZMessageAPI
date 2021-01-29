const Joi = require('joi');
module.exports = userSchema = Joi.object({
        firstName: Joi.string().required().trim(),
        lastName: Joi.string().required().trim(),
        gender: Joi.string(),
        phone: Joi.string(),
        email: Joi.string().email().lowercase().trim().required(),
        password: Joi.any().required(),
        createdDate: Joi.date().default(Date.now),
        authToken: Joi.string(),
        notiToken: Joi.array(),
});