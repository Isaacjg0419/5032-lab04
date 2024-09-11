// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getFirestore } from "firebase/firestore"; // Corrected 'getFirestore'

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyB_rsAfOlylzLSqSfBBLxCPC6iv5ALFdAE",
  authDomain: "week7-jiayuan-6b508.firebaseapp.com",
  projectId: "week7-jiayuan-6b508",
  storageBucket: "week7-jiayuan-6b508.appspot.com",
  messagingSenderId: "697403837256",
  appId: "1:697403837256:web:66b381bc0d37a65d16817d",
  measurementId: "G-4X6ZF6NJR0"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const db = getFirestore(app);

export default db;
