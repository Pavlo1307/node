const { Login } = require('../dataBase');
const { jwtService: { varifyToken } } = require('../service');
const { statusErr: { Unauthorized } } = require('../errors');
const { messageError: { noToken, InvalidToken } } = require('../errors');
const { ErrorHandler } = require('../errors');
const { constants: { access } } = require('../config');
const { constants: { authorization } } = require('../config');

module.exports = {
    validateToken: (typeToken = access) => async (req, res, next) => {
        try {
            const token = req.get(authorization);

            if (!token) {
                throw new ErrorHandler(Unauthorized, noToken);
            }

            await varifyToken(token, typeToken);

            const tokenFromDB = await Login.findOne({ [typeToken]: token }).populate('user');

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
