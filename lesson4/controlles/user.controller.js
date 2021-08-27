const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound } = require('../errors/messageError');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUser = await User.find({});
            res.json(allUser);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const createdUSer = await User.create(req.body);
            res.json(createdUSer);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.deleteOne({ _id: user_id });

            if (!user) {
                throw new ErrorHandler(notFound.status, notFound.message);
            }

            res.json(`User with id ${user_id} is deleted`);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.updateOne({ _id: user_id }, req.body);
            res.json(user);
        } catch (e) {
            next(e);
        }
    }
};
