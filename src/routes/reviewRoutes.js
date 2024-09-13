const express = require('express');
const router = express.Router();
const reviewController = require('../controllers/reviewController');

router.post('/create', reviewController.postReview);

router.post('/getreviewbycycleperiod', reviewController.getReviewsByCyclePeriod);

module.exports = router;