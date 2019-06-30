const firestoreService = require("firestore-export-import");
const serviceAccount = require("./serviceAccountKey.json");

// Initiate Firebase App
firestoreService.initializeApp(
  serviceAccount,
  "https://rolemaster-sheet-app.firebaseio.com"
);

// Start importing your data
// The array of date and location fields are optional
firestoreService.restore("testjson.json");
