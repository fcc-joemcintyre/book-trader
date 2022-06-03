import { Request, Response } from 'express';
import * as db from '../db/index.js';

export async function createBook (req: Request, res: Response) {
  console.log ('INFO createBook');
  const user = req.user as db.User;
  try {
    const { category, title, author, cover } = req.body;
    const t = await db.createBook (user.key, category, title, author, cover);
    res.status (t.status).json (t.book);
  } catch (err) {
    console.log ('ERROR', err);
    res.status (500).json ({});
  }
}

export async function updateBook (req: Request, res: Response) {
  console.log ('INFO updateBook', req.params.key);
  try {
    const key = Number (req.params.key);
    const t = await db.updateBook (key, req.body.category, req.body.title, req.body.author, req.body.cover);
    res.status (t.status).json (t.book);
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function deleteBook (req: Request, res: Response) {
  console.log ('INFO deleteBook', req.params.key);
  try {
    const t = await db.deleteBook (Number (req.params.key));
    res.status (t.status).json ({});
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

export async function getBook (req: Request, res: Response) {
  console.log ('INFO getBook');
  try {
    const t = await db.getBook (Number (req.params.key));
    if (t.status !== 200 || t.book === undefined) {
      res.status (t.status).json ({});
    } else {
      res.status (t.status).json (t.book);
    }
  } catch (err) {
    console.log (err);
    res.status (500).json ({});
  }
}

export async function getBooks (req: Request, res: Response) {
  console.log ('INFO getBooks', req.query.key);
  try {
    let t;
    const key = Number (req.query.key);
    if (!Number.isNaN (key)) {
      t = await db.getBooksByOwner (key);
    } else {
      t = await db.getBooks ();
    }
    res.status (t.status).json (t.books);
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
    const t = await db.getRequestedBooks (user.key);
    res.status (t.status).json (t.books);
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
    const t = await db.getBook (key);
    if (t.status !== 200 || t.book === undefined) {
      res.status (404).json ({});
      return;
    }
    // limit to one requester and book owner cannot add self as requester
    const user = req.user as db.User;
    if (t.book.owner === user.key) {
      res.status (400).json ({});
      return;
    }
    if (t.book.requester === user.key) {
      res.status (200).json ({});
    } else if (t.book.requester !== 0) {
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
    const t = await db.setRequester (key, 0);
    res.status (t.status).json (t.book);
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
    const t = await db.getBook (key);
    if (t.status !== 200 || t.book === undefined) {
      res.status (t.status).json ({});
    } else if (t.book.owner !== user.key) {
      res.status (401).json ({});
    } else {
      const t1 = await db.trade (key);
      res.status (t1.status).json (t1.book);
    }
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}
