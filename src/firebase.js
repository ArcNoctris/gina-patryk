// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyANr9cM0fl0KxAgFGRlV6FQr0moR8w2CiU",
  authDomain: "gina-patryk.firebaseapp.com",
  projectId: "gina-patryk",
  storageBucket: "gina-patryk.firebasestorage.app",
  messagingSenderId: "758279659862",
  appId: "1:758279659862:web:5b68daf11c929e5b43b6f7",
  measurementId: "G-04GGBD6XDD"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export { app, analytics, db };
