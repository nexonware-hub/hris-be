const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'reviews';

// Function to handle potential errors
const handleError = (error) => {
    console.error(error);
    throw error; // Re-throw for further handling
};  

// Create Review
async function createReview(data) {
    try {
        const review = {
            companyId: data.companyId,
            performanceCycle: data.performanceCycle, // e.g., "2023-2024"
            cyclePeriod: data.cyclePeriod, // e.g., "q1", "q2"
            employeeId: data.employeeId,
            selfReview: {
              rating: data.selfReview?.rating,
              achievements: data.selfReview?.achievements,
              challenges: data.selfReview?.challenges,
              developmentNeeds: data.selfReview?.developmentNeeds,
              comments: data.selfReview?.comments || ""
            },
            managerReview: {
              managerEmail: null,
              rating: null,
              performanceSummary: null,
              goalAchievementEvaluation: null,
              areasOfImprovement: null,
              comments: null
            },
            finalCommentsAfterReviewDiscussion: null
          }
          
        const docRef = await db.collection(collectionName).doc();
        console.log(review);
        await docRef.set(review);
        console.log('Review written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        handleError(error);
    }
}

// Read Review by employeeId, performanceCycle, and cyclePeriod
async function readReviewforCyclePeriod(employeeId, companyId, performanceCycle, cyclePeriod) {
    try {
        console.log(employeeId, companyId, performanceCycle, cyclePeriod);
        const docRef = db.collection(collectionName);
        const queryRef = docRef.where("employeeId", "==", employeeId).where("performanceCycle", "==", performanceCycle).where("cyclePeriod", "==", cyclePeriod).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const reviews = [];
        docs.forEach(doc => {
            reviews.push({...doc.data(), id: doc.id});
        })
        if(reviews && reviews.length > 0) {
            return reviews;
        } else if(reviews?.length === 0) {
            console.log(`Reviews for employee ${employeeId} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}



module.exports = { 
    handleError,
    createReview,
    readReviewforCyclePeriod
}