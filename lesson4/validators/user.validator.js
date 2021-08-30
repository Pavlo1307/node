const Joi = require('joi');
const { EMAIL_REGEX, PASSWORD_REGEX } = require('../config/constans');
const { CURRENT_YEAR } = require('../config/variables');
const { userRolesEnum } = require('../config/userRoles.enum');

const girlsValidator = Joi.object({
    name: Joi.string(),
    age: Joi.number().min(15).max(60)
});

const createUserValidator = Joi.object({
    name: Joi.string().alphanum().min(2).max(30)
        .required()
        .trim(),
    password: Joi.string().regex(PASSWORD_REGEX).required(),
    born_year: Joi.number().min(CURRENT_YEAR - 120).max(CURRENT_YEAR - 6),
    email: Joi.string().regex(EMAIL_REGEX).required(),
    role: Joi.string().allow(...Object.values(userRolesEnum)),

    car: Joi.boolean(),

    girls: Joi.array()
        .items(girlsValidator)
        .when('car', { is: true, then: Joi.required() })
});

const updateUser = Joi.object({
    name: Joi.string().alphanum().min(2).max(30),
    email: Joi.string().regex(EMAIL_REGEX)
});

module.exports = {
    createUserValidator,
    updateUser
};
