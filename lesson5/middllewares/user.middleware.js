const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound, alreadyExist } = require('../errors/messageError');
const { userValidator } = require('../validators');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(400, notFound);
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
            const userByEmail = await User.findOne({ email });

            if (userByEmail) {
                throw new ErrorHandler(400, alreadyExist);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateUserBody: (req, res, next) => {
        try {
            const { error } = userValidator.createUserValidator.validate(req.body);
            console.log(error);
            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    },
};
