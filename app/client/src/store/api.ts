import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

export type User = {
  authenticated: boolean,
  key: number,
  username: string,
  email: string,
};

export type Book = {
  key: number,
  owner: number,
  category: string,
  title: string,
  author: string,
  cover: string,
  requester: number,
};

export const api = createApi ({
  baseQuery: fetchBaseQuery ({ baseUrl: '/api' }),
  tagTypes: ['User', 'Book'],
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

    getBooks: build.query<Book[], void> ({
      query: () => ({
        url: 'books',
        method: 'GET',
      }),
      providesTags: (result = []) => [
        'Book',
        ...result.map (({ key }) => ({ type: 'Book' as const, key })),
      ],
    }),
    createBook: build.mutation<Book, { category: string, title: string, author: string, cover: string }> ({
      query: ({ category, title, author, cover }) => ({
        url: 'books',
        method: 'POST',
        body: { title, category, author, cover },
      }),
      invalidatesTags: (result) => [{ type: 'Book', key: result?.key }],
    }),
    updateBook: build.mutation<void, { key: number, category: string, title: string, author: string, cover: string }> ({
      query: ({ key, category, title, author, cover }) => ({
        url: `books/${key}`,
        method: 'POST',
        body: { category, title, author, cover },
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', key: arg.key }],
    }),
    deleteBook: build.mutation<void, { key: number }> ({
      query: ({ key }) => ({
        url: `books/${key}`,
        method: 'DELETE',
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', key: arg.key }],
    }),

    createTradeRequest: build.mutation<Book, { key: number }> ({
      query: ({ key }) => ({
        url: `books/${key}/request`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', key: arg.key }],
    }),
    deleteTradeRequest: build.mutation<Book, { key: number }> ({
      query: ({ key }) => ({
        url: `books/${key}/request`,
        method: 'DELETE',
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', key: arg.key }],
    }),
    executeTrade: build.mutation<Book, { key: number }> ({
      query: ({ key }) => ({
        url: `books/${key}/trade`,
        method: 'POST',
        body: {},
      }),
      invalidatesTags: (result, error, arg) => [{ type: 'Book', key: arg.key }],
    }),
  }),
});

export const {
  useLoginMutation, useLogoutMutation, useRegisterMutation, useVerifyLoginMutation,
  useGetBooksQuery, useCreateBookMutation, useDeleteBookMutation, useUpdateBookMutation,
  useCreateTradeRequestMutation, useDeleteTradeRequestMutation, useExecuteTradeMutation,
} = api;
