import { SET_BOOKS, SET_BOOK_REQUESTER, UPDATE_BOOK } from './constants';

let initialState = [];

export default function books (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return action.books.slice ();

    case SET_BOOK_REQUESTER:
    return state.map (book => {
      if (book._id === action.book._id) {
        return Object.assign (book, {
          requesterId: action.requesterId,
          requester: action.requester
        });
      }
      return book;
    });

    case UPDATE_BOOK:
    return state.map (book => {
      if (book._id === action.book._id) {
        return Object.assign (book, {
          ownerId: action.ownerId,
          owner: action.owner,
          requesterId: action.requesterId,
          requester: action.requester
        });
      }
      return book;
    });

    default:
      return state;
  }
}

export function getBook (state, _id) {
  for (let book of state.books) {
    if (book._id === _id) {
      return book;
    }
  }
  return null;
}
