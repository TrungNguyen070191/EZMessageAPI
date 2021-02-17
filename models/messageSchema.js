const Joi = require('joi');
module.exports = messageSchema = Joi.object({
    body: Joi.string().required(),
    createdDate: Joi.date().default(Date.now).required(),
    from: Joi.any().required(),
    to: Joi.any().required(),
})