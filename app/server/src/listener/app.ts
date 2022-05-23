import { Request, Response } from 'express';
import * as db from '../db/index.js';

export async function createBook (req: Request, res: Response) {
  console.log ('INFO createBook', req.body.category, req.body.title, req.body.author, req.body.cover);
  const user = req.user as db.User;
  const book = {
    ownerId: user.username,
    owner: user.username,
    category: req.body.category,
    title: req.body.title,
    author: req.body.author,
    cover: req.body.cover,
    requesterId: '',
    requester: '',
  };
  try {
    await db.insertBook (book);
    res.status (200).json (book);
  } catch (err) {
    console.log ('ERROR', err);
    res.status (500).json ({});
  }
}

export async function updateBook (req: Request, res: Response) {
  console.log ('INFO updateBook', req.params._id, req.body.category, req.body.title, req.body.author, req.body.cover);
  try {
    await db.updateBook (req.params._id, req.body.category, req.body.title, req.body.author, req.body.cover);
    const book = await db.getBook (req.params._id);
    res.status (200).json (book);
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function deleteBook (req: Request, res: Response) {
  console.log ('INFO deleteBook', req.params._id);
  try {
    await db.removeBook (req.params._id);
    res.status (200).json ({});
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function getBook (req: Request, res: Response) {
  console.log ('INFO getBook');
  try {
    const book = await db.getBook (req.params._id);
    if (book === null) {
      res.status (404).json ({});
    } else {
      res.status (200).json (book);
    }
  } catch (err) {
    console.log (err);
    res.status (500).json ({});
  }
}

export async function getBooks (req: Request, res: Response) {
  console.log ('INFO getBooks', req.query.id);
  try {
    let books;
    if (req.query && req.query.id && typeof req.query.id === 'string') {
      books = await db.getBooksByOwnerId (req.query.id);
    } else {
      books = await db.getBooks ();
    }
    res.status (200).json (books);
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// get list of books that the authenticated user has requested
export async function getRequestedBooks (req: Request, res: Response) {
  console.log ('INFO getRequestedBooks', req.params);
  try {
    const user = req.user as db.User;
    const books = await db.getRequestedBooks (user.username);
    res.status (200).json (books);
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// add the authenticated user to list of book trade requesters for a book
export async function createTradeRequest (req: Request, res: Response) {
  console.log ('INFO createTradeRequest');
  const { _id } = req.params;
  try {
    const book = await db.getBook (_id);
    if (book === null) {
      res.status (404).json ({});
      return;
    }
    // limit to one requester and book owner cannot add self as requester
    const user = req.user as db.User;
    if (book.ownerId === user.username) {
      res.status (400).json ({});
      return;
    }
    if (book.requesterId) {
      if (book.requesterId === user.username) {
        res.status (200).json ({});
      } else {
        res.status (400).json ({});
      }
      return;
    }
    await db.setRequester (_id, user.username, user.username);
    res.status (200).json ();
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// remove the authenticated user from list of book trade requesters for a book
export async function deleteTradeRequest (req: Request, res: Response) {
  console.log ('INFO deleteTradeRequest', req.params);
  const { _id } = req.params;
  try {
    const book = await db.getBook (_id);
    if (book === null) {
      res.status (404).json ({});
    } else {
      await db.setRequester (_id, '', '');
      res.status (200).json ();
    }
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// trade book, changing owner and removing requester
export async function executeTradeRequest (req: Request, res: Response) {
  console.log ('INFO executeTradeRequest');
  const { _id } = req.params;
  const user = req.user as db.User;
  try {
    const book = await db.getBook (_id);
    if (book === null) {
      res.status (404).json ({});
    } else if (book.ownerId !== user.username) {
      res.status (400).json ({});
    } else {
      await db.trade (_id);
      const book2 = await db.getBook (_id);
      res.status (200).json (book2);
    }
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}
