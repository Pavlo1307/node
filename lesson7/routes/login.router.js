const router = require('express').Router();
const { loginController } = require('../controlles');
const { loginMiddleware } = require('../middllewares');
const { authValidator } = require('../validators/login.validator');
const { validateBody } = require('../middllewares/validator.middleware');

router.post('/', validateBody(authValidator), loginMiddleware.isEmailExist, loginController.cheakPassword);

module.exports = router;
