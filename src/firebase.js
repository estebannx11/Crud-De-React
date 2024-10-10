// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore } from "firebase/firestore"; 

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: "AIzaSyBY9uwENkGO9dcM9dsYRfyKOOLKFTDC9JU",
  authDomain: "crud-react-3274f.firebaseapp.com",
  projectId: "crud-react-3274f",
  storageBucket: "crud-react-3274f.appspot.com",
  messagingSenderId: "192675952487",
  appId: "1:192675952487:web:25ecd92be3da928999e1c2"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);

// Inicializa Firestore
const db = getFirestore(app);

export { db };