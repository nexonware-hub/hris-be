const { createCompany, readCompany, updateCompany, readCompanyByCreatedBy } = require("../firebaseClient/crud/company");

const createCompanyData = async (newCompany) => {
    const response = await createCompany(newCompany);
    return response;
}

const getCompany = async (id) => {
    const response = await readCompany(id);
    return response;
}

const updateCompanyData = async (id, data) => {
    const response = await updateCompany(id, data);
    return response;
}

module.exports = {
    getCompany,
    createCompanyData,
    updateCompanyData
}