const express = require('express');

const router = express.Router();
const adminController = require('../controller/review_controller');

router.get('/assignWork', adminController.home);
router.post('/createReview', adminController.createReview);

module.exports = router;