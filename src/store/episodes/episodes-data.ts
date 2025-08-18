import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { PaginationInfoInterface } from '../../shared/models/array.interface';
import { EpisodesInterface } from '../../shared/models/episodes.interface';
import { InitiaEpisodesStateInterface } from '../../shared/models/store.interface';

const initialState:InitiaEpisodesStateInterface = {
  episodes: [],
  paginationInfo: null
};

const episodesData = createSlice({
  name: 'episodesData',
  initialState,
  reducers: {
      setEpisodesStore(state, action: PayloadAction<EpisodesInterface[]>) {
      state.episodes = action.payload;
    },
     setPaginationInfoStore(state, action: PayloadAction<PaginationInfoInterface>) {
      state.paginationInfo = action.payload;
    },
  },
});

export const { setEpisodesStore, setPaginationInfoStore } = episodesData.actions;
export default episodesData.reducer;
