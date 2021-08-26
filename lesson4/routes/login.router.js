// eslint-disable-next-line import/no-extraneous-dependencies
const router = require('express').Router();

const { loginController } = require('../controlles');

router.get('/', loginController.getLogin);

router.post('/', loginController.postLogin);

module.exports = router;
