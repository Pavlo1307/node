const router = require('express').Router();
const { loginController } = require('../controlles');
const { isEmailExist } = require('../middllewares/login.middleware');

router.post('/', isEmailExist, loginController.checkLoginPassword);
