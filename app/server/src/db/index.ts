import { ObjectId } from 'mongodb';
import { initDatabase, closeDatabase } from './db.js';
import { getBook, getBooks, getBooksByOwnerId, getRequestedBooks, getRequester,
  insertBook, removeBook, setRequester, updateBook } from './books.js';
import { findUserByUsername, insertUser, removeUser, updateUser } from './users.js';

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
  username: string,
  name: string,
  city: string,
  state: string,
  hash: string,
  salt: string,
  theme: string,
};

export {
  initDatabase, closeDatabase,
  getBook, getBooks, getBooksByOwnerId, getRequestedBooks, getRequester,
  insertBook, removeBook, setRequester, updateBook,
  findUserByUsername, insertUser, removeUser, updateUser,
};
