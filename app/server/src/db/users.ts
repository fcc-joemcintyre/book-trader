import { Collection, Db, MongoServerError } from 'mongodb';
import { createHash } from '../auth/hash.js';
import { User, UserResult } from './index.js';
import { getNextSequence } from './counters.js';

let c: Collection<User>;

/**
 * Initialize collection
 * @param db MongoDB db instance object
 */
export async function initUsers (db: Db): Promise<void> {
  c = db.collection ('users');
  await c.createIndex ({ key: 1 }, { unique: true, name: 'key' });
}

/**
 * Find single user by user name
 * @param username User name
 * @returns Db result
 */
export async function findUserByUsername (username: string): Promise<UserResult> {
  const t = await c.findOne ({ username });
  return ({
    status: t ? 200 : 404,
    user: t || undefined,
  });
}

/**
 * Create user, creating skeleton user document
 * @param email User email
 * @param username User name
 * @param password Password
 * @returns Db result
 */
export async function createUser (email: string, username: string, password: string): Promise<UserResult> {
  const key = await getNextSequence ('users');
  if (!key) {
    return ({ status: 500 });
  }

  try {
    const { hash, salt } = createHash (password);
    const t = await c.insertOne (
      { key, email, username, hash, salt }
    );
    if (t.acknowledged) {
      const t2 = await c.findOne ({ key });
      return ({
        status: t2 ? 200 : 404,
        user: t2 || undefined,
      });
    } else {
      return ({ status: 400 });
    }
  } catch (err) {
    if (err instanceof MongoServerError) {
      if (err.code === 11000) {
        return ({ status: 409 });
      }
    }
    return ({ status: 500 });
  }
}

/**
 * Delete user
 * @param key User key
 * @returns Db result
 */
export async function deleteUser (key: number): Promise<UserResult> {
  try {
    await c.deleteOne ({ key });
    return ({ status: 200 });
  } catch (err) {
    return ({ status: 400 });
  }
}
