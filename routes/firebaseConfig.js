var admin = require("firebase-admin");

var serviceAccount = require("./greenie-energy-4f5ef00ffb05.json");


admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://greenie-energy-default-rtdb.asia-southeast1.firebasedatabase.app"
})



module.exports.admin = admin