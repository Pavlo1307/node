const Joi = require('joi');
const { regexpEnum } = require('../config');

const authValidator = Joi.object({
    email: Joi.string().regex(regexpEnum.EMAIL_REGEXP).trim().required(),
    password: Joi.string().regex(regexpEnum.PASSWORD_REGEXP).trim().required()
});

module.exports = { authValidator };
