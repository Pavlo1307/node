const router = require('express').Router();

const { isCarPresent, validateCarBody } = require('../middllewares/car.middleware');
const { carController } = require('../controlles');

router.post('/', validateCarBody, carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:car_id', isCarPresent, carController.getSingleCar);
router.delete('/:car_id', isCarPresent, carController.deleteCar);
router.put('/:car_id', carController.updateCar);

module.exports = router;
