import { updateDoc, doc, arrayUnion } from 'firebase/firestore';
import { db } from '../firebase';
import { CharactesInterface } from '../shared/models/character.interface';
import { EpisodesInterface } from '../shared/models/episodes.interface';
import { LocationInterface } from '../shared/models/location.interface';

const firestore = db;

export const addToFavouriteCharacters = async (character: CharactesInterface) => {
  const docRef = doc(db, 'selectedCharacters', 'gTUFLCMkqAGaJt6wN4t4');
  await updateDoc(docRef, {
    characters: arrayUnion(character),
  });
};

export const addToFavouriteEpisodes = async (episodes: EpisodesInterface) => {
  const docRef = doc(db, 'selectedEpisodes', 'mfIkFL2M1KLNq4IYaePM');
  await updateDoc(docRef, {
    characters: arrayUnion(episodes),
  });
};
export const addToFavouriteLocations = async (locations: LocationInterface) => {
  const docRef = doc(db, 'selectedLocations', 'q5Um03nWj6KeBubp8BKR');
  await updateDoc(docRef, {
    characters: arrayUnion(locations),
  });
};
