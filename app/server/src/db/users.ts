import { Collection, Db } from 'mongodb';
import { createHash } from '../auth/hash.js';
import { User } from './index.js';

let c: Collection<User>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export function initUsers (db: Db): void {
  c = db.collection ('users');
}

/**
 * Find single user by user name
 * @param username User name
 * @returns Db result
 */
export function findUserByUsername (username: string) {
  return c.findOne ({ username });
}

/**
 * Insert user, creating skeleton user document
 * @param username User name
 * @param password Password
 * @returns Db result
 */
export async function insertUser (username: string, password: string) {
  const existing = await findUserByUsername (username);
  if (existing) {
    throw new Error ('User already exists');
  }
  const userHash = createHash (password);
  const user = {
    username,
    name: '',
    city: '',
    state: '',
    hash: userHash.hash,
    salt: userHash.salt,
    theme: 'base',
  };
  const result = await c.insertOne (user);
  return result;
}

/**
 * Update user, not including auth fields
 * @param username User name
 * @param name Name
 * @param city City
 * @param state State
 * @param theme Theme
 * @returns Db result
 */
export function updateUser (username: string, name: string, city: string, state: string, theme: string) {
  return c.updateOne (
    { username },
    { $set: { name, city, state, theme } },
  );
}

/**
 * Delete user
 * @param username User name
 * @returns Db result
 */
export function removeUser (username: string) {
  return c.deleteOne ({ username });
}
