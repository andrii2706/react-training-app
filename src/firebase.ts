import { initializeApp } from "firebase/app";
import { getAuth } from 'firebase/auth';

const firebaseConfig = {
  apiKey: "AIzaSyD6tJE52C58JYLy7wbQ9hMCH_ubqdAVDl8",
  authDomain: "rick-and-morty-5895e.firebaseapp.com",
  projectId: "rick-and-morty-5895e",
  storageBucket: "rick-and-morty-5895e.firebasestorage.app",
  messagingSenderId: "781727140191",
  appId: "1:781727140191:web:670a83807d9470503dceea"
};

const app = initializeApp(firebaseConfig);
export const auth = getAuth(app);