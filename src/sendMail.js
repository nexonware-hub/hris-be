const nodemailer = require('nodemailer');
const { appBaseUrl } = require('./constants');

const transporter = nodemailer.createTransport({
    secure: true,
    host: 'smtp.gmail.com',
    port: 465,
    auth: {
        user: process.env.MAIL_USERNAME,
        pass: process.env.MAIL_PASSWORD
    }
});

const sendMail = (to, sub, msg) => {
    transporter.sendMail({
        to: to,
        subject: sub,
        html: msg
    });
}

const ApplicationType = {
    LEAVE:"Leave",
    EXPENSE:"Expense"
}

const newApplicationTemplate = (applicationType, applicant, route) => {
    return `New ${applicationType} application by ${applicant} has been submitted.
    <br/>
    Please click on the link below to view the application. ${appBaseUrl + route}`
};

const applicationUpdateTemplate = (applicationType, route) => {
    return `Your ${applicationType} application has an update.
    <br/>
    Please click on the link below to view the application. ${appBaseUrl + route}`
};


module.exports = {
    sendMail,
    newApplicationTemplate,
    applicationUpdateTemplate,
    ApplicationType
}