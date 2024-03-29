import { Application, NextFunction, Request, Response } from 'express';
import { login, logout, register, verifyLogin } from './listener/user.js';
import { createBook, createTradeRequest, deleteBook, deleteTradeRequest, executeTradeRequest, getBook,
  getBooks, getRequestedBooks, updateBook } from './listener/app.js';

/**
 * Initialize routes.
 * @param app Express app object
 */
export function initRoutes (app: Application) {
  app.post ('/api/login', login);
  app.post ('/api/logout', logout);
  app.get ('/api/verifylogin', verifyLogin);
  app.post ('/api/register', register);

  app.get ('/api/books/:key', getBook);
  app.get ('/api/books', getBooks);
  app.post ('/api/books', isAuthenticated, createBook);
  app.post ('/api/books/:key/request', isAuthenticated, createTradeRequest);
  app.delete ('/api/books/:key/request', isAuthenticated, deleteTradeRequest);
  app.post ('/api/books/:key/trade', isAuthenticated, executeTradeRequest);
  app.post ('/api/books/:key', isAuthenticated, updateBook);
  app.delete ('/api/books/:key', isAuthenticated, deleteBook);
  app.get ('/api/requests', isAuthenticated, getRequestedBooks);
}

/**
 * Authenticate, if passing continue, otherwise return 401 (auth failure)
 * @param req Request
 * @param res Response
 * @param next Next middleware
 */
function isAuthenticated (req: Request, res: Response, next: NextFunction) {
  if (req.isAuthenticated ()) {
    next ();
    return;
  }
  res.status (401).json ({});
}
