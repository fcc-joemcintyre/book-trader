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
  if (book.key) {
    return updateBook (book.key, book.category, book.title, book.author, book.cover);
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
export function updateBook (key, category, title, author, cover) {
  return async (dispatch) => {
    const res = await post (`/api/books/${key}`, { category, title, author, cover });
    if (res.ok) {
      dispatch ({ type: UPDATE_BOOK, book: res.data });
      return res.data;
    }
    throw res;
  };
}

// delete an existing book
export function deleteBook (key) {
  return async (dispatch) => {
    const res = await remove (`/api/books/${key}`);
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
    const res = await post (`/api/books/${book.key}/request`);
    if (res.ok) {
      dispatch ({ type: SET_BOOK_REQUESTER, book, requester: user.key });
      return;
    }
    throw res;
  };
}

// delete trade request
export function deleteTradeRequest (book) {
  return async (dispatch) => {
    const res = await remove (`/api/books/${book.key}/request`);
    if (res.ok) {
      dispatch ({ type: SET_BOOK_REQUESTER, book, requester: 0 });
      return;
    }
    throw res;
  };
}

// execute trade
export function executeTrade (book) {
  return async (dispatch) => {
    const res = await post (`/api/books/${book.key}/trade`);
    if (res.ok) {
      const { owner, requester } = res.data;
      dispatch ({ type: UPDATE_BOOK, book: res.data, owner, requester });
      return;
    }
    throw res;
  };
}
