import { getAuth, updateEmail, updateProfile, User } from 'firebase/auth';

export const getUserData = () => {
  const auth = getAuth();
  return auth.currentUser;
};

export const updateUserPhotoAndName = async (photoUrl: string, name: string) => {
    const auth = getAuth();
    const user = auth.currentUser as User;
  if(user){
    try{
      await updateProfile(user, {
        displayName: name,
        photoURL: photoUrl
      })
    }
    catch(error){
      console.log(error)
    }
  }
}

export const updateUserEmail = async (email: string) => {
   const auth = getAuth();
    const user = auth.currentUser as User;
  if(user){
    try{
      await updateEmail(user, 
        email
      )
    }
    catch(error){
      console.log(error)
    }
  }
}