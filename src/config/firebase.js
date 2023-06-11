
import { initializeApp } from "firebase/app";
import { getAnalytics } from "firebase/analytics";
import { getAuth, signInWithEmailAndPassword, onAuthStateChanged,projectAuth,signOut } from "firebase/auth";
import { getFirestore,collection, getDocs,addDoc,doc,deleteDoc,updateDoc} from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyB9N0Uc7028zhz7JaTv7b8i_pg2Lh6gUtA",
  authDomain: "aulastubalcain.firebaseapp.com",
  projectId: "aulastubalcain",
  storageBucket: "aulastubalcain.appspot.com",
  messagingSenderId: "232613619323",
  appId: "1:232613619323:web:af96f9b11e8544a673a4de",
  measurementId: "G-KZ241MG20W"
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const analytics = getAnalytics(app);
const Auth = getAuth(app)
const db = getFirestore(app)

export {Auth,db,signInWithEmailAndPassword,onAuthStateChanged,projectAuth,signOut,collection, getDocs,addDoc,doc,deleteDoc,updateDoc}