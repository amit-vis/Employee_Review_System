const express = require('express');
const router = express.Router();

const userController = require('../controller/users_controller');

router.get('/sign-in', userController.signIn);
router.get('/sign-up', userController.signUp);
router.post('/create', userController.create);
router.post('/create-session', userController.createSession);
router.get('/empSign-up', userController.employeeSignIn);
router.post('/createemp', userController.createEmployee);

module.exports = router;