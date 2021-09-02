const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    validateBody: (validator) => (req, res, next) => {
        try {
            const { error } = validator.validate(req.body);

            if (error) {
                throw new ErrorHandler(400, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};