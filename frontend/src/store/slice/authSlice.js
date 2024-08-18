import { createSlice } from '@reduxjs/toolkit';
import authApi from '../../api/authApi';

const initialState = {
  username: localStorage.getItem('username') ? localStorage.getItem('username') : null,
  token: localStorage.getItem('token') ? localStorage.getItem('token') : null,
  isAuth: !!localStorage.getItem('token'),
  hasError: null,
};

const authSlice = createSlice({
  name: 'auth',
  initialState,
  reducers: {
    logOut: (state) => {
      Object.assign(state, {
        username: null,
        token: null,
        isAuth: false,
        hasError: null,
      });
      localStorage.removeItem('username');
      localStorage.removeItem('token');
    },
  },
  extraReducers: (builder) => {
    builder.addMatcher(authApi.endpoints.login.matchPending, (state) => {
      Object.assign(state, {
        ...initialState,
        hasError: null,
      });
    });
    builder.addMatcher(authApi.endpoints.login.matchFulfilled, (state, { payload }) => {
      const { username, token } = payload;
      Object.assign(state, {
        ...initialState,
        token,
        username,
        isAuth: true,
      });
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    });
    builder.addMatcher(authApi.endpoints.login.matchRejected, (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        hasError: payload,
      });
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchPending, (state) => {
      Object.assign(state, {
        ...initialState,
        hasError: null,
      });
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchFulfilled, (state, { payload }) => {
      const { username, token } = payload;
      Object.assign(state, {
        ...initialState,
        token,
        username,
        isAuth: true,
      });
      localStorage.setItem('username', username);
      localStorage.setItem('token', token);
    });
    builder.addMatcher(authApi.endpoints.createNewUser.matchRejected, (state, { payload }) => {
      Object.assign(state, {
        ...initialState,
        hasError: payload,
      });
    });
  },
});

export const { logOut } = authSlice.actions;
export const selectUsername = (state) => state.auth.username;
export const selectIsAuth = (state) => state.auth.isAuth;
export const selectAuthError = (state) => state.auth.hasError;
export default authSlice.reducer;
