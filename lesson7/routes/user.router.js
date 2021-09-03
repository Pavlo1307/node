const router = require('express').Router();

const { validatorMiddleware: { validateBody } } = require('../middllewares');
const {
    userMiddleware: {
        getUserByDynamicParam,
        checkUserRoleMiddleware,
        isUserNotPresent,
        isUserPresent
    }
} = require('../middllewares');
const { userController } = require('../controlles');
const { userRoles: { USER } } = require('../config');
const { userValidator: { createUserValidator, updateUser } } = require('../validators');

router.post('/',
    validateBody(createUserValidator),
    getUserByDynamicParam('email', 'body'),
    isUserPresent,
    userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDynamicParam('user_id', 'params', '_id'),
    isUserNotPresent,
    userController.getSingleUser);

router.delete('/:user_id',
    getUserByDynamicParam('user_id', 'params', '_id'),
    isUserNotPresent,
    checkUserRoleMiddleware([USER]),
    userController.deleteUser);

router.put('/:user_id',
    validateBody(updateUser),
    getUserByDynamicParam('user_id'),
    userController.updateUser);

module.exports = router;
