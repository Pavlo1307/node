const db = require('../db/db');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = db[user_id];

            if (!user) {
                throw new ErrorHandler(418, 'User not found');
            }
            res.json(user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: (req, res, next) => {
        try {
            if (!db) {
                throw new ErrorHandler(418, 'User not found');
            }
            res.json(db);
        } catch (e) {
            next(e);
        }
    },
};
