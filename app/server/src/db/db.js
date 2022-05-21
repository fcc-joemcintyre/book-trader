import { MongoClient } from 'mongodb';
import { initBooks } from './books.js';
import { initUsers } from './users.js';

let client = null;
let db = null;

// connect to database and set up collections
export async function init (uri) {
  console.log ('INFO db.init');
  if (client) { return db; }

  try {
    const options = {};
    // eslint-disable-next-line require-atomic-updates
    client = await MongoClient.connect (uri, options);
    db = client.db ();
    initUsers (db);
    initBooks (db);
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
      await client.close ();
    } finally {
      // eslint-disable-next-line require-atomic-updates
      client = null;
      db = null;
    }
  }
}
