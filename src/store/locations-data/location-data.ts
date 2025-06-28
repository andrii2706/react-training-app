import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore
const initialState = []

const locationsData = createSlice({
    name: 'locationsData', 
    //@ts-ignore
    initialState,
    reducers:{
        //@ts-ignore
        locationsDataInfo: (state) => state.values
    }
})

export default locationsData.reducer;