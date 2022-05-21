import * as hash from '../auth/hash.js';

let c;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initUsers (db) {
  c = db.collection ('users');
}

// Find single user by user name
export function findUserByUsername (username) {
  return c.findOne ({ username });
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
  const result = await c.insertOne (user, { w: 1 });
  return result;
}

// Update user information (not username or password).
export function updateUser (username, name, city, state, theme) {
  return c.updateOne (
    { username },
    { $set: { name, city, state, theme } },
  );
}

// remove user by username
export function removeUser (username) {
  return c.deleteOne ({ username });
}
