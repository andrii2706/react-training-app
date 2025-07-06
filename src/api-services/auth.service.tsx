import { GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup } from 'firebase/auth';
import { AuthApp } from '../firebase';
import { setUser } from '../store/user-data/user-data';
import { AppDispatch } from '../store/store';

const auth = AuthApp;
const googleProvider = new GoogleAuthProvider();

export async function signInWithCredentials(email: string, password: string, dispatch: AppDispatch) {
    try {
      const result = await signInWithEmailAndPassword(auth, email,password); 
       dispatch(setUser(result.user)) 
    } catch (error) {
      console.log(error);
    }
}
export async function signOutUser() {}
export async function registerUser() {}
export async function signIsWithGoogle(dispatch: AppDispatch) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    dispatch(setUser(result.user)) 
  } catch (error) {
    console.log(error);
  }
}
