const { USER } = require('../dataBase');
const { ErrorHandler } = require('../errors');
const { statusErr: { FORBIDDEN, NOT_FOUND, CONFLICT } } = require('../errors');
const {
    messageError: {
        notFound, alreadyExist, forbidden, idFalse
    }
} = require('../errors');

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
                throw new ErrorHandler(FORBIDDEN, forbidden);
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
    },

    CheckUserForUpdate: (req, res, next) => {
        try {
            const { params: { user_id }, loginUser: { _id } } = req;
            if (user_id !== _id.toString()) {
                throw new ErrorHandler(FORBIDDEN, idFalse);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
