'use strict';
const ObjectId = require ('mongodb').ObjectId;
const testdb = require ('./test-main').testdb;
const db = require ('../../dist/db');


describe ('books', function () {
  describe ('query existing books', function () {
    it ('all should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getBooks ();
      }).then (result => {
        if (result.length === 6) {
          done ();
        } else {
          done (new Error ('wrong number found', result.length));
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('query existing books of a user', function () {
    it ('4 should be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getBooksByOwnerId ('l-amy');
      }).then (result => {
        if (result.length === 4) {
          done ();
        } else {
          done (new Error (`wrong number found ${result.length}`));
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('query books of non-existing id', function () {
    it ('should not be found', function (done) {
      Promise.resolve ().then (() => {
        return db.getBooksByOwnerId ('not-a-valid-id');
      }).then (result => {
        if (result.length > 0) {
          done (new Error ('books with invalid id found'));
        } else {
          done ();
        }
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add new book', function () {
    it ('should have inserted count 1', function (done) {
      Promise.resolve ().then (() => {
        return db.insertBook ({ creator: 'l-newuser', username: 'newuser', category: '', title:'', author: '', cover: '', requesters: [] });
      }).then (result => {
        if (result.insertedCount === 1) {
          done ();
        } else {
          done (new Error (`insert failed: ${JSON.stringify (result)}`));
        }
      }).catch (err => {
        done (err);
      });
    });
  });
});

describe ('books', function () {
  beforeEach (function (done) {
    Promise.resolve ().then (() => {
      return testdb.books.update (
        { _id: new ObjectId (testdb.bookIds[0]) },
        { $set: { requesters: [] } }
      );
    }).then (() => {
      done ();
    }).catch (err => {
      done (err);
    });
  });

  describe ('add requester', function () {
    it ('should show id added as requester', function (done) {
      Promise.resolve ().then (() => {
        return db.setRequester (testdb.bookIds[0], 'l-amy', 'amy');
      }).then (() => {
        return db.getRequester (testdb.bookIds[0]);
      }).then (result => {
        if ((result.requesterId !== 'l-amy') || (result.requester !== 'amy')) {
          return done (new Error (`Invalid requester: ${result}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add duplicate requester', function () {
    it ('should show requester', function (done) {
      Promise.resolve ().then (() => {
        return db.setRequester (testdb.bookIds[0], 'l-amy', 'amy');
      }).then (() => {
        return db.setRequester (testdb.bookIds[0], 'l-amy', 'amy');
      }).then (() => {
        return db.getRequester (testdb.bookIds[0]);
      }).then (result => {
        if ((result.requesterId !== 'l-amy') || (result.requester !== 'amy')) {
          return done (new Error (`Invalid requester: ${result}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('add and remove requester', function () {
    it ('should show 0 requesters', function (done) {
      Promise.resolve ().then (() => {
        return db.setRequester (testdb.bookIds[0], 'l-amy', 'amy');
      }).then (() => {
        return db.setRequester (testdb.bookIds[0], '', '');
      }).then (() => {
        return db.getRequester (testdb.bookIds[0]);
      }).then (result => {
        if ((result.requesterId !== '') || (result.requester !== '')) {
          return done (new Error (`Invalid requester: ${result}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });

  describe ('try to get requesters for invalid _id', function () {
    it ('should return 0 requesters', function (done) {
      Promise.resolve ().then (() => {
        return db.getRequester ('000000000000000000000000');
      }).then (result => {
        if ((result.requesterId !== '') || (result.requester !== '')) {
          return done (new Error (`Invalid requester: ${result}`));
        }
        done ();
      }).catch (err => {
        done (err);
      });
    });
  });
});
