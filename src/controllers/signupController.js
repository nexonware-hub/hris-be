
const admin = require("../firebaseClient/firebaseAdmin");

const signUp = async (req, res) => {
    const {email, password} = req.body;
    const user = admin.auth.createUser({
        email,
        password
    }).then((userRecord) => {

        console.log('user created with uid: ' + userRecord.uid);

        // adding company id in claims 'maybe' because no one can change this profile info from a client side application
        // companyId will be used to restrict users from accessing information about other companies' employees
        // every document in every collection must have a companyId associated with it
        // the check for allowing only company-mates to see the info will be put in the firebase rules
        admin
            .auth
            .setCustomUserClaims(userRecord.uid, { companyId: req.body.companyId })
            .then(() => {
                console.log('Claims added');
                // The new custom claims will propagate to the user's ID token the
                // next time a new one is issued.
            }).catch((error) => {
                console.log('Error adding custom claims:', error);
            });
            res.status(201).json({userRecord});
    }).catch((error) => {
        console.log('Error creating new user:', error);
        res.status(400).json({message: error.errorInfo.code});
    });
}

module.exports = {
    signUp
}