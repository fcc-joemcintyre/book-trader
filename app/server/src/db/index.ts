import { initDatabase, closeDatabase } from './db.js';
import { createBook, deleteBook, getBook, getBooks, getBooksByOwner, getRequestedBooks,
  setRequester, trade, updateBook } from './books.js';
import { createUser, findUserByUsername, deleteUser } from './users.js';

export type Book = {
  key: number,
  owner: number,
  category: string,
  title: string,
  author: string,
  cover: string,
  requester: number,
};

export type BookResult = {
  status: number,
  book?: Book,
};

export type BookArrayResult = {
  status: number,
  books?: Book[],
};

export type User = {
  key: number,
  email: string,
  username: string,
  hash: string,
  salt: string,
};

export type UserResult = {
  status: number,
  user?: User,
};

export {
  initDatabase, closeDatabase,
  createBook, deleteBook, getBook, getBooks, getBooksByOwner, getRequestedBooks,
  setRequester, trade, updateBook,
  createUser, findUserByUsername, deleteUser,
};
