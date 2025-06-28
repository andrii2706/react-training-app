import { createSlice } from "@reduxjs/toolkit";

//@ts-ignore
const initialState = []

const userData = createSlice({
    name: 'userData', 
    //@ts-ignore
    initialState,
    reducers:{
        //@ts-ignore
        userDataInfo: (state) => state.values
    }
})

export default userData.reducer;