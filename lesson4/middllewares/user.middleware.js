const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound, emailExist } = require('../errors/messageError');
const userValidator = require('../validators/user.validator');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(notFound.status, notFound.message);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByemail = await User.findOne({ email });

            if (userByemail) {
                throw new ErrorHandler(emailExist.status, emailExist.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    },
};
