import { createAsyncThunk } from '@reduxjs/toolkit';
import axios from 'axios';

const fetchChatData = createAsyncThunk(
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

export default fetchChatData;
