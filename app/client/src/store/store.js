import { configureStore } from '@reduxjs/toolkit';
import books from './books';
import user from './user';

export const store = configureStore ({
  reducer: {
    user,
    books,
  },
  middleware: (getDefaultMiddleware) => getDefaultMiddleware (),
});
