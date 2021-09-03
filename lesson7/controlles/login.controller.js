const { passwordService } = require('../service');
const { jwtService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');

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
