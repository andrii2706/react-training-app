import { GoogleAuthProvider, signInWithPopup, User } from 'firebase/auth';
import { AuthApp } from '../firebase';
import setUser from '../store/user-data/user-data';
import { AppDispatch } from '../store/store';



const auth = AuthApp;
  const googleProvider = new GoogleAuthProvider();

 export async function signInWithCredentials() {}
 export async function signOutUser() {}
 export async function registerUser() {}
 export async function signIsWithGoogle(dispatch: AppDispatch) {

    try {
     const result = await signInWithPopup(auth, googleProvider);
     console.log(result)
      // setUser(, dispatch)
    } catch (error) {
      console.log(error);
    }
  }