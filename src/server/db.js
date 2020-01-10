const MongoClient = require ('mongodb').MongoClient;
const ObjectId = require ('mongodb').ObjectId;
const hash = require ('./hash');

let client = null;
let db = null;
let users = null;
let books = null;

// connect to database and set up collections
async function init (uri) {
  console.log ('INFO db.init');
  if (client) { return db; }

  try {
    // eslint-disable-next-line require-atomic-updates
    client = await MongoClient.connect (uri, { useNewUrlParser: true, useUnifiedTopology: true });
    db = client.db ();
    users = db.collection ('users');
    books = db.collection ('books');
  } catch (err) {
    console.log ('ERROR db.init', err);
    throw err;
  }

  return db;
}

// Close database and null out references
async function close () {
  if (client) {
    try {
      users = null;
      books = null;
      await client.close ();
    } finally {
      // eslint-disable-next-line require-atomic-updates
      client = null;
      db = null;
    }
  }
}

// Find single user by user name
function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
async function insertUser (username, password) {
  const existing = await findUserByUsername (username);
  if (existing) {
    throw new Error ('User already exists');
  }
  const userHash = hash.create (password);
  const user = {
    username,
    name: '',
    city: '',
    state: '',
    hash: userHash.hash,
    salt: userHash.salt,
    theme: 'base',
  };
  const result = await users.insertOne (user, { w: 1 });
  return result;
}

// Update user information (not username or password).
function updateUser (username, name, city, state, theme) {
  return users.updateOne (
    { username },
    { $set: { name, city, state, theme } },
  );
}

// remove user by username
function removeUser (username) {
  return users.deleteOne ({ username });
}

// get all books
function getBooks () {
  return books.find ().toArray ();
}

// get books by ownerId
function getBooksByOwnerId (ownerId) {
  return books.find ({ ownerId }).toArray ();
}

// get requested books
function getRequestedBooks (requesterId) {
  return books.find ({ requesterId }).toArray ();
}

// get a single book
function getBook (_id) {
  return books.findOne ({ _id: new ObjectId (_id) });
}

// insert a book
function insertBook (newBook) {
  return books.insertOne (newBook, { w: 1 });
}

// update a book
function updateBook (_id, category, title, author, cover) {
  return books.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { category, title, author, cover } },
  );
}

// remove a book
function removeBook (_id) {
  return books.removeOne ({ _id: new ObjectId (_id) });
}

// set requester for book
function setRequester (_id, id, requester) {
  return books.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { requesterId: id, requester } }
  );
}

// get trade requester
async function getRequester (_id) {
  const book = await books.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    return ({ requesterId: book.requesterId, requester: book.requester });
  } else {
    return ({ requesterId: '', requester: '' });
  }
}

// trade book
async function trade (_id) {
  const book = await books.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    await books.update (
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

exports.init = init;
exports.close = close;
exports.findUserByUsername = findUserByUsername;
exports.insertUser = insertUser;
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
