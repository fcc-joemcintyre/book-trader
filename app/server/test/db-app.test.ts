import { expect } from 'earljs';
import { Db } from 'mongodb';
import * as db from '../src/db/index.js';

const dataBooks = [
  { key: 1, owner: 1, category: 'C1', title: 'T1', author: 'A1', cover: 'http://example.com/image1.png', requester: 0 },
  { key: 2, owner: 1, category: 'C1', title: 'T2', author: 'A2', cover: 'http://example.com/image2.png', requester: 0 },
  { key: 3, owner: 1, category: 'C2', title: 'T3', author: 'A3', cover: 'http://example.com/image3.png', requester: 0 },
  { key: 4, owner: 1, category: 'C2', title: 'T4', author: 'A4', cover: 'http://example.com/image4.png', requester: 0 },
  { key: 5, owner: 2, category: 'C3', title: 'T5', author: 'A5', cover: 'http://example.com/image5.png', requester: 0 },
  { key: 6, owner: 2, category: 'C3', title: 'T6', author: 'A6', cover: 'http://example.com/image6.png', requester: 0 },
];

describe ('books', () => {
  beforeEach (async () => {
    const t = await db.initDatabase ('mongodb://localhost:27018/booktradertest') as Db;
    const books = t.collection ('books');
    await books.deleteMany ({});
    await books.insertMany (dataBooks);
    await db.closeDatabase ();

    await db.initDatabase ('mongodb://localhost:27018/booktradertest');
  });

  afterEach (async () => {
    await db.closeDatabase ();
  });

  describe ('query existing books', () => {
    it ('all should be found', async () => {
      const t = await db.getBooks ();
      expect (t.status).toEqual (200);
      expect (t.books).toBeAnArrayOfLength (6);
    });
  });

  describe ('query existing books of a user', () => {
    it ('all should be found', async () => {
      const t = await db.getBooksByOwner (1);
      expect (t.status).toEqual (200);
      expect (t.books).toBeAnArrayOfLength (4);
    });
  });

  describe ('query books of non-existing id', () => {
    it ('should not be found', async () => {
      const t = await db.getBooksByOwner (0);
      expect (t.status).toEqual (200);
      expect (t.books).toBeAnArrayOfLength (0);
    });
  });

  describe ('add new book', () => {
    it ('should be created', async () => {
      const t = await db.createBook (1, 'C', 'T', 'A', '');
      expect (t.status).toEqual (200);
      expect (t.book).not.toBeNullish ();
    });
  });

  describe ('add requester', () => {
    it ('should show id added as requester', async () => {
      const t = await db.setRequester (1, 1);
      expect (t.status).toEqual (200);
      expect (t.book).not.toBeNullish ();
      if (t.book) {
        expect (t.book.requester).toEqual (1);
      }
    });
  });

  describe ('add duplicate requester', () => {
    it ('should show requester', async () => {
      const t1 = await db.setRequester (1, 1);
      expect (t1.status).toEqual (200);
      const t2 = await db.setRequester (1, 1);
      expect (t2.status).toEqual (200);
      const t = await db.getBook (1);
      expect (t.status).toEqual (200);
      expect (t.book).not.toBeNullish ();
      if (t.book) {
        expect (t.book.requester).toEqual (1);
      }
    });
  });

  describe ('add and remove requester', () => {
    it ('should show no requester', async () => {
      const t1 = await db.setRequester (1, 1);
      expect (t1.status).toEqual (200);
      const t2 = await db.setRequester (1, 0);
      expect (t2.status).toEqual (200);
      const t = await db.getBook (1);
      expect (t.status).toEqual (200);
      expect (t.book).not.toBeNullish ();
      if (t.book) {
        expect (t.book.requester).toEqual (0);
      }
    });
  });
});
