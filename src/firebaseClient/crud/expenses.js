const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'expenses';

// Function to handle potential errors
const handleError = (error) => {
    console.error(error);
    throw error; // Re-throw for further handling
};

// Create Expense
async function createExpense(data) {
    const expense = {
        companyId: data.companyId,
        employeeId: data.employeeId,
        managerEmail: data.managerEmail,
        submittedAt: new Date().toString(),
        category: data.category,
        status: 0,
        expenseDate: data.expenseDate,
        amount: data.amount,
        currency: data.currency,
        resolvedBy: null,
        resolvedOn: null,
        description: data.description,
        reimbursementStatus: null,
        reimbursementDate: null,
        attachment: data.attachment
    }
    try {
        const docRef = await db.collection(collectionName).doc();
        console.log(expense);
        await docRef.set(expense);
        console.log('Expense written with ID:', docRef.id);
        return docRef.id;
    } catch (error) {
        handleError(error);
    }
}

// Read Expenses
async function readExpensesByEmployeeIdAndCompanyId(employeeId, companyId) {
    try {
        const docRef = db.collection(collectionName);
        const queryRef = docRef.where("employeeId", "==", employeeId).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const expenses = [];
        docs.forEach(doc => {
            expenses.push({...doc.data(), id: doc.id});
        })
        if(expenses && expenses.length > 0) {
            return expenses;
        } else if(expenses?.length === 0) {
            console.log(`Expenses for employee ${employeeId} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}

// Read Expenses
async function readExpensesByManagerEmailAndCompanyId(managerEmail, companyId) {
    try {
        const docRef = db.collection(collectionName);
        const queryRef = docRef.where("managerEmail", "==", managerEmail).where("companyId", "==", companyId);
        const docs = await queryRef.get();
        const expenses = [];
        docs.forEach(doc => {
            expenses.push({...doc.data(), id: doc.id});
        })
        if(expenses && expenses.length > 0) {
            return expenses;
        } else if(expenses?.length === 0) {
            console.log(`Expenses requests for manager ${managerEmail} not found!`);
            return [];
        }
    } catch (error) {
        handleError(error);
    }
}

// update leave
async function updateExpense(id, data) {
    try {
        const docRef = db.collection(collectionName).doc(id);
        const res = await docRef.update(data);
        console.log('Expense updated with ID:', id);
        return res;
    } catch (error) {
        handleError(error);
        return null;
    }
}


module.exports = { createExpense, readExpensesByEmployeeIdAndCompanyId, readExpensesByManagerEmailAndCompanyId, updateExpense }