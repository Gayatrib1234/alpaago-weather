import { initializeApp } from 'firebase/app';
import { getAuth } from 'firebase/auth';
import { getFirestore } from 'firebase/firestore';

const firebaseConfig = {
  apiKey: "AIzaSyDDYwif9FkOrR4E7DP8_W9Aj3Po7vvDBm0",
  authDomain: "flutterapp1-a4b86.firebaseapp.com",
  projectId: "flutterapp1-a4b86",
  storageBucket: "flutterapp1-a4b86.appspot.com",
  messagingSenderId: "802973469288",
  appId: "1:802973469288:web:87dd69d6148c234e2889dd",
  measurementId: "G-K7751J4M11"
};

const app = initializeApp(firebaseConfig);
const auth = getAuth(app);
const firestore = getFirestore(app);

export { auth, firestore, firebaseConfig };
