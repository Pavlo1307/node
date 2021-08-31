const router = require('express').Router();

const { carMiddleware } = require('../middllewares');
const { carController } = require('../controlles');

router.post('/', carMiddleware.validateCarBody, carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:car_id', carMiddleware.isCarPresent, carController.getSingleCar);
router.delete('/:car_id', carMiddleware.isCarPresent, carController.deleteCar);
router.put('/:car_id', carController.updateCar);

module.exports = router;
