const passwordService = require('../service/password.service');
const jwtService = require('../service/jwt.servise');
const { userNormalizator } = require('../utils/user.util');

module.exports = {

    cheakPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            res.json({
                ...tokenPair,
                user: userNormalizator(req.user)
            });
        } catch (e) {
            next(e);
        }
    },

};
