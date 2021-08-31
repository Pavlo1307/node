const { passwordService } = require('../service/password.service');

module.exports = {
    checkLoginPassword: async (req, res, next) => {
        try {
            const { user, body } = req;
            console.log(user);
            console.log(body);

            await passwordService.compare(user.password, body.password);

            res.json('You are logged in');
            next();
        } catch (e) {
            next(e);
        }
    }
};
