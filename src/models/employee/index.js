class Employee {
    constructor(data) {
      this.department = data.department;
      this.jobTitle = data.jobTitle;
      this.email = data.email;
      this.employeeId = data.employeeId;
      this.fullName = data.fullName;
      this.managerEmail = data.managerEmail;
      this.location = data.location;
      this.employeeType = data.employeeType; // fulltime / parttime
    }

    toObject() {
      return {
        department: this.department,
        jobTitle: this.jobTitle,
        email: this.email,
        employeeId: this.employeeId,
        fullName: this.fullName,
        managerEmail: this.managerEmail,
        location: this.location,
        employeeType: this.employeeType,
      };
    }
  }

  module.exports = Employee;