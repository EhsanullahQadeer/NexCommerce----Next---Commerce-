import { RootState } from "@/store";
import { createSlice } from "@reduxjs/toolkit";

const initialState: any = {
  initialTransaction: undefined,
  signUpDetail: undefined,
  user: undefined,
  isAuthenticated: false,
};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    userInitialTransaction: (state, action) => {
      state.initialTransaction = action.payload;
    },
    userLoggedIn: (state, action) => {
      state.isAuthenticated = action.payload.isAuthenticated;
      state.user = action.payload.user;
    },
    userUpdate: (state, action) =>{
      state.user = action.payload.user;
    },
  },
});

export const { userLoggedIn, userUpdate, userInitialTransaction } = authSlice.actions;

export default authSlice.reducer;
