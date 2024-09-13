const { readEmployee } = require('../firebaseClient/crud/employee');
const admin = require('../firebaseClient/firebaseAdmin');
const directsService = require('../services/directsService');

// get list of direct reports to a manager
const getDirects = async (req, res) => {
    const manager = await readEmployee(req.body.managerId ? req.body.managerId : req.user.email, req.user.employeeData?.companyId);
    if(manager && manager.companyId == req.user.employeeData.companyId){
        const response = await directsService.getDirects(manager.email, manager.companyId);
        if(response){
            res.status(200).json(response);
        } else {
            res.status(404).json("Not found");
        }
    } else if(!manager){
        res.status(404).json("Manager's profile not found");
    } else {
        res.status(401).json("Unauthorised");
    }
}

const updateDirects = async (req, res) => {
    // update any reporting changes
}

module.exports = {
    getDirects,
    updateDirects
}