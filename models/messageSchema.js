const Joi = require('joi');
module.exports = messageSchema = Joi.object({
    body: Joi.string().required().trim(),
    createdDate: Joi.date().default(Date.now),
    from: Joi.object(),
    to: Joi.object(),
})