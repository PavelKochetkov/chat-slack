import { createSlice } from '@reduxjs/toolkit';

const initialState = {
  username: null,
  token: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    setUser: (state, { payload }) => {
      const { username, token } = payload;
      Object.assign(state, {
        username: payload.username,
        token: payload.token,
      });
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    },
    logOut: (state) => {
      Object.assign(state, {
        username: localStorage.removeItem('username'),
        token: localStorage.removeItem('token'),
      });
    },
    initUser: (state) => {
      const username = localStorage.getItem('username');
      const token = localStorage.getItem('token');
      if (username && token) {
        Object.assign(state, {
          username,
          token,
        });
      }
    },
  },
});

export const { setUser, logOut, initUser } = authSlice.actions;
export const selectUsername = (state) => state.auth.username;
export default authSlice.reducer;
