/* eslint-disable no-param-reassign */
import { createSlice, createEntityAdapter, createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

export const fetchChatData = createAsyncThunk(
  'fetchChatData',
  async () => {
    const token = localStorage.getItem('token');
    const response = await axios.get('/api/v1/channels', {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });
    console.log(response.data);
    return response.data;
  },
);

const chatAdapter = createEntityAdapter();

const chatSlice = createSlice({
  name: 'chat',
  initialState: {
    channels: [],
    messages: [],
  },
  reducers: {
    addChannel: (state, action) => {
      state.channels.push(action.payload);
    },
    addMessage: (state, action) => {
      state.messages.push(action.payload);
    },
  },
  extraReducers: (builder) => {
    builder
      .addCase(fetchChatData.pending, (state) => {
        state.loadingStatus = 'loading';
        state.error = null;
      })
      .addCase(fetchChatData.fulfilled, (state, action) => {
        chatAdapter.addOne(state, action.payload);
        state.loadingStatus = 'idle';
        state.error = null;
      })
      .addCase(fetchChatData.rejected, (state, action) => {
        state.loadingStatus = 'failed';
        state.error = action.error;
      });
  },
});

export const { actions } = chatSlice;
export default chatAdapter.reducer;
