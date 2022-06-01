import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import books from './books';
import { userSlice } from './userSlice';

export const store = configureStore ({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
    books,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ().concat (api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
