import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import { createSelector } from '@reduxjs/toolkit';
import prepareHeaders from '../utils/apiHelpers';
// eslint-disable-next-line import/no-cycle
import { selectCurrentChannelId } from '../store/slice/appSlice';
import { generateAuthApiRoute } from '../utils/routes';

const messagesApi = createApi({
  reducerPath: 'messagesApi',
  baseQuery: fetchBaseQuery({
    baseUrl: generateAuthApiRoute('MESSAGES'),
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  tagTypes: ['Channels', 'Messages'],
  endpoints: (builder) => ({
    getMessages: builder.query({
      query: () => '',
      providesTags: ['Messages'],
    }),
    addMessage: builder.mutation({
      query: (message) => ({
        method: 'POST',
        body: message,
      }),
      invalidatesTags: ['Messages'],
    }),
  }),
});

const selectMessages = messagesApi.endpoints.getMessages.select();

const selectMessagesData = createSelector(
  selectMessages,
  (messagesState) => messagesState.data ?? [],
);

export const selectCurrentMessages = createSelector(
  [selectMessagesData, selectCurrentChannelId],
  (messages, currentChannelId) => (
    messages.filter(({ channelId }) => channelId === currentChannelId) || null
  ),
);

export default messagesApi;

export const {
  useGetMessagesQuery,
  useAddMessageMutation,
} = messagesApi;
