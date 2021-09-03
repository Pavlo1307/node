const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const passwordService = require('../service/password.service');
const { NO_CONTENT, CREATED, NOT_FOUND } = require('../errors/statusError');
const { userNormalizator } = require('../utils/user.util');
const { notFound, deleted } = require('../errors/messageError');

module.exports = {
    getSingleUser: (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);
            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUser = await User.find({});
            const allUserToReturn = allUser.map((value) => userNormalizator(value));
            res.json(allUserToReturn);
        } catch (e) {
            next(e);
        }
    },

    createUser: async (req, res, next) => {
        try {
            const { password } = req.body;
            const hashedPassword = await passwordService.hash(password);
            const createdUser = await User.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            res.status(CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.deleteOne({ _id: user_id });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, notFound);
            }

            res.status(NO_CONTENT).json(deleted);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.updateOne({ _id: user_id }, req.body);

            res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    }
};
