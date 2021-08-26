const router = require('express').Router();

const { registerController } = require('../controlles');

router.get('/', registerController.getRegister);

router.post('/', registerController.postRegister);

module.exports = router;
