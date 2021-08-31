const Users = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { mailIsWrong } = require('../errors/messageError');

module.exports = {

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            const user = await Users.findOne({ email });

            if (!user) {
                throw new ErrorHandler(400, mailIsWrong);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

};
