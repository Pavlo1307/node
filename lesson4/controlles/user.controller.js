const db = require('../db/db');

module.exports = {
    getSingleUser: (req, res) => {
        const { user_id } = req.params;
        const user = db[user_id];

        if (!user) {
            res.status(404).json('user is not found');
            return;
        }
        res.json(user);
    },
    getAllUsers: (req, res) => {
        res.json(db);
    },
};
