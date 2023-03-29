// Import the functions you need from the SDKs you need
import 'firebase/firestore';
import 'firebase/auth';
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional
const firebaseConfig = {
  apiKey: "AIzaSyBZZYALfX84V87_Hk7G_IzhSQtT5qn2kkY",
  authDomain: "enigma-ta-do-list.firebaseapp.com",
  projectId: "enigma-ta-do-list",
  storageBucket: "enigma-ta-do-list.appspot.com",
  messagingSenderId: "859613355566",
  appId: "1:859613355566:web:a719937432579dae38c9bf",
  measurementId: "G-B3CM1W75ZN"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = firebase.firestore();
const auth = firebase.auth();

db.collection("taches").add({
  titre: "Ma nouvelle tâche",
  description: "Description de ma tâche"
})
.then((docRef) => {
  console.log("Document ajouté avec ID : ", docRef.id);
})
.catch((error) => {
  console.error("Erreur lors de l'ajout de la tâche : ", error);
});
