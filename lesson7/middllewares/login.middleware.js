const { Login } = require('../dataBase');
const { jwtService: { varifyToken } } = require('../service');
const { statusErr: { Unauthorized } } = require('../errors');
const { messageError: { noToken, InvalidToken } } = require('../errors');
const { ErrorHandler } = require('../errors');
const { constants: { authorization } } = require('../config');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const access_token = req.get(authorization);

            if (!access_token) {
                throw new ErrorHandler(Unauthorized, noToken);
            }

            await varifyToken(access_token);

            const tokenFromDB = await Login.findOne({ access_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(Unauthorized, InvalidToken);
            }

            next();
        } catch (e) {
            next(e);
        }
    },

    validateRefreshToken: async (req, res, next) => {
        try {
            const refresh_token = req.get(authorization);

            if (!refresh_token) {
                throw new ErrorHandler(Unauthorized, noToken);
            }

            await varifyToken(refresh_token, 'refresh');

            const tokenFromDB = await Login.findOne({ refresh_token }).populate('user');

            if (!tokenFromDB) {
                throw new ErrorHandler(Unauthorized, InvalidToken);
            }

            req.loginUser = tokenFromDB.user;

            next();
        } catch (e) {
            next(e);
        }
    }

};
