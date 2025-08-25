import { createUserWithEmailAndPassword, GoogleAuthProvider, signInWithEmailAndPassword, signInWithPopup, signOut } from 'firebase/auth';
import { AuthApp } from '../firebase';
import { setUser } from '../store/user-data/user-data';
import { AppDispatch } from '../store/store';

const auth = AuthApp;
const googleProvider = new GoogleAuthProvider();

export async function signInWithCredentials(
  email: string,
  password: string,
  dispatch: AppDispatch
) {
  try {
    const result = await signInWithEmailAndPassword(auth, email, password);
    dispatch(setUser(result.user));
    return result.user
  } catch (error) {
    console.log(error);
  }
}
export const signOutUser = async () => {
  try{
    await signOut(auth);
  }catch(error){
    console.error(error)
  }
}
export const registerUser = async(email: string, password: string, dispatch: AppDispatch) => {
    try{
      const currentUser = await createUserWithEmailAndPassword(auth, email, password)
      dispatch(setUser(currentUser.user));
      return currentUser.user
    }catch(error){
      console.error(error)
    }
}
export async function signIsWithGoogle(dispatch: AppDispatch) {
  try {
    const result = await signInWithPopup(auth, googleProvider);
    dispatch(setUser(result.user));
    return result.user;
  } catch (error) {
    console.log(error);
  }
}
