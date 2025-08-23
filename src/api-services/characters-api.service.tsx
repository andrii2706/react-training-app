import {collection, getDocs} from 'firebase/firestore';
import { db } from '../firebase';


const apiRaw = 'https://rickandmortyapi.com/api';
const firestore  = db;

export const getCharactersFromBe = (page: number) => {
  return fetch(`${apiRaw}/character?page=${page}`).then(response => response.json());
};
export const getCharaterFromBe = (id: number) => {
  return fetch(`${apiRaw}/character/${id}`).then(response => response.json());
};
 export const getCharactersDataFromFireBase = async () => {
const snapshot = await getDocs(collection(firestore, "selectedCharacters"))
   return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data()
  }));;
}
export const updateCharacterDataIntoFireBasee = () => {

}