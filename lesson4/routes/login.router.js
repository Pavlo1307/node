const router = require('express').Router();
const { loginController } = require('../controlles');
const { loginMiddleware } = require('../middllewares');

router.post('/', loginMiddleware.isEmailExist, loginController.cheakPassword);

module.exports = router;
