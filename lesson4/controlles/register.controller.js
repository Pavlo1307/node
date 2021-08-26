const users = require('../db/db');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getRegister: (req, res) => {
        res.json('get Register');
    },
    postRegister: (req, res, next) => {
        try {
            const newUser = req.body;
            const foundUser = users.find((user) => user.name === newUser.name);
            if (!foundUser) {
                users.push(newUser);
                res.redirect('/users');
            }
            if (foundUser) {
                throw new ErrorHandler(418, 'Login is same');
            }
        } catch (e) {
            next(e);
        }
    }
};
