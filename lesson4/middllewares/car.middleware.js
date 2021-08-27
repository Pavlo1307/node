const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    isCarPresent: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.findById(car_id);

            if (!car) {
                throw new ErrorHandler(418, 'car not found');
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
                throw new ErrorHandler(418, 'Car is not valid');
            }

            next();
        } catch (e) {
            next(e);
        }
    }
};
