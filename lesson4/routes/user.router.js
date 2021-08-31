const router = require('express').Router();

const { userMiddleware } = require('../middllewares');
const { userController } = require('../controlles');

router.post('/', userMiddleware.validateUserBody, userMiddleware.checkUniqueEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', userMiddleware.isUserPresent, userController.getSingleUser);
router.delete('/:user_id', userMiddleware.isUserPresent, userController.deleteUser);
router.put('/:user_id', userMiddleware.isUserPresent, userController.updateUser);

module.exports = router;
