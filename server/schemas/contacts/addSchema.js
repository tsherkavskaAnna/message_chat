const Joi = require("joi");

const addSchema = Joi.object({
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    image: Joi.string(),
    owner: Joi.string(),
})

module.exports = { addSchema };

