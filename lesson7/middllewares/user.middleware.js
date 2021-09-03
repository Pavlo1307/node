const { USER } = require('../dataBase');
const { errorHandler } = require('../errors');
const { statusErr: { FORBIDDEN, NOT_FOUND, CONFLICT } } = require('../errors');
const { messageError: { notFound, alreadyExist } } = require('../errors');

module.exports = {
    isUserNotPresent: (req, res, next) => {
        try {
            const { user } = req;

            if (!user) {
                throw new errorHandler.ErrorHandler(NOT_FOUND, notFound);
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
                throw new errorHandler.ErrorHandler(CONFLICT, alreadyExist);
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
                throw new errorHandler.ErrorHandler(FORBIDDEN, 'Forbidden');
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    getUserByDynamicParam: (paramName, searchIn = 'body', dbId = paramName) => async (req, res, next) => {
        try {
            const value = req[searchIn][paramName];
            const user = await USER.findOne({ [dbId]: value });

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    }
};
