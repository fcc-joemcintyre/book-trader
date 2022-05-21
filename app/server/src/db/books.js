import { ObjectId } from 'mongodb';

let c;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initBooks (db) {
  c = db.collection ('books');
}

// get all books
export function getBooks () {
  return c.find ().toArray ();
}

// get books by ownerId
export function getBooksByOwnerId (ownerId) {
  return c.find ({ ownerId }).toArray ();
}

// get requested books
export function getRequestedBooks (requesterId) {
  return c.find ({ requesterId }).toArray ();
}

// get a single book
export function getBook (_id) {
  return c.findOne ({ _id: new ObjectId (_id) });
}

// insert a book
export function insertBook (newBook) {
  return c.insertOne (newBook, { w: 1 });
}

// update a book
export function updateBook (_id, category, title, author, cover) {
  return c.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { category, title, author, cover } },
  );
}

// remove a book
export function removeBook (_id) {
  return c.removeOne ({ _id: new ObjectId (_id) });
}

// set requester for book
export function setRequester (_id, id, requester) {
  return c.updateOne (
    { _id: new ObjectId (_id) },
    { $set: { requesterId: id, requester } }
  );
}

// get trade requester
export async function getRequester (_id) {
  const book = await c.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    return ({ requesterId: book.requesterId, requester: book.requester });
  } else {
    return ({ requesterId: '', requester: '' });
  }
}

// trade book
export async function trade (_id) {
  const book = await c.findOne ({ _id: new ObjectId (_id) });
  if (book) {
    await c.update (
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
