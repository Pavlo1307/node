const bcrypt = require('bcrypt');

const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../errors/statusError');
const { mailIsWrong } = require('../errors/messageError');

module.exports = {
    hash: (password) => bcrypt.hash(password, 10),
    compare: async (password, hash) => {
        const isPasswordMatched = await bcrypt.compare(password, hash);

        if (!isPasswordMatched) {
            throw new ErrorHandler(BAD_REQUEST, mailIsWrong);
        }
    }
};
