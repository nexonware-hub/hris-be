const express = require('express');
const router = express.Router();
const leaveController = require('../controllers/leaveController');

router.post('/createleave', leaveController.postLeaveApplication);
router.get('/getleaves', leaveController.getLeaves);
router.post('/updateLeave', leaveController.updateLeaveData);

module.exports = router;