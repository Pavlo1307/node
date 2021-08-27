const router = require('express').Router();

const { isValid, isCarPresent } = require('../middllewares/car.middleware');
const { carController } = require('../controlles');

router.post('/', carController.createCar);
router.get('/', carController.getAllCars);
router.get('/:car_id', isCarPresent, carController.getSingleCar);
router.delete('/:car_id', isCarPresent, carController.deleteCar);
router.put('/:car_id', isValid, carController.updateCar);

module.exports = router;
