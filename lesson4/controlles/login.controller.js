const passwordService = require('../service/password.service');

console.log('qqqqqq');
module.exports = {

    cheakPassword: async (req, res, next) => {
        try {
            const { user } = req;
            const { password } = req.body;

            console.log('hesh', user.password);
            console.log('----------------');
            console.log('password', password);

            await passwordService.compare(password, user.password);
            res.json('You are login');
        } catch (e) {
            next(e);
        }
    },

};
