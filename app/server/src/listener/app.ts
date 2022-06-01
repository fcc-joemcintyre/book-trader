import { Request, Response } from 'express';
import * as db from '../db/index.js';

export async function createBook (req: Request, res: Response) {
  console.log ('INFO createBook', req.body.category, req.body.title, req.body.author, req.body.cover);
  const user = req.user as db.User;
  try {
    const { category, title, author, cover } = req.body;
    const t = await db.createBook (user.key, category, title, author, cover);
    res.status (200).json (t);
  } catch (err) {
    console.log ('ERROR', err);
    res.status (500).json ({});
  }
}

export async function updateBook (req: Request, res: Response) {
  console.log ('INFO updateBook', req.params.key, req.body.category, req.body.title, req.body.author, req.body.cover);
  try {
    const key = Number (req.params.key);
    await db.updateBook (key, req.body.category, req.body.title, req.body.author, req.body.cover);
    const book = await db.getBook (key);
    res.status (200).json (book);
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function deleteBook (req: Request, res: Response) {
  console.log ('INFO deleteBook', req.params._id);
  try {
    await db.deleteBook (Number (req.params.key));
    res.status (200).json ({});
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function getBook (req: Request, res: Response) {
  console.log ('INFO getBook');
  try {
    const book = await db.getBook (Number (req.params.key));
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
  console.log ('INFO getBooks', req.query.key);
  try {
    let books;
    const key = Number (req.query.key);
    if (!Number.isNaN (key)) {
      books = await db.getBooksByOwner (key);
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
  console.log ('INFO getRequestedBooks');
  try {
    const user = req.user as db.User;
    const books = await db.getRequestedBooks (user.key);
    res.status (200).json (books);
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// add the authenticated user to list of book trade requesters for a book
export async function createTradeRequest (req: Request, res: Response) {
  console.log ('INFO createTradeRequest');
  const key = Number (req.params.key);
  try {
    const book = await db.getBook (key);
    if (book === null) {
      res.status (404).json ({});
      return;
    }
    // limit to one requester and book owner cannot add self as requester
    const user = req.user as db.User;
    if (book.owner === user.key) {
      res.status (400).json ({});
      return;
    }
    if (book.requester === user.key) {
      res.status (200).json ({});
    } else if (book.requester !== 0) {
      res.status (400).json ({});
    }
    await db.setRequester (key, user.key);
    res.status (200).json ();
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// remove the authenticated user from list of book trade requesters for a book
export async function deleteTradeRequest (req: Request, res: Response) {
  console.log ('INFO deleteTradeRequest');
  const key = Number (req.params.key);
  try {
    const book = await db.getBook (key);
    if (book === null) {
      res.status (404).json ({});
    } else {
      await db.setRequester (key, 0);
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
  const key = Number (req.params.key);
  const user = req.user as db.User;
  try {
    const book = await db.getBook (key);
    if (book === null) {
      res.status (404).json ({});
    } else if (book.owner !== user.key) {
      res.status (400).json ({});
    } else {
      await db.trade (key);
      const t = await db.getBook (key);
      res.status (200).json (t);
    }
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}
