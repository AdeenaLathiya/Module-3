import firebase from "firebase";

// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBOJmddR4bHgXDp6eEO2Q3AxioLEcPf2OA",
  authDomain: "tweet-web-app-734e8.firebaseapp.com",
  projectId: "tweet-web-app-734e8",
  storageBucket: "tweet-web-app-734e8.appspot.com",
  messagingSenderId: "941556849858",
  appId: "1:941556849858:web:096f2c07243663123aaf5b",
  measurementId: "G-SNKX271NM6",
};

const firebaseApp = firebase.initializeApp(firebaseConfig);

const db = firebaseApp.firestore();

export default db;
