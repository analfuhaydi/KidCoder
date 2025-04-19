// Firebase configuration
import { initializeApp } from "firebase/app";
import { getAuth } from "firebase/auth";
import { getFirestore } from "firebase/firestore";

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyDa77ftY1S5WGdtYVylh9xjkvgvBvxEtNY",
  authDomain: "lohatksa-3c0e2.firebaseapp.com",
  projectId: "lohatksa-3c0e2",
  storageBucket: "lohatksa-3c0e2.appspot.com",
  messagingSenderId: "781984904501",
  appId: "1:781984904501:web:88d396d94d03f7b592087c",
  measurementId: "G-2EB9BR9S2G",
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Get Firebase services
export const auth = getAuth(app);
export const db = getFirestore(app);
export default app;
