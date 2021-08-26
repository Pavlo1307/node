const users = require('../db/db');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getLogin: (req, res) => {
        res.json('login get');
    },
    postLogin: (req, res, next) => {
        try {
            const { name, password } = req.body;
            const foundUser = users.find((user) => user.name === name);

            if (!foundUser) {
                throw new ErrorHandler(418, 'User not found');
            }
            if (password === foundUser.password) {
                return res.redirect('/users');
            }
            if (password !== foundUser.password) {
                throw new ErrorHandler(418, 'password is not correct');
            }
            res.redirect('/register');
        } catch (e) {
            next(e);
        }
    },
};
