import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export const userApi = createApi({
  reducerPath: 'userApi',
  baseQuery: fetchBaseQuery({
    baseUrl: 'http://localhost:8080/api/v1/auth',
    credentials: 'include', // ✅ cookies পাঠানোর জন্য
  }),
  endpoints: (builder) => ({
    signUp: builder.mutation({
      query: (userData) => ({
        url: '/signup',
        method: 'POST',
        body: userData
      }),
    }),
    signIn: builder.mutation({
      query: (credentials) => ({
        url: '/mainSignIn',
        method: 'POST',
        body: credentials
      }),
    }),
    getProfile: builder.query({
      query: () => '/profile'
    }),
    logout: builder.mutation({
      query: () => ({ url: '/logout', method: 'POST' })
    }),
  }),
});

export const { useSignUpMutation, useSignInMutation, useGetProfileQuery, useLogoutMutation } = userApi;
