const firestoreService = require("firestore-export-import");
const serviceAccount = require("./serviceAccountKey.json");
const admin = require("firebase-admin");
const data = require("./src/newchar.json");

// Initiate Firebase App
firestoreService.initializeApp(
  serviceAccount,
  "https://rolemaster-sheet-app.firebaseio.com"
);

var db = admin.firestore();

// const data = JSON.parse("src/newchar.json");

// Start importing your data
// The array of date and location fields are optional

db.collection("users")
  .doc("0")
  .collection("characters")
  .doc("0")
  .set({
    0: data
  });

// firestoreService.restore("src/newchar.json");
