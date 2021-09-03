const router = require('express').Router();

const { loginController } = require('../controlles');
const { userMiddleware } = require('../middllewares');
const { loginValidator: { authValidator } } = require('../validators');
const { validatorMiddleware: { validateBody } } = require('../middllewares');

router.post('/', validateBody(authValidator),
    userMiddleware.getUserByDynamicParam('email'),
    userMiddleware.isUserNotPresent,
    loginController.cheakPassword);

module.exports = router;
