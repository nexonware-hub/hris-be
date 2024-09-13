const express = require('express');
const router = express.Router();
const expenseController = require('../controllers/expenseController');

router.post('/createExpense', expenseController.postExpense);
router.get('/getExpensesByEmployeeIdAndCompanyId', expenseController.getExpensesByEmployeeIdAndCompanyId);
router.post('/updateExpense', expenseController.updateExpenseData);

module.exports = router;
