const router = require('express').Router();
const { loginController } = require('../controlles');
const { userMiddleware } = require('../middllewares');
const { authValidator } = require('../validators/login.validator');
const { validateBody } = require('../middllewares/validator.middleware');

router.post('/', validateBody(authValidator),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotPresent,
    loginController.cheakPassword);

module.exports = router;
