'use strict';
const mongoClient = require ('mongodb').MongoClient;
const db = require ('../../dist/db');

const uri = 'mongodb://localhost:27017/booksterTest';
let testdb = {
  db: null,
  users: null,
  books: null,
  bookIds: []
};
exports.testdb = testdb;

// test db calls with no database connection for error paths
describe ('test no connection', function () {
  require ('./test-nodb');
});

// test init and close functions
describe ('test init/close', function () {
  require ('./test-general');
});

// test application functions
describe ('test-main', function () {
  before (function (done) {
    Promise.resolve ().then (() => {
      return mongoClient.connect (uri);
    }).then (dbInstance => {
      testdb.db = dbInstance;
      testdb.users = testdb.db.collection ('users');
      return testdb.users.ensureIndex ({id: 1}, {unique: true});
    }).then (() => {
      return testdb.users.remove ({});
    }).then (() => {
      testdb.books = testdb.db.collection ('books');
      return testdb.books.ensureIndex ({ownerId: 1}, {unique: false});
    }).then (() => {
      return testdb.books.remove ({});
    }).then (() => {
      let data = [
        { ownerId: 'l-amy', owner: 'amy', category: 'C1', title: 'T1', author: 'A1', cover: 'http://example.com/image1.png', requesterId: '', requester: '' },
        { ownerId: 'l-amy', owner: 'amy', category: 'C1', title: 'T2', author: 'A2', cover: 'http://example.com/image2.png', requesterId: '', requester: '' },
        { ownerId: 'l-amy', owner: 'amy', category: 'C2', title: 'T3', author: 'A3', cover: 'http://example.com/image3.png', requesterId: '', requester: '' },
        { ownerId: 'l-amy', owner: 'amy', category: 'C2', title: 'T4', author: 'A4', cover: 'http://example.com/image4.png', requesterId: '', requester: '' },
        { ownerId: 'l-bob', owner: 'bob', category: 'C3', title: 'T5', author: 'A5', cover: 'http://example.com/image5.png', requesterId: '', requester: '' },
        { ownerId: 'l-bob', owner: 'bob', category: 'C3', title: 'T6', author: 'A6', cover: 'http://example.com/image6.png', requesterId: '', requester: '' }
      ];
      return testdb.books.insert (data, {w:1});
    }).then (result => {
      testdb.bookIds = result.insertedIds;
      return db.init (uri);
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  after (function (done) {
    Promise.resolve ().then (() => {
      return db.close ();
    }).then (() => {
      return testdb.db.close ();
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
