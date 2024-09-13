const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'leaves';

// Function to handle potential errors
const handleError = (error) => {
    console.error(error);
    throw error; // Re-throw for further handling
};

// Create Leave
async function createLeaveApplication(data) {

    // 
    try {
        const docRef = await db.collection(collectionName).doc();
        console.log(data);
        await docRef.set(data);
        console.log('Leave written with ID:', docRef.id);

        return docRef.id;

    } catch (error) {
        handleError(error);
    }
}

// read leaves by employee email
async function readEmployeeLeaves(employeeEmail, companyId) {
    try {
        const docRef = db.collection(collectionName);
        const queryRef = docRef.where("employeeEmail", "==", employeeEmail).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const leaves = [];
        docs.forEach(doc => {
            leaves.push({...doc.data(), id: doc.id});
        })
        if(leaves && leaves.length > 0) {
            return leaves;
        } else if(leaves?.length === 0) {
            console.log(`Leaves for employee ${employeeEmail} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}

// read leaves by manager email, to show the list to the manager
async function readEmployeeLeavesByManagerEmailandcompanyId(managerEmail, companyId) {
    try {
        const docRef = db.collection(collectionName);
        const queryRef = docRef.where("managerEmail", "==", managerEmail).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const leaves = [];
        docs.forEach(doc => {
            leaves.push({...doc.data(), id: doc.id});
        })
        if(leaves && leaves.length > 0) {
            return leaves;
        } else if(leaves?.length === 0) {
            console.log(`Leaves requests for manager ${managerEmail} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}

// update leave
async function updateLeave(id, data) {
    try {
        const docRef = db.collection(collectionName).doc(id);
        const res = await docRef.update(data);
        console.log('Leave updated with ID:', id);
        return res;
    } catch (error) {
        handleError(error);
        return null;
    }
}

module.exports = { createLeaveApplication, readEmployeeLeaves, updateLeave, readEmployeeLeavesByManagerEmailandcompanyId }