const fbadmin = require('firebase-admin');
const credentials = require("./admin-key.json");
const { getAuth, getMessaging } = require('firebase-admin/auth');
require('dotenv').config();

class FirebaseAdmin {
  constructor() {
    credentials.private_key_id = process.env.PRIVATE_KEY_ID;
    credentials.private_key = process.env.PRIVATE_KEY;
    fbadmin.initializeApp({
      credential: fbadmin.credential.cert(credentials)
    });

    this.db = fbadmin.firestore();
    this.auth = getAuth();
  }

  getFirestore() {
    return this.db;
  }

  getAuth(){
    return this.auth;
  }

  getFbAdmin() {
    return fbadmin;
  }
}

const admin = new FirebaseAdmin();

module.exports = admin;