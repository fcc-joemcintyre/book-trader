const db = require ('./db');

function init () {
  // no op
}

async function createBook (req, res) {
  console.log ('INFO createBook', req.body.category, req.body.title, req.body.author, req.body.cover);
  const book = {
    ownerId: req.user.id,
    owner: req.user.username,
    category: req.body.category,
    title: req.body.title,
    author: req.body.author,
    cover: req.body.cover,
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

async function updateBook (req, res) {
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

async function deleteBook (req, res) {
  console.log ('INFO deleteBook', req.params._id);
  try {
    await db.removeBook (req.params._id);
    res.status (200).json ({});
  } catch (err) {
    console.log ('  error', err);
    res.status (500).json ({});
  }
}

async function getBook (req, res) {
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

async function getBooks (req, res) {
  console.log ('INFO getBooks', req.query.id);
  try {
    let books;
    if ((req.query) && (req.query.id)) {
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
async function getRequestedBooks (req, res) {
  console.log ('INFO getRequestedBooks', req.params);
  try {
    const books = await db.getRequestedBooks (req.user.id);
    res.status (200).json (books);
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// add the authenticated user to list of book trade requesters for a book
async function createTradeRequest (req, res) {
  console.log ('INFO createTradeRequest', req.params, req.user.id);
  const _id = req.params._id;
  try {
    const book = await db.getBook (_id);
    if (book === null) {
      res.status (404).json ({});
      return;
    }
    // limit to one requester and book owner cannot add self as requester
    if (book.ownerId === req.user.id) {
      res.status (400).json ({});
      return;
    }
    if (book.requesterId) {
      if (book.requesterId === req.user.id) {
        res.status (200).json ({});
      } else {
        res.status (400).json ({});
      }
      return;
    }
    await db.setRequester (_id, req.user.id, req.user.username);
    res.status (200).json ();
  } catch (err) {
    console.log ('  err', err);
    res.status (500).json ({});
  }
}

// remove the authenticated user from list of book trade requesters for a book
async function deleteTradeRequest (req, res) {
  console.log ('INFO deleteTradeRequest', req.params, req.user.id);
  const _id = req.params._id;
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
async function executeTradeRequest (req, res) {
  console.log ('INFO executeTradeRequest', req.user.id);
  const _id = req.params._id;
  try {
    const book = db.getBook (_id);
    if (book === null) {
      res.status (404).json ({});
    } else if (book.ownerId !== req.user.id) {
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

exports.init = init;
exports.createBook = createBook;
exports.updateBook = updateBook;
exports.deleteBook = deleteBook;
exports.getBook = getBook;
exports.getBooks = getBooks;
exports.getRequestedBooks = getRequestedBooks;
exports.createTradeRequest = createTradeRequest;
exports.deleteTradeRequest = deleteTradeRequest;
exports.executeTradeRequest = executeTradeRequest;
