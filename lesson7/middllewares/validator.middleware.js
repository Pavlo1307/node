const { errorHandler} = require('../errors');
const { statusErr: { BAD_REQUEST } } = require('../errors');

module.exports = {
    validateBody: (validator) => (req, res, next) => {
        try {
            const { error } = validator.validate(req.body);

            if (error) {
                throw new errorHandler.ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
