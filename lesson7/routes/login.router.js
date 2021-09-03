const router = require('express').Router();

const { loginController } = require('../controlles');
const { userMiddleware } = require('../middllewares');
const { loginValidator: { authValidator } } = require('../validators');
const { validatorMiddleware: { validateBody } } = require('../middllewares');
const { loginMiddleware: { validateAccessToken, validateRefreshToken } } = require('../middllewares');
const { constants: { email } } = require('../config');

router.post('/', validateBody(authValidator),
    userMiddleware.getUserByDynamicParam(email),
    userMiddleware.isUserNotPresent,
    loginController.cheakPassword);

router.post('/logout', validateBody(authValidator),
    validateAccessToken,
    loginController.logoutUser);

router.post('/refresh', validateBody(authValidator),
    validateRefreshToken,
    loginController.refresh);

module.exports = router;
