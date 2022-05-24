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
 * Insert user, creating skeleton user document
 * @param username User name
 * @param password Password
 * @returns Db result
 */
export async function insertUser (username: string, password: string): Promise<UserResult> {
  const key = await getNextSequence ('users');
  if (!key) {
    return ({ status: 500 });
  }

  try {
    const { hash, salt } = createHash (password);
    const t = await c.insertOne (
      { key, username, name: '', city: '', state: '', hash, salt, theme: 'light ' }
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
 * Update user, not including auth fields
 * @param key User key
 * @param name Name
 * @param city City
 * @param state State
 * @param theme Theme
 * @returns Db result
 */
export async function updateUser (
  key: number, name: string, city: string, state: string, theme: string
): Promise<UserResult> {
  const t = await c.findOneAndUpdate (
    { key },
    { $set: { name, city, state, theme } },
    { returnDocument: 'after' },
  );
  return ({
    status: t.value ? 200 : 404,
    user: t.value || undefined,
  });
}

/**
 * Delete user
 * @param key User key
 * @returns Db result
 */
export async function removeUser (key: number): Promise<UserResult> {
  try {
    await c.deleteOne ({ key });
    return ({ status: 200 });
  } catch (err) {
    return ({ status: 400 });
  }
}
