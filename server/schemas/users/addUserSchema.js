const Joi = require("joi");

const emailRegexp = /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/;

const addUserSchema = Joi.object({
  username: Joi.string().required(),
  email: Joi.string().email().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
  avatarImage: Joi.string().uri().optional(),
});

const addLoginUserSchema = Joi.object({
  email: Joi.string().email().required().pattern(emailRegexp),
  password: Joi.string().min(6).required(),
});

const emailUserSchema = Joi.object({
  email: Joi.string().email().required().pattern(emailRegexp),
});

module.exports = {
  addUserSchema,
  addLoginUserSchema,
  emailUserSchema,
};
