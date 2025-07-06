import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { User } from 'firebase/auth';
import { AuthState } from '../../shared/models/auth.interface';


const initialState: AuthState = {
   user: null
};

const userData = createSlice({
  name: 'userData',
  initialState,
  reducers: {
    setUser(state, action: PayloadAction<User>){
      state.user = action.payload
    },
    clearUser(state){
      state.user = null
    }
  },
});
export const { setUser, clearUser } = userData.actions;


export default userData.reducer;
