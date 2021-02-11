import mongodb from 'mongodb';
import * as hash from './hash.js';

const { MongoClient, ObjectId } = mongodb;
let client = null;
let db = null;
let users = null;
let books = null;

// connect to database and set up collections
export async function init (uri) {
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
export async function close () {
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
export function findUserByUsername (username) {
  return users.findOne ({ username });
}

// Insert single user with username, password only populated. Suitable for
// register user type functions.
export async function insertUser (username, password) {
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
export function updateUser (username, name, city, state, theme) {
  return users.updateOne (
    { username },
    { $set: { name, city, state, theme } },
  );
}

// remove user by username
export function removeUser (username) {
  return users.deleteOne ({ username });
}

// get all books
export function getBooks () {
  return books.find ().toArray ();
}

// get books by ownerId
export function getBooksByOwnerId (ownerId) {
  return books.find ({ ownerId }).toArray ();
}

// get requested books
export function getRequestedBooks (requesterId) {
  return books.find ({ requesterId }).toArray ();
}

// get a single book
export function getBook (_id) {
  return books.findOne ({ _id: new ObjectId (_id) });
}

// insert a book
export function insertBook (newBook) {
  return books.insertOne (newBook, { w: 1 });
}

// update a book
export function updateBook (_id, category, title, author, cover) {
  return books.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { category, title, author, cover } },
  );
}

// remove a book
export function removeBook (_id) {
  return books.removeOne ({ _id: new ObjectId (_id) });
}

// set requester for book
export function setRequester (_id, id, requester) {
  return books.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { requesterId: id, requester } }
  );
}

// get trade requester
export async function getRequester (_id) {
  const book = await books.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    return ({ requesterId: book.requesterId, requester: book.requester });
  } else {
    return ({ requesterId: '', requester: '' });
  }
}

// trade book
export async function trade (_id) {
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
