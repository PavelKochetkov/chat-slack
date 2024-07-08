import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

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
    addChannel: builder.mutation({
      query: (channel) => ({
        method: 'POST',
        body: channel,
      }),
    }),
    editChannel: builder.mutation({
      query: (channel) => ({
        method: 'PATCH',
        url: channel.id,
        body: channel,
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: id,
      }),
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
          username: localStorage.getItem('username'),
        },
      }),
    }),
  }),
});
export default chatApi;
export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
  useGetMessagesQuery,
  useAddMessageMutation,
} = chatApi;
