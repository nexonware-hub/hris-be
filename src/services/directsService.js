const { createDirectReport, readDirectReports } = require("../firebaseClient/crud/directs");
const { readEmployees, readEmployee } = require("../firebaseClient/crud/employee")

function generateDirectReportsFromListOfEmployees(employees) {
    const directReportsMap = {};

    employees.forEach(employee => {
        const { email, managerEmail } = employee;

        if (managerEmail) {
            if (!directReportsMap[managerEmail]) {
                directReportsMap[managerEmail] = [];
            }
            directReportsMap[managerEmail].push(email);
        }
    });

    const result = Object.keys(directReportsMap).map(managerEmail => ({
        managerEmail: managerEmail,
        directReports: directReportsMap[managerEmail]
    }));

    return result;
}

const getDirects = async (managerEmail, companyId) => {
    const response = await readDirectReports(managerEmail, companyId);

    if(response && response.directReports && response.directReports.length > 0){
         // response will lhave the details of the manager too who's reports are being considered here 
        response.directReports.push(managerEmail);

        // res will have data of direct reports including the manager's data
        const res = await Promise.all(response.directReports.map(async (direct) => {
            const employee = await readEmployee(direct, companyId);
            return {
                department: employee?.department,
                email: employee?.email,
                firstName: employee?.firstName,
                lastName: employee?.lastName,
                jobTitle: employee?.jobTitle,
                imageUrl: employee?.imageUrl
            };
        }));
        return res;   
    } else {
        return null;
    }
}

const updateDirects = async (collectionPrefix, managerEmail) => {
    // update any reporting changes 
}

const publishDirects = async () => {
    const employees = await readEmployees(`${collectionPrefix}_employees`);
    console.log(employees.length, collectionPrefix);
    const directs = {};

    employees.forEach(doc => {
        const managerEmail = doc.data.managerEmail.toString().toLowerCase();
        if (!directs[managerEmail]) {
          directs[managerEmail] = []; // Initialize with an empty array
        }
        directs[managerEmail].push(doc.id.toString().toLowerCase());
      });
      console.log(Object.keys(directs).length);
    
    Object.keys(directs).forEach( async (managerEmail) => {
        await createDirectReport(`${collectionPrefix}_directs`, {data: directs[managerEmail.toString().toLowerCase()], managerEmail: managerEmail.toString().toLowerCase()})
    })
}

module.exports = {
    publishDirects,
    getDirects,
    updateDirects,
    generateDirectReportsFromListOfEmployees
}