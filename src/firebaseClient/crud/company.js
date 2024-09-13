const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'companies';

// Function to handle potential errors
const handleError = (error) => {
    console.error(error);
    throw error; // Re-throw for further handling
};

// Create Company
async function createCompany(data) {
    try {
        data.addOnTools = [];
        const docRef = await db.collection(collectionName).doc();
        console.log(data);
        await docRef.set(data);
        console.log('Company written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        handleError(error);
    }
}

// Read Company
async function readCompany(id) {
    try {
        const docRef = db.collection("companies").doc(id);
        const doc = await docRef.get();
        if (doc.exists) {
            return {...doc.data(), id: doc.id};
        } else {
            console.log('No such Company!');
            return null;
        }
    } catch (error) {
        handleError(error);
    }
}

// Update Company
async function updateCompany(id, data) {
    try {
        const docRef = db.collection(collectionName).doc(id);
        await docRef.update(data);
        console.log('Company updated with ID:', id);
    } catch (error) {
        handleError(error);
    }
}

module.exports = { createCompany, readCompany, updateCompany}