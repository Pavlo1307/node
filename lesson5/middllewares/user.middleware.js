const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound, alreadyExist } = require('../errors/messageError');

module.exports = {
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

    checkUserRoleMiddleware: (roleArr = []) => (req, res, next) => {
        try {
            const { role } = req.user;

            if (!roleArr.length) {
                return next();
            }
            if (!roleArr.includes(role)) {
                throw new ErrorHandler(403, 'Forbidden');
            }

            next();
        } catch (e) {
            next(e);
        }
    },
    getUserByDynamicParam: (paramName, searchIn = 'body', dbId = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await User.findOne({ [dbId]: value });

            if (!user) {
                throw new ErrorHandler(400, notFound);
            }

            req.user = user;

            next();
        } catch (e) {
            next(e);
        }
    }
};
