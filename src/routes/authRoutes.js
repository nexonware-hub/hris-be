const express = require('express');
const router = express.Router();
const signupController = require('../controllers/signupController');

router.post('/signUp', signupController.signUp);

module.exports = router;