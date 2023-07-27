import { createSlice } from "@reduxjs/toolkit";

export const appSlice = createSlice({
  name: "app",
  initialState: {
    isLoggedIn: false,
  },
  reducers: {
    setIsLoggedIn: (state) => {
      state.isLoggedIn = true;
    },
    onLogout: (state) => {
      state.isLoggedIn = false;
    },
  },
});

export const { setIsLoggedIn, onLogout } = appSlice.actions;

export const isLoggedInSelector = (state) => state.app.isLoggedIn;

export default appSlice.reducer;
