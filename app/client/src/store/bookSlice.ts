/* eslint-disable no-param-reassign */
import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Book } from './api';

const initialState: Book[] = [];

export const bookSlice = createSlice ({
  name: 'book',
  initialState,
  reducers: {
    setBooks: (
      state,
      { payload: books }: PayloadAction<Book[]>
    ) => {
      state = books;
    },
  },
});

export const { setBooks } = bookSlice.actions;
