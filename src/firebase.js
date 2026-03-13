// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getDatabase } from "firebase/database";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyCQelX1fAUrCNnZRXOOw8EPOLIXWaHKR6M",
  authDomain: "gannasuno-d133f.firebaseapp.com",
  projectId: "gannasuno-d133f",
  storageBucket: "gannasuno-d133f.firebasestorage.app",
  databaseURL: "https://gannasuno-d133f-default-rtdb.firebaseio.com",
  messagingSenderId: "354393742448",
  appId: "1:354393742448:web:38b2c440eb1008d98b28b5",
  measurementId: "G-P69HTBS3F8"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Initialize Realtime Database
export const db = getDatabase(app);
export default app;
