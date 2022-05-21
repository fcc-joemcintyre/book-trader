import { expect } from 'earljs';
import { Db, ObjectId } from 'mongodb';
import * as db from '../src/db/index.js';

const dataBooks = [
  { ownerId: 'l-amy', owner: 'amy', category: 'C1', title: 'T1', author: 'A1', cover: 'http://example.com/image1.png', requesterId: '', requester: '' },
  { ownerId: 'l-amy', owner: 'amy', category: 'C1', title: 'T2', author: 'A2', cover: 'http://example.com/image2.png', requesterId: '', requester: '' },
  { ownerId: 'l-amy', owner: 'amy', category: 'C2', title: 'T3', author: 'A3', cover: 'http://example.com/image3.png', requesterId: '', requester: '' },
  { ownerId: 'l-amy', owner: 'amy', category: 'C2', title: 'T4', author: 'A4', cover: 'http://example.com/image4.png', requesterId: '', requester: '' },
  { ownerId: 'l-bob', owner: 'bob', category: 'C3', title: 'T5', author: 'A5', cover: 'http://example.com/image5.png', requesterId: '', requester: '' },
  { ownerId: 'l-bob', owner: 'bob', category: 'C3', title: 'T6', author: 'A6', cover: 'http://example.com/image6.png', requesterId: '', requester: '' },
];

describe ('books', () => {
  let id1: ObjectId;

  beforeEach (async () => {
    const t = await db.init ('mongodb://localhost:27018/booktradertest') as Db;
    const books = t.collection ('books');
    await books.deleteMany ({});
    await books.insertMany (dataBooks);
    const a = await books.findOne ({ title: 'T1' });
    if (a) {
      id1 = a._id;
    }
    await db.close ();

    await db.init ('mongodb://localhost:27018/booktradertest');
  });

  afterEach (async () => {
    await db.close ();
  });

  describe ('query existing books', () => {
    it ('all should be found', async () => {
      const data = await db.getBooks ();
      expect (data).toBeAnArrayOfLength (6);
    });
  });

  describe ('query existing books of a user', () => {
    it ('all should be found', async () => {
      const data = await db.getBooksByOwnerId ('l-amy');
      expect (data).toBeAnArrayOfLength (4);
    });
  });

  describe ('query books of non-existing id', () => {
    it ('should not be found', async () => {
      const data = await db.getBooksByOwnerId ('not-a-valid-id');
      expect (data).toBeAnArrayOfLength (0);
    });
  });

  describe ('add new book', () => {
    it ('should have inserted count 1', async () => {
      const result = await db.insertBook ({
        creator: 'l-newuser',
        username: 'newuser',
        category: '',
        title: '',
        author: '',
        cover: '',
        requesters: [],
      });
      expect (result.acknowledged).toEqual (true);
    });
  });

  describe ('add requester', () => {
    it ('should show id added as requester', async () => {
      await db.setRequester (id1, 'l-amy', 'amy');
      const data = await db.getRequester (id1);
      expect (data.requesterId).toEqual ('l-amy');
      expect (data.requester).toEqual ('amy');
    });
  });

  describe ('add duplicate requester', () => {
    it ('should show requester', async () => {
      await db.setRequester (id1, 'l-amy', 'amy');
      await db.setRequester (id1, 'l-amy', 'amy');
      const data = await db.getRequester (id1);
      expect (data.requesterId).toEqual ('l-amy');
      expect (data.requester).toEqual ('amy');
    });
  });

  describe ('add and remove requester', () => {
    it ('should show no requester', async () => {
      await db.setRequester (id1, 'l-amy', 'amy');
      await db.setRequester (id1, '', '');
      const data = await db.getRequester (id1);
      expect (data.requesterId).toEqual ('');
      expect (data.requester).toEqual ('');
    });
  });

  describe ('try to get requesters for invalid _id', () => {
    it ('should return 0 requesters', async () => {
      const data = await db.getRequester ('000000000000000000000000');
      expect (data.requesterId).toEqual ('');
      expect (data.requester).toEqual ('');
    });
  });
});
