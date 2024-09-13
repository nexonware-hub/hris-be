const admin = require("./firebaseAdmin");

const sendNotification = async ({title, body, imageLink, url, token}) => {
    const message = {
        notification: {
          title: title,
          body: body,
          image: imageLink,
        },
        data: { url: url },
        token: token
      };

    await admin.getFbAdmin().messaging().send(message).then(res => {
        console.log(message);
    }).catch(err => {
        console.log(err);
    })
}

module.exports = {sendNotification}