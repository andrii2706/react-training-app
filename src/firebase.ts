// Import the functions you need from the SDKs you need
import { initializeApp } from 'firebase/app';
import { Auth, getAuth } from 'firebase/auth';
// TODO: Add SDKs for Firebase products that you want to use
// https://firebase.google.com/docs/web/setup#available-libraries

// Your web app's Firebase configuration
const firebaseConfig = {
  apiKey: 'AIzaSyD6tJE52C58JYLy7wbQ9hMCH_ubqdAVDl8',
  authDomain: 'rick-and-morty-5895e.firebaseapp.com',
  databaseURL: 'https://rick-and-morty-5895e-default-rtdb.firebaseio.com',
  projectId: 'rick-and-morty-5895e',
  storageBucket: 'rick-and-morty-5895e.firebasestorage.app',
  messagingSenderId: '781727140191',
  appId: '1:781727140191:web:670a83807d9470503dceea',
};

// Initialize Firebase
const app = initializeApp(firebaseConfig);
export const AuthApp: Auth = getAuth(app);
