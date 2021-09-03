const { CAR } = require('../dataBase');
const { errorHandler } = require('../errors');
const { statusErr: { BAD_REQUEST } } = require('../errors');
const { messageError: { notFound } } = require('../errors');
const { carValidator } = require('../validators');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await CAR.findById(car_id);

            if (!car) {
                throw new errorHandler.ErrorHandler(BAD_REQUEST, notFound);
            }

            req.car = car;
            next();
        } catch (e) {
            next(e);
        }
    },

    validateCarBody: (req, res, next) => {
        try {
            const { error } = carValidator.createCarValidator.validate(req.body);

            if (error) {
                throw new errorHandler.ErrorHandler(BAD_REQUEST, error.details[0].message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }

};
