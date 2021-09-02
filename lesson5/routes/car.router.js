const router = require('express').Router();

const { validatorMiddleware: { validateBody } } = require('../middllewares');
const { carMiddleware } = require('../middllewares');
const { carController } = require('../controlles');
const { createCarValidator, updateCarValidator } = require('../validators/car.validator');

router.post('/', validateBody(createCarValidator), carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:car_id', carMiddleware.isCarPresent, carController.getSingleCar);
router.delete('/:car_id', carMiddleware.isCarPresent, carController.deleteCar);
router.put('/:car_id', validateBody(updateCarValidator), carMiddleware.isCarPresent, carController.updateCar);

module.exports = router;
