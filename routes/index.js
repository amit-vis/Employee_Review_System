const express = require('express');

const router = express.Router();
const homeController = require('../controller/home_controller');


router.get('/', homeController.home);
router.use('/user', require('./user'));
router.use('/admin', require('./admin'));
router.use('/review', require('./review'));

module.exports = router;