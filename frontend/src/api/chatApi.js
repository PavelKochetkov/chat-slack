import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

import _ from 'lodash';

const getNextId = () => _.uniqueId();

const chatApi = createApi({
  reducerPath: 'chatApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => {
      const token = localStorage.getItem('token');
      if (token) {
        headers.set('Authorization', `Bearer ${token}`);
      }
      return headers;
    },
  }),
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    getMessages: builder.query({
      query: () => 'messages',
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        url: '/messages',
        method: 'POST',
        body: {
          ...message,
          channelId: getNextId(),
          username: localStorage.getItem('username'),
        },
      }),
    }),
  }),
});
export default chatApi;
export const { useGetChannelsQuery, useGetMessagesQuery, useAddMessageMutation } = chatApi;
