const { editorRole } = require('../constants');
const { createDirectReport } = require('../firebaseClient/crud/directs');
const { readEmployee, createEmployee, updateEmployee } = require('../firebaseClient/crud/employee');
const { updateCompanyData } = require('../services/companyService');
const { generateDirectReportsFromListOfEmployees } = require('../services/directsService');

getEmployeeData = async (req, res) => {
    const response = await readEmployee(req.body.email ? req.body.email : req.user.email, req.user.employeeData?.companyId || null );
    if(response){
        if(req.user.employeeData?.companyId === response?.companyId){
            res.status(200).json(response);
        } else {
            res.status(401).json("Unauthorised");
        }
    } else {
        res.status(200).json({
            email: req.user.email
        });
    }
    
};

postEmployeeData = async (req, res) => {
    const readEmployeeResponse = await readEmployee(req.body.email, req.user.employeeData?.companyId);
    if(!req.user.employeeData.roles.includes(editorRole) || readEmployeeResponse){
        if(readEmployeeResponse){
            res.status(409).json("User exists");
        } else {
            res.status(401).json("Unauthorised");
        }
    } else {
        const newEmployee = req.body;
        const userId = await createEmployee(newEmployee)
        .then(() => console.log('User created'))
        .catch((error) => console.error('Error creating employee:', error));
        res.status(201).json({userId: userId});
    }
};

// for initial setup
postEmployeesInBulk = async (req, res) => {
    if(!req.user.isAdmin){
        res.status(401).json("Unauthorised");
    } else {
        const newEmployees = req.body.employees;
        console.log(newEmployees);
        
        const directs = generateDirectReportsFromListOfEmployees(newEmployees);
        const directsIds = [];
        for (const direct of directs) {
            const directsId = await createDirectReport({...direct, companyId: req.body.companyId});
            directsIds.push(directsId);
        }

        console.log(directsIds);

        const userIds = [];
        try {
            for (const newEmployee of newEmployees) {
            const userId = await createEmployee(newEmployee);
            userIds.push(userId);
            }

            await updateCompanyData(req.body.companyId, {employeesBulkDataPublished: true})

            res.status(200).json({ userIds });
        } catch (error) {
            console.error('Error creating employees:', error);
            res.status(500).json({ error: 'Failed to create employees' });
        }
    }
};

updateEmployeeData = async (req, res) => {
    const employeeProfile = await readEmployee(req.body.employeeEmail, req.user.employeeData.companyId);
    if(req.user.employeeData.email == employeeProfile.managerEmail || req.user.employeeData.email == req.body.employeeEmail && req.user.employeeData.companyId == employeeProfile.companyId){
        const response = await updateEmployee(employeeProfile.id, req.body.data);
        if(response){
            res.status(200).json(response);
        } else {
            res.status(404).json("Not found");
        }
    } else {
        res.status(401).json("Unauthorised");
    }
}

updateMultipleEmployeesRoles = async (req, res) => {
    if(req.user.isAdmin || req.user.employeeData.roles.includes(editorRole)){
        try{
            const ret = [];
            console.log(req.body.listOfEmployeeEmails.length);
            console.log('one');
            for(const email of req.body.listOfEmployeeEmails){
                if(email && email != ''){
                    console.log(email, );
                    const user = await readEmployee(email.trim(), req.user.employeeData?.companyId || req.body.companyId);
                    console.log(user);
                    const rolesToUpdate = req.body.data.roles?.filter(role => !user.roles?.includes(role));
                    if(rolesToUpdate){
                        console.log(rolesToUpdate);
                        const existingRoles = user.roles ? [...user.roles] : [];
                        console.log([...rolesToUpdate, ...existingRoles]);
    
                        const response = await updateEmployee(user.id, user.roles ? {roles : [...rolesToUpdate, ...existingRoles]} : req.body.data);
                        ret.push(response);
                    }
                }
            }
            res.status(200).json(ret);
        } catch {
            res.status(404).json("Not found");
        }
    } else {
        res.status(401).json("Unauthorised");
    }
}

module.exports = {
    getEmployeeData,
    postEmployeeData,
    postEmployeesInBulk,
    updateEmployeeData,
    updateMultipleEmployeesRoles
}
