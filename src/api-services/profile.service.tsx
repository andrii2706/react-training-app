import { getAuth } from "firebase/auth";

export const getUserData = () => {
    const auth = getAuth();
    return auth.currentUser
};
