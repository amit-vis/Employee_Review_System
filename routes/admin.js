const express = require('express');
const router = express.Router();
const adminController = require('../controller/admin_controller');

router.get('/page', adminController.adminPage);
router.get('/makeadmin/:id', adminController.makeAdmin);
router.get('/removeadmin/:id', adminController.removeAdmin);
router.get('/delete/:id', adminController.deleteEmployee);
router.post('/update/:id', adminController.update);

module.exports = router;