import { createSlice } from '@reduxjs/toolkit';

//@ts-ignore
const initialState = [];

const myWishListData = createSlice({
  name: 'myWishListData',
  //@ts-ignore
  initialState,
  reducers: {
    //@ts-ignore
    myWishListDataInfo: state => state.values,
  },
});

export default myWishListData.reducer;
