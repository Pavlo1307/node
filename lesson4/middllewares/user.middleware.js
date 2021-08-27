const User = require('../dataBase/User');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isUserPresent: async (req, res, next) => {
        try {
            const { user_id } = req.params;
            const user = await User.findById(user_id);

            if (!user) {
                throw new ErrorHandler(418, 'User not found');
            }
            req.user = user;
            next();
        } catch (e) {
            next(e);
        }
    },
    checkUniqueEmail: async (req, res, next) => {
        try {
            const { email } = req.body;
            const userByemail = await User.findOne({ email });

            if (userByemail) {
                throw new ErrorHandler(409, `Email ${email} is already exist`);
            }
            next();
        } catch (e) {
            next(e);
        }
    }
};
