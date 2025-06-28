import { configureStore } from '@reduxjs/toolkit';
import charactersData from './characters-data/characters-data';
import userData from './user-data/user-data';
import episodesData from './episodes/episodes-data';
import myWishListData from './my-wish-list-data/my-wish-list-data';
import locationsData from './locations-data/location-data';

export const store = configureStore({
  reducer: {
    characters: charactersData,
    userData: userData,
    episodes: episodesData,
    locations: locationsData,
    wishList: myWishListData,
  },
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
