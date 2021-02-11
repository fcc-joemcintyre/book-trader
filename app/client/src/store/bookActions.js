import { ADD_BOOK, SET_BOOKS, SET_BOOK_REQUESTER, UPDATE_BOOK } from './bookConstants';
import { get, post, remove } from './jsonFetch';

// get books from server
export function setBooks () {
  return async (dispatch) => {
    const res = await get ('/api/books');
    if (res.ok) {
      dispatch ({ type: SET_BOOKS, books: res.data });
      return res.data;
    }
    throw res;
  };
}

export function saveBook (book) {
  if (book._id) {
    return updateBook (book._id, book.category, book.title, book.author, book.cover);
  } else {
    return addBook (book.category, book.title, book.author, book.cover);
  }
}

// create a new book
export function addBook (category, title, author, cover) {
  return async (dispatch) => {
    const res = await post ('/api/books', { category, title, author, cover });
    if (res.ok) {
      dispatch ({ type: ADD_BOOK, book: res.data });
      return res.data;
    }
    throw res;
  };
}

// update an existing book
export function updateBook (_id, category, title, author, cover) {
  return async (dispatch) => {
    const res = await post (`/api/books/${_id}`, { category, title, author, cover });
    if (res.ok) {
      dispatch ({ type: UPDATE_BOOK, book: res.data });
      return res.data;
    }
    throw res;
  };
}

// delete an existing book
export function deleteBook (_id) {
  return async (dispatch) => {
    const res = await remove (`/api/books/${_id}`);
    if (res.ok) {
      dispatch ({ type: SET_BOOKS, books: res.data });
      return res.data;
    }
    throw res;
  };
}

// create trade request
export function createTradeRequest (book) {
  return async (dispatch, getState) => {
    const { user } = getState ();
    const res = await post (`/api/books/${book.id}/request`);
    if (res.ok) {
      dispatch ({ type: SET_BOOK_REQUESTER, book, requesterId: user.id, requester: user.username });
      return;
    }
    throw res;
  };
}

// delete trade request
export function deleteTradeRequest (book) {
  return async (dispatch) => {
    const res = await remove (`/api/books/${book.id}/request`);
    if (res.ok) {
      dispatch ({ type: SET_BOOK_REQUESTER, book, requesterId: '', requester: '' });
      return;
    }
    throw res;
  };
}

// execute trade
export function executeTrade (input) {
  return async (dispatch) => {
    const res = await post (`/api/books/${input.id}/trade`);
    if (res.ok) {
      const { ownerId, owner, requesterId, requester } = res.data;
      dispatch ({ type: UPDATE_BOOK, book: res.data, ownerId, owner, requesterId, requester });
      return;
    }
    throw res;
  };
}
