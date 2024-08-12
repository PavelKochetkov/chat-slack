import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => 'messages',
      providesTags: ['Messages'],
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
export default messagesApi;
export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
