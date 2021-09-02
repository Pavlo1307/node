const router = require('express').Router();

const { validateBody } = require('../middllewares/validator.middleware');
const {
    userMiddleware: {
        getUserByDynamicParam, checkUserRoleMiddleware, checkUniqueEmail,
    }
} = require('../middllewares');
const { userController } = require('../controlles');
const { ADMIN } = require('../config/userRoles.enum');
const { createUserValidator, updateUser } = require('../validators/user.validator');

router.post('/', validateBody(createUserValidator),
    checkUniqueEmail,
    userController.createUser);

router.get('/', userController.getAllUsers);

router.get('/:user_id',
    getUserByDynamicParam('user_id', 'params', '_id'),
    userController.getSingleUser);

router.delete('/:user_id',
    getUserByDynamicParam('user_id'),
    checkUserRoleMiddleware([ADMIN]),
    userController.deleteUser);

router.put('/:user_id',
    validateBody(updateUser),
    getUserByDynamicParam('user_id'),
    userController.updateUser);

module.exports = router;
