const { readEmployee, readEmployeeById } = require("../firebaseClient/crud/employee");
const { readExpensesByManagerEmailAndCompanyId } = require("../firebaseClient/crud/expenses");
const { readEmployeeLeavesByManagerEmailandcompanyId } = require("../firebaseClient/crud/leave");

const getRequestsForManager = async (req, res) => {
    let leavesRequests = await readEmployeeLeavesByManagerEmailandcompanyId(req.user.email, req.user.employeeData?.companyId || null);
    leavesRequests = leavesRequests.map((item) => {
        return {
            ...item,
            type: "leave"
        }
    })
    let expensesRequests = await readExpensesByManagerEmailAndCompanyId(req.user.email, req.user.employeeData?.companyId || null);
    expensesRequests = expensesRequests.map((item) => {
        return {
            ...item,
            type: "expense"
        }
    })
    let requests = [...leavesRequests.filter(x => x.status == 0), ...expensesRequests.filter(x => x.status == 0)];

    console.log(requests);

    requests = requests.map(async (item) => {
        let employee = {};
        if(item.employeeEmail){
            employee = await readEmployee(item.employeeEmail, req.user.employeeData.companyId);
        } else if(item.employeeId){
            employee = await readEmployeeById(item.employeeId);
        }

        return {
            ...item,
            employeeName: employee.firstName + " " + employee.lastName
        }
    })

    requests = await Promise.all(requests);

    
    if(requests){
        res.status(200).json(requests);
    } else {
        res.status(404).json("Not found");
    }
}

module.exports = {
    getRequestsForManager
}