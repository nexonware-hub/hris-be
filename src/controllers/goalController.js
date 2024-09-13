const { createGoal, readGoalByEmployeeId } = require("../firebaseClient/crud/goals");

const postGoal = async (req, res) => {

    const newGoal = req.body;
    newGoal.companyId = req.user.employeeData.companyId;
    newGoal.employeeId = req.user.employeeData.id;
    const response = await createGoal(newGoal);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

const getGoalsByEmployeeId = async (req, res) => {
    const response = await readGoalByEmployeeId(req.user.employeeData.id, req.user.employeeData.companyId, req.body.performanceCycle, req.body.cyclePeriod);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(500).json({error: "Internal server error"});
    }
}

module.exports = {
    postGoal,
    getGoalsByEmployeeId
}