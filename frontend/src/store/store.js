import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice.js';
import channelsApi from '../api/channelsApi.js';
import messagesApi from '../api/messagesApi.js';
import userApi from '../api/userApi.js';

const store = configureStore({
  reducer: {
    app: appReducer,
    [channelsApi.reducerPath]: channelsApi.reducer,
    [messagesApi.reducerPath]: messagesApi.reducer,
    [userApi.reducerPath]: userApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(
    channelsApi.middleware,
    messagesApi.middleware,
    userApi.middleware,
  ),
});

export default store;
