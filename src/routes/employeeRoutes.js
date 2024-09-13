const express = require('express');
const router = express.Router();
const employeeController = require('../controllers/employeeController');

router.post('/getemployee', employeeController.getEmployeeData);
router.post('/createEmployee', employeeController.postEmployeeData);
router.post('/postemployeesinbulk', employeeController.postEmployeesInBulk);
router.post('/updatemultipleemployeesroles', employeeController.updateMultipleEmployeesRoles);
router.post('/', employeeController.postEmployeeData);
router.post('/updateemployeeprofile', employeeController.updateEmployeeData);

module.exports = router;
