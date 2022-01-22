const express = require('express');
const router = express.Router();

const UserController = require('../controllers/userController');




router.route('/login')
.get(UserController.loadLoginPage )
.post();
router.route('/register')
.get(UserController.loadRegisterPage )
.post(UserController.validation_register);











module.exports = router;