import { Collection, Db } from 'mongodb';
import { Book } from './index.js';
import { getNextSequence } from './counters.js';

let c: Collection<Book>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initBooks (db: Db): void {
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
 * Get all books by owner
 * @param owner Owner key
 * @returns Db result
 */
export function getBooksByOwner (owner: number) {
  return c.find ({ owner }).toArray ();
}

/**
 * Get all books by a requester
 * @param requester requeter key
 * @returns Db result
 */
export function getRequestedBooks (requester: number) {
  return c.find ({ requesters: requester }).toArray ();
}

/**
 * Get a single book
 * @param key Book key
 * @returns Db result
 */
export function getBook (key: number) {
  return c.findOne ({ key });
}

/**
 * Create a new book
 * @param owner Owner key
 * @param category Category
 * @param title Title
 * @param author Author
 * @param cover URL of cover image
 * @returns Db result
 */
export async function createBook (owner: number, category: string, title: string, author: string, cover: string) {
  const key = await getNextSequence ('books');
  if (key) {
    const t = await c.insertOne ({ key, owner, category, title, author, cover, requester: 0 });
    if (t.acknowledged) {
      const t1 = await c.findOne ({ key });
      return (t1);
    }
  }
  return null;
}

/**
 * Update a book
 * @param key Book key
 * @param category Category
 * @param title Title
 * @param author Author
 * @param cover URL of cover image
 * @returns Db result
 */
export function updateBook (key: number, category: string, title: string, author: string, cover: string) {
  return c.updateOne (
    { key },
    { $set: { category, title, author, cover } },
  );
}

/**
 * Delete a book
 * @param key Book key
 * @returns Db result
 */
export function deleteBook (key: number) {
  return c.deleteOne ({ key });
}

/**
 * Set requester for book
 * @param key Book key
 * @param requester Requester key
 * @returns Db result
 */
export function setRequester (key: number, requester: number) {
  return c.updateOne (
    { key },
    { $set: { requester } }
  );
}

/**
 * Execute trade of a book to a requester
 * @param key Book key
 */
export async function trade (key: number): Promise<void> {
  const book = await c.findOne ({ key });
  if (book) {
    await c.updateOne (
      { key },
      { $set: {
        owner: book.requester,
        requester: 0,
      } }
    );
  }
}
