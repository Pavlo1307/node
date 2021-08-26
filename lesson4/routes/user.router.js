// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();

const { userController } = require('../controlles');

router.get('/:user_id', userController.getSingleUser);

router.get('/', userController.getAllUsers);

module.exports = router;
