const { jwtService: { varifyToken } } = require('../service');
const { statusErr: { Unauthorized } } = require('../errors');
const { ErrorHandler } = require('../errors');
const { constants: { authorization } } = require('../config');

module.exports = {
    validateAccessToken: async (req, res, next) => {
        try {
            const token = req.get(authorization);

            if (!token) {
                throw new ErrorHandler(Unauthorized, 'No token');
            }

           await varifyToken(token);

            next();
        } catch (e) {
            next(e);
        }
    }
};
