'use strict';
const passport = require ('passport');
const LocalStrategy = require ('passport-local').Strategy;
const db = require ('./db');
const hash = require ('./hash');

// Initialize authentication module, with serializer and desericalizer
function init () {
  // local authentication using database for user registry
  passport.use (new LocalStrategy ((username, password, callback) => {
    db.findUser ('l-' + username)
    .then (user => {
      if (! user) {
        return callback (null, false);
      }
      let passwordMatch = hash.compare (password, user.hash, user.salt);
      return callback (null, (passwordMatch) ? user : false);
    })
    .catch (err => {
      return callback (err);
    });
  }));

  // set function to set username as key for serialization
  passport.serializeUser ((user, callback) => {
    callback (null, user.id);
  });

  // set function to get user from username
  passport.deserializeUser ((id, callback) => {
    db.findUser (id)
    .then (user => {
      return callback (null, user);
    })
    .catch (err => {
      return callback (err);
    });
  });
}

exports.init = init;
