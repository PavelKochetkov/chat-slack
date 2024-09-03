import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';
import prepareHeaders from '../utils/apiHelpers';
import { generateAuthApiRoute } from '../utils/routes';

const authApi = createApi({
  reducerPath: 'authApi',
  baseQuery: fetchBaseQuery({
    baseUrl: '',
    prepareHeaders: (headers) => prepareHeaders(headers),
  }),
  endpoints: (builder) => ({
    createNewUser: builder.mutation({
      query: ({ username, password }) => ({
        url: generateAuthApiRoute('SIGNUP'),
        method: 'POST',
        body: { username, password },
      }),
    }),
    login: builder.mutation({
      query: ({ username, password }) => ({
        url: generateAuthApiRoute('LOGIN'),
        method: 'POST',
        body: { username, password },
      }),
    }),
  }),
});

export default authApi;
export const { useCreateNewUserMutation, useLoginMutation } = authApi;
