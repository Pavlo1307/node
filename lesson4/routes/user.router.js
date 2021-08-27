const router = require('express').Router();

const { isUserPresent, checkUniqueEmail } = require('../middllewares/user.middleware');
const { userController } = require('../controlles');

router.post('/', checkUniqueEmail, userController.createUser);
router.get('/', userController.getAllUsers);
router.get('/:user_id', isUserPresent, userController.getSingleUser);
router.delete('/:user_id', isUserPresent, userController.deleteUser);
router.put('/:user_id', isUserPresent, userController.updateUser);

module.exports = router;
