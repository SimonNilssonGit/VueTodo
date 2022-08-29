import { initializeApp } from "firebase/app";
import { getFirestore, collection, getDocs } from "firebase/firestore";


const firebaseConfig = {
  apiKey: "AIzaSyD9ifr2FYdYE1WpcdEyCZ6udSXbqb3NLVw",
  authDomain: "fir-todolist-3b133.firebaseapp.com",
  projectId: "fir-todolist-3b133",
  storageBucket: "fir-todolist-3b133.appspot.com",
  messagingSenderId: "353700636637",
  appId: "1:353700636637:web:8d2a05228e6d85733c7834"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
// Initialize Cloud Firestore and get a reference to the service
const db = getFirestore(app);


export {
    db
}

