import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  authenticated: boolean,
  key: number,
  username: string,
  email: string,
};

export const api = createApi ({
  baseQuery: fetchBaseQuery ({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (build) => ({
    register: build.mutation<void, { email: string, username: string, password: string }> ({
      query: ({ email, username, password }) => ({
        url: 'register',
        method: 'POST',
        body: { email, username, password },
      }),
      invalidatesTags: ['User'],
    }),
    login: build.mutation<User, { username: string, password: string }> ({
      query: ({ username, password }) => ({
        url: 'login',
        method: 'POST',
        body: { username, password },
      }),
      invalidatesTags: ['User'],
    }),
    logout: build.mutation<void, void> ({
      query: () => ({
        url: 'logout',
        method: 'POST',
        body: {},
      }),
      invalidatesTags: ['User'],
    }),
    verifyLogin: build.mutation<User, void> ({
      query: () => ({
        url: 'verifylogin',
        method: 'GET',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

export const {
  useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyLoginMutation,
} = api;
