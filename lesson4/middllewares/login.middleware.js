const Users = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');
const { alreadyExist } = require('../errors/messageError');

module.exports = {

    isEmailExist: async (req, res, next) => {
        try {
            const { email } = req.body;
            console.log(email);
            const user = await Users.findOne({ email });

            if (!user) {
                throw new ErrorHandler(400, alreadyExist);
            }

            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },

};
