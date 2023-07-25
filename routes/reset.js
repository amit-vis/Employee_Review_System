const express = require('express');
const router = express.Router();
const resetController = require('../controller/reset_controller');

router.get('/forgot', resetController.forgotGet);
router.post('/forgot', resetController.passwordReset);

module.exports = router;