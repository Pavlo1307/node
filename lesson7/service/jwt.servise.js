const jwt = require('jsonwebtoken');
const util = require('util');
const { ACCESS_SECRET_KEY, REFRESH_SECRET_KEY } = require("../config/variables");

const verifyPromise = util.promisify(jwt.verify);

module.exports = {
    generateTokenService: () => {
        const access_token = jwt.sign({}, ACCESS_SECRET_KEY, { expiresIn: '15m' });
        const refresh_token = jwt.sign({}, REFRESH_SECRET_KEY, { expiresIn: '31d' });

        return {
            access_token,
            refresh_token
        };
    },

    varifyToken: async (token, tokenType = 'access') => {
        const secret = tokenType === 'access' ? ACCESS_SECRET_KEY : REFRESH_SECRET_KEY;

        await verifyPromise(token, secret);
    }
};
