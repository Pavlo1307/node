const Car = require('../dataBase/Car');

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

            res.status().json(car);
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
