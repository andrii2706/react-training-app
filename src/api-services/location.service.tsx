import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';

const apiRaw = 'https://rickandmortyapi.com/api';
const firestore  = db;

export const getLocations = (page: number) => {
  return fetch(`${apiRaw}/location?page=${page}`).then(response => response.json());
};

export const getLocation = (id: number) => {
  return fetch(`${apiRaw}/location/${id}`).then(response => response.json());
};

export const getLocationForCharacter =(url: string) => {
  return fetch(`${url}`).then(response => response.json());
}

export const getLocationsDataFromFireBase = async () => {
  const snapshot = await getDocs(collection(firestore, "selectedLocations"))
     return snapshot.docs.map(doc => ({
      id: doc.id,
      ...doc.data()
    }));;
}