// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";
export const firebaseConfig = {
  apiKey: "AIzaSyB7qn0opRhnmTkH34EP07WjpcIlpzHYt4k",
  authDomain: "invoice-gen-490db.firebaseapp.com",
  projectId: "invoice-gen-490db",
  storageBucket: "invoice-gen-490db.appspot.com",
  messagingSenderId: "204288078213",
  appId: "1:204288078213:web:f449863237002560bbd4ec",
  measurementId: "G-53QS24HMTN",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const db = getFirestore(app);
export { app, auth, db };
