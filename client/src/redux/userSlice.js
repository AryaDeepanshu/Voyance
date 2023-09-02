import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    currentUser: null,
    isFetching: false,
    error: false,
  },
  reducers: {
    loginStart: (state) => {
      state.isFetching = true;
    },
    loginSuccess: (state, action) => {
      state.isFetching = false;
      state.currentUser = action.payload;
      // window.location.reload(); // to re-render the homepage.
    },
    loginFailure: (state) => {
      state.isFetching = false;
      state.error = true;
    },
    logout: (state) => {
      state.currentUser = null;
      state.isFetching = false;
      state.error = false;
      // window.location.reload(); // to re-render the homepage.
    },
    updateToken: (state, action) => {
      state.currentUser.accessToken = action.payload.newAccessToken;
      state.currentUser.refreshToken = action.payload.newRefreshToken;
    },
    updateUser: (state, action) => {
      state.currentUser = action.payload;
    },
  },
});

export const {
  loginStart,
  loginSuccess,
  loginFailure,
  logout,
  updateToken,
  updateUser,
} = userSlice.actions;
export default userSlice.reducer;
