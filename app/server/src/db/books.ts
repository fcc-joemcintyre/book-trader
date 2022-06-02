import { Collection, Db } from 'mongodb';
import { Book, BookArrayResult, BookResult } from './index.js';
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
export async function getBooks (): Promise<BookArrayResult> {
  const t = await c.find ().toArray ();
  return ({ status: 200, books: t });
}

/**
 * Get all books by owner
 * @param owner Owner key
 * @returns Db result
 */
export async function getBooksByOwner (owner: number): Promise<BookArrayResult> {
  const t = await c.find ({ owner }).toArray ();
  return ({ status: 200, books: t });
}

/**
 * Get all books by a requester
 * @param requester requeter key
 * @returns Db result
 */
export async function getRequestedBooks (requester: number): Promise<BookArrayResult> {
  const t = await c.find ({ requester }).toArray ();
  return ({ status: 200, books: t });
}

/**
 * Get a single book
 * @param key Book key
 * @returns Db result
 */
export async function getBook (key: number): Promise<BookResult> {
  const t = await c.findOne ({ key });
  return ({ status: t ? 200 : 404, book: t || undefined });
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
export async function createBook (
  owner: number, category: string, title: string, author: string, cover: string
): Promise<BookResult> {
  const key = await getNextSequence ('books');
  if (key) {
    const t = await c.insertOne ({ key, owner, category, title, author, cover, requester: 0 });
    if (t.acknowledged) {
      const t1 = await c.findOne ({ key });
      return ({ status: t1 ? 200 : 404, book: t1 || undefined });
    } else {
      return { status: 400 };
    }
  }
  return { status: 400 };
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
export async function updateBook (
  key: number, category: string, title: string, author: string, cover: string
): Promise<BookResult> {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { category, title, author, cover } },
    { returnDocument: 'after' },
  );
  if (t.ok) {
    return ({ status: 200, book: t.value || undefined });
  } else {
    return ({ status: 400 });
  }
}

/**
 * Delete a book
 * @param key Book key
 * @returns Db result
 */
export async function deleteBook (key: number): Promise<BookResult> {
  const t = await c.deleteOne ({ key });
  return ({ status: t.acknowledged ? 200 : 404 });
}

/**
 * Set requester for book
 * @param key Book key
 * @param requester Requester key
 * @returns Db result
 */
export async function setRequester (key: number, requester: number): Promise<BookResult> {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { requester } },
    { returnDocument: 'after' },
  );
  return ({ status: t.ok ? 200 : 404, book: t.value || undefined });
}

/**
 * Execute trade of a book to a requester
 * @param key Book key
 */
export async function trade (key: number): Promise<BookResult> {
  const book = await c.findOne ({ key });
  if (book) {
    const t = await c.findOneAndUpdate (
      { key },
      { $set: { owner: book.requester, requester: 0 } },
      { returnDocument: 'after' },
    );
    return ({ status: t.ok ? 200 : 400, book: t.value || undefined });
  } else {
    return { status: 404 };
  }
}
