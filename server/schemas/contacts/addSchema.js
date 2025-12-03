const Joi = require("joi");

const addSchema = Joi.object({
    connectCode: Joi.string().required(),
    fullName: Joi.string().required(),
    username: Joi.string().required(),
    email: Joi.string().required(),
    image: Joi.string(),
})

module.exports = addSchema;

