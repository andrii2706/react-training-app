import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';

const firestore  = db;

export const WishListService = async () => {
     const snapshot = await getDocs(collection(firestore, "watchList"))
        return snapshot.docs.map(doc => ({
         id: doc.id,
         ...doc.data()
       }));;
};
