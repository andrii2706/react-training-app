import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { CharactesInterface } from '../../shared/models/character.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { InitialCharactersStateInterface } from '../../shared/models/store.interface';


const initialState:InitialCharactersStateInterface = {
  characters: [],
  paginationInfo: null
};

const charactersData = createSlice({
  name: 'charactersData',
  initialState,
  reducers: {
    setCharactersStore(state, action: PayloadAction<CharactesInterface[]>) {
      state.characters = action.payload;
    },
     setPaginationInfoStore(state, action: PayloadAction<PaginationInfoInterface>) {
      state.paginationInfo = action.payload;
    },
  },
});

export const { setCharactersStore, setPaginationInfoStore } = charactersData.actions;
export default charactersData.reducer;
