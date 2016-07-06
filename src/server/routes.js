'use strict';
const listenerUser = require ('./listenerUser');
const listenerApp = require ('./listenerApp');

// Initialize routes.
function init (app) {
  listenerUser.init ();
  listenerApp.init ();

  app.post ('/api/login', listenerUser.login);
  app.post ('/api/logout', listenerUser.logout);
  app.get ('/api/verifylogin', listenerUser.verifyLogin);
  app.post ('/api/register', listenerUser.register);
  app.get ('/api/profile', isAuthenticated, listenerUser.getProfile);
  app.post ('/api/profile', isAuthenticated, listenerUser.updateProfile);

  app.get ('/api/books/:_id', listenerApp.getBook);
  app.get ('/api/books', listenerApp.getBooks);
  app.post ('/api/books', isAuthenticated, listenerApp.createBook);
  app.post ('/api/books/:_id/request', isAuthenticated, listenerApp.createTradeRequest);
  app.delete ('/api/books/:_id/request', isAuthenticated, listenerApp.deleteTradeRequest);
  app.post ('/api/books/:_id/trade', isAuthenticated, listenerApp.executeTradeRequest);
  app.post ('/api/books/:_id', isAuthenticated, listenerApp.updateBook);
  app.delete ('/api/books/:_id', isAuthenticated, listenerApp.deleteBook);
  app.get ('/api/requests', isAuthenticated, listenerApp.getRequestedBooks);
}

// authenticate, if passing continue, otherwise return 401 (auth failure)
function isAuthenticated (req, res, next) {
  if (req.isAuthenticated ()) {
    return next ();
  }
  res.status (401).json ({});
}

exports.init = init;
