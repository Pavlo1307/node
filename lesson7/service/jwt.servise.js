const jwt = require('jsonwebtoken');
const util = require('util');
const { access } = require('../config/constans');
const { messageError: { InvalidToken } } = require('../errors');
const { ErrorHandler } = require('../errors');
const { statusErr: { Unauthorized } } = require('../errors');
const { variables: { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } } = require('../config');

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenPair: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    varifyToken: async (token, tokenType = access) => {
        try {
            const secret = tokenType === access ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

            await verifyPromise(token, secret);
        } catch (e) {
            throw new ErrorHandler(Unauthorized, InvalidToken);
        }
    }
};
