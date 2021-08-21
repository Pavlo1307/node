const users = require('../db/users');

module.exports = {
    getLogin: (req, res) => {
        res.json('login get');
    },
    postLogin: (req, res) => {
        const { name, password } = req.body;
        const foundUser = users.find((user) => user.name === name);

        if (foundUser) {
            if (password === foundUser.password) {
                return res.redirect('/users');
            }
            if (password !== foundUser.password) {
                return res.status(404).end('Password is not correct!');
            }
        }
        res.redirect('/register');
    },
};
