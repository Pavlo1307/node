const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');
const { notFound, notValid } = require('../errors/messageError');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(notFound.status, notFound.message);
            }

            req.user = car;
            next();
        } catch (e) {
            next(e);
        }
    },
    isValid: (req, res, next) => {
        try {
            const { model, year, price } = req.body;

            if (!model || !year || !price) {
                throw new ErrorHandler(notValid.status, notValid.message);
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
