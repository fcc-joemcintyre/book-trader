import { ObjectId } from 'mongodb';
import { initDatabase, closeDatabase } from './db.js';
import { getBook, getBooks, getBooksByOwnerId, getRequestedBooks, getRequester,
  insertBook, removeBook, setRequester, trade, updateBook } from './books.js';
import { createUser, findUserByUsername, deleteUser } from './users.js';

export type Book = {
  _id?: ObjectId,
  ownerId: string,
  category: string,
  title: string,
  author: string,
  cover: string,
  requesterId: string,
  requester: string,
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
  getBook, getBooks, getBooksByOwnerId, getRequestedBooks, getRequester,
  insertBook, removeBook, setRequester, trade, updateBook,
  createUser, findUserByUsername, deleteUser,
};
