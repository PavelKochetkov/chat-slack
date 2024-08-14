import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';

const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '/api/v1',
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: ({ username, password }) => ({
        url: 'signup',
        method: 'POST',
        body: { username, password },
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export default userApi;
export const { useCreateNewUserMutation, useLoginMutation } = userApi;
