'use strict';
const mongoClient = require ('mongodb').MongoClient;
const server = require ('../../dist/server');
const db = require ('../../dist/db');

const port = 3999;
const url = `http://localhost:${port}/`;
exports.url = url;

const dbURI = 'mongodb://localhost:27017/booksterTest';

before (function (done) {
  Promise.resolve ().then (() => {
    return resetDatabase ();
  }).then (() => {
    return db.init (dbURI);
  }).then (() => {
    return db.insertLocalUser ('amy', 'test');
  }).then (() => {
    return db.insertLocalUser ('bob', 'test');
  }).then (() => {
    let data = [
      { ownerId: 'l-amy', owner: 'amy', category: 'Aa', title: 'Aaa', author: 'A1', cover: 'http://example.com/image1.png', requesterId: '', requester: '' },
      { ownerId: 'l-amy', owner: 'amy', category: 'Bb', title: 'Bbb', author: 'A2', cover: 'http://example.com/image2.png', requesterId: '', requester: '' },
      { ownerId: 'l-amy', owner: 'amy', category: 'Cc', title: 'Ccc', author: 'A3', cover: 'http://example.com/image3.png', requesterId: '', requester: '' },
      { ownerId: 'l-amy', owner: 'amy', category: 'Dd', title: 'Ddd', author: 'A4', cover: 'http://example.com/image4.png', requesterId: '', requester: '' },
      { ownerId: 'l-bob', owner: 'bob', category: 'Ee', title: 'Eee', author: 'A5', cover: 'http://example.com/image5.png', requesterId: '', requester: '' },
      { ownerId: 'l-bob', owner: 'bob', category: 'Ff', title: 'Fff', author: 'A6', cover: 'http://example.com/image6.png', requesterId: '', requester: '' }
    ];
    return db.insertBook (data);
  }).then (() => {
    return db.close ();
  }).then (() => {
    return server.start (port, dbURI);
  }).then (() => {
    done ();
  }).catch (err => {
    done (err);
  });
});

function resetDatabase () {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return mongoClient.connect (dbURI);
    }).then (instance => {
      let db = instance;
      let users = db.collection ('users');
      users.ensureIndex ({id: 1}, {unique: true})
      .then (() => {
        return users.remove ({});
      }).then (() => {
        let books = db.collection ('books');
        books.ensureIndex ({ownerId: 1}, {unique: false})
        .then (() => {
          return books.remove ({});
        }).then (() => {
          resolve ();
        });
      });
    }).catch (err => {
      reject (err);
    });
  });
}

describe ('test-main', function () {
  describe ('test-cmd', function () {
    require ('./test-cmd');
  });
  describe ('test-page', function () {
    require ('./test-page');
  });
  describe ('test-user', function () {
    require ('./test-user');
  });
  describe ('test-app', function () {
    require ('./test-app');
  });
});
