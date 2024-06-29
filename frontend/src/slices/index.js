import { configureStore } from '@reduxjs/toolkit';
import chatSlice from './chatSlice.js';

export default configureStore({
  reducer: {
    chatSlice,
  },
});
