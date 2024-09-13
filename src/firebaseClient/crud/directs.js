const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'directReports';

// Function to handle potential errors
const handleError = (error) => {
  console.error(error);
  throw error; // Re-throw for further handling
};

// Create Direct Report
async function createDirectReport(data) {
  // Assuming data includes manager email and employee IDs
  try {
    const docRef = await db.collection(collectionName).doc();
      console.log(data);
      await docRef.set(data);
      console.log('Direct reports written with ID:', docRef.id);
      return docRef.id;
  } catch (error) {
    handleError(error);
  }
}

// Read Direct Reports
async function readDirectReports(managerEmail, companyId) {
  try {
    const docRef = db.collection(collectionName);
        const queryRef = docRef.where("managerEmail", "==", managerEmail).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const directs = [];
        docs.forEach(doc => {
            directs.push(doc.data());
        })
        if(directs && directs.length > 0) {
            return directs[0];
        } else {
            console.log(`Direct reports for manager ${managerEmail} not found!`);
            return null;
        }
  } catch (error) {
    handleError(error);
  }
}

// Update Direct Reports (Modify Existing Array)
async function updateDirectReports(collectionName, managerEmail, employeeIds) {
  try {
    const docRef = await db.collection(collectionName).doc(managerEmail);
    await docRef.update({ directs: employeeIds });
    console.log('Direct reports updated for manager:', managerEmail);
  } catch (error) {
    handleError(error);
  }
}

// Delete Direct Report (Remove from Array)
async function deleteDirectReport(collectionName, managerEmail, employeeId) {
  try {
    const docRef = await db.collection(collectionName).doc(managerEmail).get();
    if (docRef.exists) {
      const currentEmployees = docRef.data().employees || [];
      const updatedEmployees = currentEmployees.filter(id => id !== employeeId);
      await docRef.update({ directs: updatedEmployees });
      console.log('Direct report deleted for manager:', managerEmail);
    } else {
      console.log('No direct reports found for manager:', managerEmail);
    }
  } catch (error) {
    handleError(error);
  }
}

module.exports = {
  createDirectReport,
  readDirectReports,
  updateDirectReports,
  deleteDirectReport,
};

