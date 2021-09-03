const router = require('express').Router();

const { validateBody } = require('../middllewares/validator.middleware');
const {
    userMiddleware: {
        getUserByDynamicParam,
        checkUserRoleMiddleware,
        isUserNotPresent,
        isUserPresent
    }
} = require('../middllewares');
const { userController } = require('../controlles');
const { USER } = require('../config/userRoles.enum');
const { createUserValidator, updateUser } = require('../validators/user.validator');

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
