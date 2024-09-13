const { createExpense, readExpensesByEmployeeIdAndCompanyId, updateExpense } = require("../firebaseClient/crud/expenses");

const postExpense = async (req, res) => {

    const newExpense = req.body;
    newExpense.companyId = req.user.employeeData.companyId;
    newExpense.employeeId = req.user.employeeData.id;
    newExpense.managerEmail = req.user.employeeData.managerEmail;
    const response = await createExpense(newExpense);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

const getExpensesByEmployeeIdAndCompanyId = async (req, res) => {
    const response = await readExpensesByEmployeeIdAndCompanyId(req.user.employeeData.id, req.user.employeeData.companyId);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

// update expense
const updateExpenseData = async (req, res) => {
    const updatedExpense =  await updateExpense(req.body.id, {...req.body.data, resolvedBy: req.user.email, resolvedOn: new Date().toString()});
    if(updatedExpense){
        res.status(200).json(updatedExpense);
    } else {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    postExpense,
    getExpensesByEmployeeIdAndCompanyId,
    updateExpenseData
}