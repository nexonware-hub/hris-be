const express = require('express');
const router = express.Router();
const requestsController = require('../controllers/requestsController');

router.get('/getRequests', requestsController.getRequestsForManager);

module.exports = router;