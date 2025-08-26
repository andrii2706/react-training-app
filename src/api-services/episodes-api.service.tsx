import { collection, getDocs } from 'firebase/firestore';
import { db } from '../firebase';

const apiRaw = 'https://rickandmortyapi.com/api';
const firestore = db;

export const getEpisodes = (page: number) => {
  return fetch(`${apiRaw}/episode?page=${page}`).then(response => response.json());
};
export const getEpisodeForDetailsPage = (id: number) => {
  return fetch(`${apiRaw}/episode/${id}`).then(response => response.json());
};
export const getEpisode = (url: string) => {
  return fetch(`${url}`).then(response => response.json());
};
export const getEpisodesDataFromFireBase = async () => {
  const snapshot = await getDocs(collection(firestore, 'selectedEpisodes'));
  return snapshot.docs.map(doc => ({
    id: doc.id,
    ...doc.data(),
  }));
};
export const updateEpisodesDataIntoFireBasee = () => {};
