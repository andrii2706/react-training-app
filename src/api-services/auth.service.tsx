import { GoogleAuthProvider, signInWithPopup } from "firebase/auth";
import { AuthApp } from "../firebase";


export const AuthService = () => {
  const auth = AuthApp
  const googleProvider = new GoogleAuthProvider()
   
   
   async function signInWithCredentials(){

    }
  async  function signOutUser(){

    }
  async  function registerUser() {
        
    }
  async  function signIsWithGoogle(){
    try{
      await signInWithPopup(auth, googleProvider)
    }catch(error){
      console.log(error)
    }

    }
};
