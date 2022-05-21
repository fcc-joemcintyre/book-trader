import passport from 'passport';
import { Strategy } from 'passport-local';
import { findUserByUsername } from '../db/index.js';
import { compare } from './hash.js';

// Initialize authentication module, with serializer and desericalizer
export function init () {
  // local authentication using database for user registry
  passport.use (new Strategy (async (username, password, callback) => {
    try {
      const user = await findUserByUsername (username);
      if (!user) {
        return callback (null, false);
      }
      const passwordMatch = compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    } catch (err) {
      return callback (err);
    }
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => callback (null, user.username));

  // set function to get user from username
  passport.deserializeUser (async (username, callback) => {
    try {
      const user = await findUserByUsername (username);
      return callback (null, user);
    } catch (err) {
      return callback (err);
    }
  });
}
