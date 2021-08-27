const Car = require('../dataBase/Car');
const ErrorHandler = require('../errors/ErrorHandler');

module.exports = {
    getSingleCar: (req, res, next) => {
        try {
            res.json(req.user);
        } catch (e) {
            next(e);
        }
    },

    getAllCars: async (req, res, next) => {
        try {
            if (!Car) {
                throw new ErrorHandler(418, 'User not found');
            }
            const allUser = await Car.find({});
            res.json(allUser);
        } catch (e) {
            next(e);
        }
    },

    createCar: async (req, res, next) => {
        try {
            const createdUSer = await Car.create(req.body);
            res.json(createdUSer);
        } catch (e) {
            next(e);
        }
    },

    deleteCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.deleteOne({ _id: car_id });

            if (!car) {
                throw new ErrorHandler(418, 'car not found');
            }
            res.json('car deleted');
        } catch (e) {
            next(e);
        }
    },

    updateCar: async (req, res, next) => {
        try {
            const { car_id } = req.params;
            const car = await Car.updateOne({ _id: car_id }, req.body);
            res.json(car);
        } catch (e) {
            next(e);
        }
    }
};
