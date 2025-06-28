import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore
const initialState = []

const charactersData = createSlice({
    name: 'charactersData', 
    //@ts-ignore
    initialState,
    reducers:{
        //@ts-ignore
        charactersDataInfo: (state) => state.values
    }
})

export default charactersData.reducer;