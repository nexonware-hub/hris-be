const express = require('express');
const router = express.Router();
const goalController = require('../controllers/goalController');

router.post('/getGoalsByEmployeeIdAndPerformanceCycle', goalController.getGoalsByEmployeeId);
router.post('/postGoal', goalController.postGoal);

module.exports = router;
