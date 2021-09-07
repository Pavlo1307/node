const router = require('express').Router();

const { loginController } = require('../controlles');
const { userMiddleware } = require('../middllewares');
const { loginValidator: { authValidator } } = require('../validators');
const { validatorMiddleware: { validateBody } } = require('../middllewares');
const { loginMiddleware: { validateToken } } = require('../middllewares');
const { constants: { refresh } } = require('../config');
const { constants: { email } } = require('../config');

router.post('/', validateBody(authValidator),
    userMiddleware.getUserByDynamicParam(email),
    userMiddleware.isUserNotPresent,
    loginController.cheakPassword);

router.post('/logout', validateToken,
    loginController.logoutUser);

router.post('/refresh', validateToken(refresh),
    loginController.refresh);

module.exports = router;
