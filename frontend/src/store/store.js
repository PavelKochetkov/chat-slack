import { configureStore } from '@reduxjs/toolkit';
import appReducer from './slice/appSlice.js';
import chatApi from '../api/chatApi.js';

const store = configureStore({
  reducer: {
    app: appReducer,
    [chatApi.reducerPath]: chatApi.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware().concat(chatApi.middleware),
});

export default store;
