import passport from 'passport';
import { Strategy } from 'passport-local';
import { findUserByUsername, User } from '../db/index.js';
import { compareHash } from './hash.js';

// Initialize authentication module, with serializer and desericalizer
export function initAuth (): void {
  // local authentication using database for user registry
  passport.use (new Strategy (async (username, password, callback) => {
    try {
      const user = await findUserByUsername (username);
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = compareHash (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => callback (null, user));

  // set function to get user from username
  passport.deserializeUser ((user: User | false | undefined | null, callback) => {
    callback (null, user);
  });
}
