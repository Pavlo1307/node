const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');
const { BAD_REQUEST } = require('../errors/statusError');
const { notFound } = require('../errors/messageError');
const { carValidator } = require('../validators');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(BAD_REQUEST, notFound);
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
                throw new ErrorHandler(BAD_REQUEST, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};
