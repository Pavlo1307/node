const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const {
    BAD_REQUEST, FORBIDDEN, NOT_FOUND, CONFLICT
} = require('../errors/statusError');
const { notFound, alreadyExist } = require('../errors/messageError');

module.exports = {
    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, notFound);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    isUserPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (user) {
                throw new ErrorHandler(CONFLICT, alreadyExist);
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
                throw new ErrorHandler(FORBIDDEN, 'Forbidden');
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

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
