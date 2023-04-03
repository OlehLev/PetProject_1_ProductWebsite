const Joi = require("joi");

const { PASSWORD_REGEXP, EMAIL_REGEXP } = require('../configs/constants');
const userRoles = require("../configs/userRoles");

const createUserValidator = Joi.object ({
    first_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    family_name: Joi.string()
        .alphanum()
        .min(2)
        .max(30)
        .trim()
        .required(),
    email: Joi.string()
        .regex(EMAIL_REGEXP)
        .trim()
        .required(),
    phone_number: Joi.string()
        .trim()
        .replace(/[+()-]/g,"")
        .required(),
    password: Joi.string()
        .regex(PASSWORD_REGEXP)
        .trim()
        .required(),
    roles: Joi.string()
        .trim()
        .allow(...Object.values(userRoles))
});

module.exports = { createUserValidator };
