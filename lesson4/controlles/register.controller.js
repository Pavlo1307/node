const users = require('../db/db');

module.exports = {
    getRegister: (req, res) => {
        res.json('get Register');
    },
    postRegister: (req, res) => {
        const newUser = req.body;
        const foudUser = users.find((user) => user === newUser.name);
        if (foudUser) {
            return res.status(404).end('Login is same',);
        }
        users.push(newUser);
        res.redirect('/users');
    }
};
