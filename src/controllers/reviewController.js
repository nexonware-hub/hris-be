const { readReviewforCyclePeriod, createReview } = require("../firebaseClient/crud/reviews");

const getReviewsByCyclePeriod = async (req, res) => {
    const response = await readReviewforCyclePeriod(req.user.employeeData.id, req.user.employeeData.companyId, req.body.performanceCycle, req.body.cyclePeriod);
    if(response){
        res.status(200).json(response);
    } else {
        res.status(404).json({error: "Not found"});
    }
}

const postReview = async (req, res) => {
    const response = await createReview({...req.body, employeeId: req.user.employeeData.id, companyId: req.user.employeeData.companyId});
    if(response){
        res.status(201).json(response);
    } else {
        res.status(500).json({error: "Internal Server Error"});
    }
}

module.exports = {
    getReviewsByCyclePeriod,
    postReview
}