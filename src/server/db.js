'use strict';
const mongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let db = null;
let users = null;
let books = null;

// connect to database and set up collections
function init (uri) {
  console.log ('db.init');
  return new Promise ((resolve, reject) => {
    if (db === null) {
      mongoClient.connect (uri, (err, instance) => {
        if (err) {
          console.log ('init err:', err);
          return reject (err);
        }
        db = instance;
        Promise.resolve ().then (() => {
          users = db.collection ('users');
          return users.ensureIndex ({id: 1}, {unique: true});
        }).then (() => {
          books = db.collection ('books');
          return books.ensureIndex ({ownerId: 1}, {unique: false});
        }).then (() => {
          return books.ensureIndex ({requesterId: 1}, {unique: false});
        }).then (() => {
          resolve ();
        }).catch (err => {
          reject (err);
        });
      });
    } else {
      resolve ();
    }
  });
}

// Close database and null out references
function close () {
  return new Promise ((resolve, reject) => {
    if (db) {
      users = null;
      books = null;
      Promise.resolve ().then (() => {
        return db.close ();
      }).then (() => {
        db = null;
        resolve ();
      }).catch (() => {
        db = null;
        resolve ();
      });
    } else {
      resolve ();
    }
  });
}

// Find single user by id
function findUser (id) {
  return users.findOne ({id: id});
}

// Insert single user with base data. Additional information through profile.
function insertLocalUser (username, password) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return findUser ('l-' + username);
    }).then (result => {
      if (result !== null) {
        return reject (new Error ('User already exists'));
      }
      let userHash = hash.create (password);
      let user = {
        id: 'l-' + username,
        username: username,
        name: '',
        city: '',
        state: '',
        hash: userHash.hash,
        salt: userHash.salt
      };
      return users.insert (user, {w:1});
    }).then (result => {
      resolve (result);
    }).catch (err => {
      reject (err);
    });
  });
}

// update user
function updateUser (id, name, city, state) {
  return users.update (
    { id: id },
    { $set: { name: name, city: city, state: state} }
  );
}

// remove user
function removeUser (id) {
  return users.remove ({ id: id });
}

// get all books
function getBooks () {
  return books.find ().toArray ();
}

// get books by ownerId
function getBooksByOwnerId (ownerId) {
  return books.find ({ownerId: ownerId}).toArray ();
}

// get requested books
function getRequestedBooks (requesterId) {
  return books.find ({requesterId: requesterId}).toArray ();
}

// get a single book
function getBook (_id) {
  return books.findOne ({ _id: new ObjectId (_id) });
}

// insert a book
function insertBook (newBook) {
  return books.insert (newBook, {w:1});
}

// update a book
function updateBook (_id, category, title, author, cover) {
  return books.update (
    { _id: new ObjectId (_id) },
    { $set: {
      category: category,
      title: title,
      author: author,
      cover: cover
    }}
  );
}

// remove a book
function removeBook (_id) {
  return books.remove ({ _id: new ObjectId (_id) });
}

// set requester for book
function setRequester (_id, id, requester) {
  return books.update (
    { _id: new ObjectId (_id) },
    { $set: { requesterId: id, requester: requester } }
  );
}

// get trade requester
function getRequester (_id) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return books.findOne ({_id: new ObjectId (_id)});
    }).then (book => {
      if (book) {
        resolve ({requesterId: book.requesterId, requester : book.requester});
      } else {
        resolve ({requesterId: '', requester : ''});
      }
    }).catch (err => {
      reject (err);
    });
  });
}

// trade book
function trade (_id) {
  return new Promise ((resolve, reject) => {
    Promise.resolve ().then (() => {
      return books.findOne ({ _id: new ObjectId (_id) });
    }).then (book => {
      return books.update (
        { _id: new ObjectId (_id) },
        {$set: {
          ownerId: book.requesterId,
          owner: book.requester,
          requesterId: '',
          requester: ''
        }}
      );
    }).then (() => {
      resolve ();
    }).catch (err => {
      reject (err);
    });
  });
}

exports.init = init;
exports.close = close;
exports.findUser = findUser;
exports.insertLocalUser = insertLocalUser;
exports.updateUser = updateUser;
exports.removeUser = removeUser;
exports.getBooks = getBooks;
exports.getBook = getBook;
exports.getBooksByOwnerId = getBooksByOwnerId;
exports.getRequestedBooks = getRequestedBooks;
exports.insertBook = insertBook;
exports.updateBook = updateBook;
exports.removeBook = removeBook;
exports.setRequester = setRequester;
exports.getRequester = getRequester;
exports.trade = trade;
