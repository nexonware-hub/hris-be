const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'goals';

// Function to handle potential errors
const handleError = (error) => {
    console.error(error);
    throw error; // Re-throw for further handling
};

// Create Goal
async function createGoal(data) {
    const goal = {
        companyId: data.companyId,
        type: null,  // or "OKI"
        performanceCycle:  data.performanceCycle, // e.g., "2023-2024"
        cyclePeriod: data.cyclePeriod, // e.g., "q1", "q2"
        employeeId: data.employeeId,
        startDate: data.startDate,  // Replace with actual start date
        endDate: data.endDate,    // Replace with actual end date
        completionPercentage: 0,
        objective: {
          description: data.objective.description
        },
        keyResults: [
          {
            description: data.keyResults[0].description,
            achieved: false,
          }
        ],
        initiatives: [
          {
            description: data.initiatives[0].description,
            achieved: false,
          }
        ]
      };

    try {
        const docRef = await db.collection(collectionName).doc();
        console.log(goal);
        await docRef.set(goal);
        console.log('Goal written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        handleError(error);
    }
}

// Read Goal
async function readGoal(id) {
    try {
        const docRef = db.collection(collectionName).doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
            return doc.data();
        } else {
            console.log('No such Goal!');
            return null;
        }
    } catch (error) {
        handleError(error);
    }
}

// read Goal with employeeId
async function readGoalByEmployeeId(employeeId, companyId, performanceCycle, cyclePeriod) {
    try {
        const docRef = db.collection(collectionName);
        console.log(employeeId, companyId, performanceCycle, cyclePeriod);
        const queryRef = docRef.where("employeeId", "==", employeeId).where("companyId", "==", companyId).where("performanceCycle", "==", performanceCycle).where("cyclePeriod", "==", cyclePeriod);
        const docs = await queryRef.get();
        const goals = [];
        docs.forEach(doc => {
            console.log("doc.data()", doc.data());
            goals.push({...doc.data(), id: doc.id});
        })
        if(goals && goals.length > 0) {
            return goals;
        } else if(goals?.length === 0) {
            console.log(`Goals for employee ${employeeId} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}

module.exports = { createGoal, readGoal, readGoalByEmployeeId }