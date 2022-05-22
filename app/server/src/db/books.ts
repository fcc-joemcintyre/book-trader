import { Collection, Db, ObjectId } from 'mongodb';
import { Book } from './index.js';

let c: Collection<Book>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initBooks (db: Db) {
  c = db.collection ('books');
}

/**
 * Get all books
 * @returns Db result
 */
export function getBooks () {
  return c.find ().toArray ();
}

/**
 * Get all books by owner id
 * @param ownerId Owner user name
 * @returns Db result
 */
export function getBooksByOwnerId (ownerId: string) {
  return c.find ({ ownerId }).toArray ();
}

/**
 * Get all books by a requester
 * @param requesterId requeter user name
 * @returns Db result
 */
export function getRequestedBooks (requesterId: string) {
  return c.find ({ requesterId }).toArray ();
}

/**
 * Get a single book
 * @param _id Book key
 * @returns Db result
 */
export function getBook (_id: string) {
  return c.findOne ({ _id: new ObjectId (_id) });
}

/**
 * Insert a book
 * @param newBook Book fields
 * @returns Db result
 */
export function insertBook (newBook: Book) {
  return c.insertOne (newBook);
}


/**
 * Update a book
 * @param _id Book key
 * @param category Category
 * @param title Title
 * @param author Author
 * @param cover URL of cover image
 * @returns Db result
 */
export function updateBook (_id: string, category: string, title: string, author: string, cover: string) {
  return c.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { category, title, author, cover } },
  );
}

/**
 * Delete a book
 * @param _id Book key
 * @returns Db result
 */
export function removeBook (_id: string) {
  return c.deleteOne ({ _id: new ObjectId (_id) });
}

/**
 * Set requester for book
 * @param _id Book key
 * @param id Requester user name
 * @param requester Requester name
 * @returns Db result
 */
export function setRequester (_id: string, id: string, requester: string) {
  return c.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { requesterId: id, requester } }
  );
}

/**
 * Get trade requester
 * @param _id Book key
 * @returns Requester info
 */
export async function getRequester (_id: string): Promise <{ requesterId: string, requester: string}> {
  const book = await c.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    return ({ requesterId: book.requesterId, requester: book.requester });
  } else {
    return ({ requesterId: '', requester: '' });
  }
}

/**
 * Execute trade of a book to the requester
 * @param _id Book key
 */
export async function trade (_id: string): Promise<void> {
  const book = await c.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    await c.updateOne (
      { _id: new ObjectId (_id) },
      { $set: {
        ownerId: book.requesterId,
        owner: book.requester,
        requesterId: '',
        requester: '',
      } }
    );
  }
}
