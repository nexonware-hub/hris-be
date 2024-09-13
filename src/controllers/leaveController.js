
const { readEmployee } = require("../firebaseClient/crud/employee");
const { createLeaveApplication, readEmployeeLeaves, updateLeave } = require("../firebaseClient/crud/leave");
const { sendNotification } = require("../firebaseClient/sendNotification");
const { sendMail, applicationTemplate, ApplicationType, newApplicationTemplate, applicationUpdateTemplate } = require("../sendMail");


const postLeaveApplication = async (req, res) => {
    const {leaveType, datesAndDuration, reason, attachment} = req.body;
    console.log(req.user.managerEmail);
    const application = {
        employeeEmail: req.user.email,
        managerEmail: req.user.employeeData.managerEmail,
        leaveType: leaveType,
        dates: datesAndDuration, // array of objects {date: date, duration: half/full day}
        reason: reason,
        status: 0, // 0 = pending, 1 = approved, -1 = rejected
        appliedOn: new Date().toString(),  // Thu Aug 01 2024 00:00:00 GMT+0530 (India Standard Time)
        resolvedBy: null,
        resolvedOn: null,
        companyId: req.user.employeeData?.companyId,
        attachment: attachment
    }
    const applicationId = await createLeaveApplication(application);

    const manager = await readEmployee(req.user.employeeData?.managerEmail, req.user.employeeData?.companyId);
    // const managerFcm = manager.fcmToken;

    if(applicationId){
        // await sendNotification({
        //     title: 'New Leave Application',
        //     body: "",
        //     imageLink: "",
        //     url: "",
        //     token: managerFcm
        // })
        sendMail(manager.email, 'New Leave Application', newApplicationTemplate(ApplicationType.LEAVE, req.user.employeeData?.firstName, '/hris/requests'));
        res.status(200).json({applicationId: applicationId});
    } else {
        res.status(500).json("Internal Server Error");
    }
}

// get leaves by employee email
const getLeaves = async (req, res) => {
    const leaves = await readEmployeeLeaves(req.user.email, req.user.employeeData?.companyId);

    if(leaves){
        res.status(200).json(leaves);
    } else {
        res.status(404).json("Not found");
    }
}

// update leaves
const updateLeaveData = async (req, res) => {
    console.log('updating leave');
    const updatedLeave =  await updateLeave(req.body.id, {...req.body.data, resolvedBy: req.user.email, resolvedOn: new Date().toString()});
    console.log(JSON.stringify(updatedLeave) + "DSDDSD");
    if(updatedLeave){
        sendMail(req.body.employeeEmail, 'Update on your leave application', applicationUpdateTemplate(ApplicationType.LEAVE, '/hris/leaves'));
        res.status(200).json(updatedLeave);
    } else {
        res.status(500).json("Internal Server Error");
    }
}

module.exports = {
    postLeaveApplication,
    getLeaves,
    updateLeaveData
}