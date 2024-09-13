const admin = require("../firebaseAdmin");

const db = admin.getFirestore();

const collectionName = 'employees';

// Function to handle potential errors
const handleError = (error) => {
  console.error(error);
  throw error; // Re-throw for further handling
};

// Create a Employee
async function createEmployee(data) {
    data.resigned = false; // left the company

    try {
      const docRef = await db.collection(collectionName).doc();
      console.log(data);
      await docRef.set(data);
      console.log('Employee written with ID:', docRef.id);
      return docRef.id;
    } catch (error) {
      console.error('Error adding Employee:', error);
      throw error;
    }
  }
  
  // Read all Employees
  async function readEmployees() {
    try {
      const snapshot = await db.collection(collectionName).get();
      const Employees = snapshot.docs.map(doc => ({ id: doc.id, data: doc.data() }));
      return Employees;
    } catch (error) {
      console.error('Error reading Employees:', error);
      throw error;
    }
  }

  // Read employee by employeeId (document Id)
  async function readEmployeeById(id) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      const doc = await docRef.get();
      if (doc.exists) {
          return doc.data();
      } else {
          console.log('No such employee!');
          return null;
      }
  } catch (error) {
      handleError(error);
  }
  }
  
  // Read a specific Employee
  async function readEmployee(email, companyId) {
    try {
      const docRef = db.collection(collectionName);

      var queryRef;

      queryRef = docRef.where("email", "==", email).where("companyId", "==", companyId);
      
      const docs = await queryRef.get();
      const employees = [];
      docs.forEach(doc => {
          employees.push({...doc.data(), id: doc.id});
      })
      
      if(employees && employees.length > 0) {
          // get the employee who has not resigned, as the same email(usually personal emails) could be used by someone
          // freelancing for different companies
          // return employees.find(employee => !employee.resigned);
          return employees[0];
      } else {
          console.log(`Employee with email ${email} not found! `);
          return null;
      }
    } catch (error) {
      console.error('Error reading Employee:', error);
      throw error;
    }
  }
  
  // Update a Employee
  async function updateEmployee(id, data) {
    try {
      const docRef = db.collection(collectionName).doc(id);
      await docRef.update(data);
      console.log('Employee updated with ID:', id);
      return id;
    } catch (error) {
        handleError(error);
    }
  }
  
  // Delete a Employee
  async function deleteEmployee(collectionName, id) {
    try {
      await db.collection(collectionName).doc(id).delete();
      console.log('Employee deleted successfully');
    } catch (error) {
      console.error('Error deleting Employee:', error);
      throw error;
    }
  }
  
  module.exports = {
    createEmployee,
    readEmployees,
    readEmployee,
    updateEmployee,
    deleteEmployee,
    readEmployeeById
  };