const { USER } = require('../dataBase');
const { emailActionsEnum } = require('../config');

const { ErrorHandler } = require('../errors');
const { passwordService, emailService } = require('../service');
const { statusErr: { NO_CONTENT, CREATED, NOT_FOUND } } = require('../errors');
const { userUtil: { userNormalizator } } = require('../utils');
const { messageError: { notFound, deleted } } = require('../errors');

module.exports = {
    getSingleUser: async (req, res, next) => {
        try {
            const userToReturn = userNormalizator(req.user);

             await emailService.sendMail('pavloshavel@gmail.com', emailActionsEnum.WELCOME);

            res.json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    getAllUsers: async (req, res, next) => {
        try {
            const allUser = await USER.find({});
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
            const createdUser = await USER.create({ ...req.body, password: hashedPassword });

            const userToReturn = userNormalizator(createdUser);

            await emailService.sendMail('pavloshavel@gmail.com', emailActionsEnum.CREATE);

            res.status(CREATED).json(userToReturn);
        } catch (e) {
            next(e);
        }
    },

    deleteUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await USER.deleteOne({ _id: user_id });

            if (!user) {
                throw new ErrorHandler(NOT_FOUND, notFound);
            }
            await emailService.sendMail('pavloshavel@gmail.com', emailActionsEnum.DELETE);
            res.status(NO_CONTENT).json(deleted);
        } catch (e) {
            next(e);
        }
    },

    updateUser: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            console.log(user_id);
            const user = await USER.updateOne({ _id: user_id }, req.body);

            await emailService.sendMail('pavloshavel@gmail.com', emailActionsEnum.UPDATE);

            res.status(CREATED).json(user);
        } catch (e) {
            next(e);
        }
    }
};
