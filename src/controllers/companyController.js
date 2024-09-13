const companyService = require('../services/companyService');


const getCompany = async (req, res) => {
    if(req.body?.companyId){
        const response = await companyService.getCompany(req.body?.companyId);
        if(response){
            res.status(200).json(response);
        } else {
            res.status(404).json("Not found");
        }   
    } else {
        res.status(400).json("Bad data");
    }
}

const createCompany = async (req, res) => {
    if(!req.user.email.includes('adminforaccountcreation')){
        res.status(401).json("Unauthorised");
    } else {
        const response = await companyService.createCompanyData(req.body);
        if(response){
            res.status(200).json(response);
        } else {
            res.status(404).json("Not found");
        }
    }
}

module.exports = {
    getCompany,
    createCompany
}
