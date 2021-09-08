const { emailService } = require("../service");
const { emailActionsEnum } = require('../config');
const { passwordService } = require('../service');
const { jwtService } = require('../service');
const { userUtil: { userNormalizator } } = require('../utils');
const { Login } = require('../dataBase');
const { constants: { authorization } } = require('../config');

module.exports = {

    cheakPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password, email } = req.body;
            await passwordService.compare(password, user.password);

            const tokenPair = jwtService.generateTokenPair();

            await Login.create({ ...tokenPair, user: user._id });

            await emailService.sendMail(email, emailActionsEnum.LOGIN);

            res.json({
                ...tokenPair,
                user: userNormalizator(req.user)
            });
        } catch (e) {
            next(e);
        }
    },

    logoutUser: async (req, res, next) => {
        try {
            const access_token = req.get(authorization);
            await Login.deleteOne({ access_token });
            res.json('logout');
        } catch (e) {
            next(e);
        }
    },

    refresh: async (req, res, next) => {
        try {
            const refresh_token = req.get(authorization);
            const user = req.loginUser;

            await Login.deleteOne({ refresh_token });

            const tokenPair = jwtService.generateTokenPair();
            console.log(tokenPair);
            await Login.create({ ...tokenPair, user: user._id });

            res.json({
                ...tokenPair,
                user: userNormalizator(req.user)
            });
        } catch (e) {
            next(e);
        }
    }

};
