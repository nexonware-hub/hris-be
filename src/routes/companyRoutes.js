const express = require('express');
const router = express.Router();
const companyController = require('../controllers/companyController');

router.post('/getCompany', companyController.getCompany);
router.post('/createCompany', companyController.createCompany);

module.exports = router;