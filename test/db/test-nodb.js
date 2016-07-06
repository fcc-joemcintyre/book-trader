'use strict';
const db = require ('../../dist/db');

// mongo URI with port number not an active MongoDB instance
let badMongoUri = 'mongodb://localhost:22222/pinsterTest';

describe ('init/close', function () {
  describe ('init', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.init (badMongoUri);
      }).then (() => {
        done (new Error ('init did not fail with bad URI'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('close', function () {
    it ('should fail silently', function (done) {
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        done ();
      }).catch (() => {
        done (new Error ('close should fail silently'));
      });
    });
  });
});

describe ('users', function () {
  describe ('findUserByUsername', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.findUserByUsername ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertUser ('newuser', 'password');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('removeUser', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.removeUser ('amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getBooks', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getBooks ();
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getBooksByUsername', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getBooksByOwnerId ('l-amy');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getBook', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getBook ('1');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('insertBook', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.insertBook ({ownerId: 'l-amy'});
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('setRequester', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.setRequester ('1', 'l-amy', true);
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });

  describe ('getRequesters', function () {
    it ('should generate an error', function (done) {
      Promise.resolve ().then (() => {
        return db.getRequesters ('1');
      }).then (() => {
        done (new Error ('did not fail with no database connection'));
      }).catch (() => {
        done ();
      });
    });
  });
});
