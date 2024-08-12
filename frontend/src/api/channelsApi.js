import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';

const channelsApi = createApi({
  reducerPath: 'channelsApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getChannels: builder.query({
      query: () => 'channels',
    }),
    addChannel: builder.mutation({
      query: (channel) => ({
        url: 'channels',
        method: 'POST',
        body: { ...channel },
      }),
    }),
    editChannel: builder.mutation({
      query: ({ name, id }) => ({
        method: 'PATCH',
        url: `channels/${id}`,
        body: { name },
      }),
    }),
    removeChannel: builder.mutation({
      query: (id) => ({
        method: 'DELETE',
        url: `channels/${id}`,
      }),
      invalidatesTags: ['Channels', 'Messages'],
    }),
  }),
});

export default channelsApi;
export const {
  useGetChannelsQuery,
  useAddChannelMutation,
  useEditChannelMutation,
  useRemoveChannelMutation,
} = channelsApi;
