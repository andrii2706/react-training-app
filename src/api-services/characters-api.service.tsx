import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';
import { FilterInterface } from '../shared/models/filter.interface';

const apiRaw = 'https://rickandmortyapi.com/api';
const firestore = db;

export const getCharactersFromBe = (page: number, option?: FilterInterface) => {
  return fetch(`${apiRaw}/character?page=${page}&name=${option?.name}&gender=${option?.gender}&species=${option?.species}`).then(response => response.json());
};
export const getCharaterFromBe = (id: number) => {
  return fetch(`${apiRaw}/character/${id}`).then(response => response.json());
};

export const getResidentsFromBe = (url: string) => {
  return fetch(url).then(responce => responce.json());
};

export const getCharactersDataFromFireBase = async () => {
  const snapshot = await getDocs(collection(firestore, 'selectedCharacters'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const updateCharacterDataIntoFireBasee = () => {};
