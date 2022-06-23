import { configureStore } from '@reduxjs/toolkit';
import { api } from './api';
import { bookSlice } from './bookSlice';
import { userSlice } from './userSlice';

export const store = configureStore ({
  reducer: {
    [api.reducerPath]: api.reducer,
    user: userSlice.reducer,
    books: bookSlice.reducer,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware ().concat (api.middleware),
});

export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;
