'use strict';
const db = require ('./db');

// Initialize listeners (currently empty)
function init () {
}

function createBook (req, res) {
  console.log ('createBook', req.body.category, req.body.title, req.body.author, req.body.cover);
  let book = {
    ownerId: req.user.id,
    owner: req.user.username,
    category: req.body.category,
    title: req.body.title,
    author: req.body.author,
    cover: req.body.cover,
    requester: ''
  };
  Promise.resolve ().then (() => {
    return db.insertBook (book);
  }).then (() => {
    res.status (200).json (book);
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function updateBook (req, res) {
  console.log ('updateBook', req.params._id, req.body.category, req.body.title, req.body.author, req.body.cover);
  Promise.resolve ().then (() => {
    return db.updateBook (req.params._id, req.body.category, req.body.title, req.body.author, req.body.cover);
  }).then (() => {
    return db.getBook (req.params._id);
  }).then (book => {
    res.status (200).json (book);
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function deleteBook (req, res) {
  console.log ('deleteBook', req.params._id);
  Promise.resolve ().then (() => {
    return db.removeBook (req.params._id);
  }).then (() => {
    res.status (200).json ({});
  }).catch (err => {
    console.log ('  error', err);
    res.status (500).json ({});
  });
}

function getBook (req, res) {
  console.log ('getBook');
  Promise.resolve ().then (() => {
    return db.getBook (req.params._id);
  }).then (book => {
    if (book === null) {
      res.status (404).json ({});
    } else {
      res.status (200).json (book);
    }
  }).catch (err => {
    console.log (err);
    res.status (500).json ({});
  });
}

function getBooks (req, res) {
  console.log ('getBooks', req.query.id);
  Promise.resolve ().then (() => {
    if ((req.query) && (req.query.id)) {
      return db.getBooksByOwnerId (req.query.id);
    } else {
      return db.getBooks ();
    }
  }).then (books => {
    res.status (200).json (books);
  }).catch (err => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// get list of books that the authenticated user has requested
function getRequestedBooks (req, res) {
  console.log ('getRequestedBooks', req.params);
  Promise.resolve ().then (() => {
    return db.getRequestedBooks (req.user.id);
  }).then (books => {
    res.status (200).json (books);
  }).catch (err => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// add the authenticated user to list of book trade requesters for a book
function createTradeRequest (req, res) {
  console.log ('createTradeRequest', req.params, req.user.id);
  let _id = req.params._id;
  Promise.resolve ().then (() => {
    return db.getBook (_id);
  }).then (book => {
    if (book === null) {
      return res.status (404).json ({});
    }
    // limit to one requester and book owner cannot add self as requester
    if (book.ownerId === req.user.id) {
      return res.status (400).json ({});
    }
    if (book.requesterId) {
      if (book.requesterId === req.user.id) {
        res.status (200).json ();
      } else {
        return res.status (400).json ({});
      }
    }
    Promise.resolve ().then (() => {
      return db.setRequester (_id, req.user.id, req.user.username);
    }).then (() => {
      res.status (200).json ();
    });
  }).catch ((err) => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// remove the authenticated user from list of book trade requesters for a book
function deleteTradeRequest (req, res) {
  console.log ('deleteTradeRequest', req.params, req.user.id);
  let _id = req.params._id;
  Promise.resolve ().then (() => {
    return db.getBook (_id);
  }).then (book => {
    if (book === null) {
      res.status (404).json ({});
    } else {
      Promise.resolve ().then (() => {
        return db.setRequester (_id, '', '');
      }).then (() => {
        res.status (200).json ();
      });
    }
  }).catch ((err) => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
}

// trade book, changing owner and removing requester
function executeTradeRequest (req, res) {
  console.log ('executeTradeRequest', req.user.id);
  let _id = req.params._id;
  Promise.resolve ().then (() => {
    return db.getBook (_id);
  }).then (book => {
    if (book === null) {
      res.status (404).json ({});
    } else if (book.ownerId !== req.user.id) {
      res.status (400).json ({});
    } else {
      Promise.resolve ().then (() => {
        return db.trade (_id);
      }).then (() => {
        return db.getBook (_id);
      }).then ((book2) => {
        res.status (200).json (book2);
      }).catch ((err) => {
        console.log ('  err', err);
        res.status (500).json ({});
      });
    }
  }).catch ((err) => {
    console.log ('  err', err);
    res.status (500).json ({});
  });
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
