
var admin = require("firebase-admin");

// var serviceAccount = require("src/components/project-warm-water-firebase-adminsdk-gbqrt-55e7562d43.json");

const firebaseApp = admin.initializeApp({
  credential: admin.credential.applicationDefault(),
  databaseURL: "https://project-warm-water.firebaseio.com",
  apiKey: "AIzaSyCFNWCUZFUe7TJesPAndFcveQirt3XoCyE",
  authDomain: "project-warm-water.firebaseapp.com",
  projectId: "project-warm-water",
  storageBucket: "project-warm-water.appspot.com",
  messagingSenderId: "448306602599",
  appId: "1:448306602599:web:ed71618ecc4d35d48d6ac2",
  measurementId: "G-844VLCNEG5"
});

const db = firebaseApp.firestore();

export { db };
