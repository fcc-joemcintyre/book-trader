import { SET_BOOKS, SET_BOOK_REQUESTER, UPDATE_BOOK } from './constants';
import request from 'request';

// get books from server
export function setBooks () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.get (`${location.origin}/api/books`, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let books = JSON.parse (body);
          dispatch ({ type: SET_BOOKS, books: books});
          resolve ();
        }
      });
    });
  };
}

// create a new book
export function addBook (category, title, author, cover) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let book = {
        category: category,
        title: title,
        author: author,
        cover: cover
      };
      request.post ({url: `${location.origin}/api/books`, json: book}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setBooks ());
          resolve ();
        }
      });
    });
  };
}

// update an existing book
export function updateBook (_id, category, title, author, cover) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let book = {
        category: category,
        title: title,
        author: author,
        cover: cover
      };
      request.post ({url: `${location.origin}/api/books/${_id}`, json: book}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setBooks ());
          resolve ();
        }
      });
    });
  };
}

// delete an existing book
export function deleteBook (_id) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.del ({url: `${location.origin}/api/books/${_id}`}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setBooks ());
          resolve ();
        }
      });
    });
  };
}

// create trade request
export function createTradeRequest (book) {
  return (dispatch, getState) => {
    return new Promise ((resolve, reject) => {
      let user = getState ().user;
      let uri = `${location.origin}/api/books/${book._id}/request`;
      request.post (uri, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch ({ type: SET_BOOK_REQUESTER, book, requesterId: user.id, requester: user.username });
          resolve ();
        }
      });
    });
  };
}

// delete trade request
export function deleteTradeRequest (book) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let uri = `${location.origin}/api/books/${book._id}/request`;
      request.delete (uri, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch ({ type: SET_BOOK_REQUESTER, book, requesterId: '', requester: '' });
          resolve ();
        }
      });
    });
  };
}

// execute trade
export function executeTrade (book) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let uri = `${location.origin}/api/books/${book._id}/trade`;
      request.post (uri, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let book = JSON.parse (body);
          dispatch ({
            type: UPDATE_BOOK,
            book: book,
            ownerId: book.ownerId,
            owner: book.owner,
            requesterId: book.requesterId,
            requester: book.requester
          });
          resolve ();
        }
      });
    });
  };
}
