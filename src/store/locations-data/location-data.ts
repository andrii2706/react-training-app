import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { InitialLocationsStateInterface } from '../../shared/models/store.interface';
import { LocationInterface } from '../../shared/models/location.interface';
import { PaginationInfoInterface } from '../../shared/models/array.interface';

const initialState:InitialLocationsStateInterface = {
  locations: [],
  paginationInfo: null
};

const locationsData = createSlice({
  name: 'locationsData',
  initialState,
  reducers: {
    setLocationsStore(state, action: PayloadAction<LocationInterface[]>) {
      state.locations = action.payload;
    },
     setPaginationInfoStore(state, action: PayloadAction<PaginationInfoInterface>) {
      state.paginationInfo = action.payload;
    },
  },
});

export const { setLocationsStore, setPaginationInfoStore } = locationsData.actions;
export default locationsData.reducer;
