import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore
const initialState = []

const episodesData = createSlice({
    name: 'episodesData', 
    //@ts-ignore
    initialState,
    reducers:{
        //@ts-ignore
        episodesDataInfo: (state) => state.values
    }
})

export default episodesData.reducer;