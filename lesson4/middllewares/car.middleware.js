const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound } = require('../errors/messageError');
const carValidator = require('../validators/car.validator');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(201, notFound);
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
                throw new ErrorHandler(400, error.details[0].message);
            }
            next();
        } catch (e) {
            next(e);
        }
    }

};
