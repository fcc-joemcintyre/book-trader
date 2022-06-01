import { ADD_BOOK, SET_BOOKS, SET_BOOK_REQUESTER, UPDATE_BOOK } from './bookConstants';

const initialState = [];

export default function books (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books];

    case ADD_BOOK:
      return [...state, action.book];

    case UPDATE_BOOK:
      return state.map ((a) => (a.key === action.book.key ? action.book : a));

    case SET_BOOK_REQUESTER:
      return state.map ((book) => {
        if (book.key === action.book.key) {
          return ({
            ...book,
            requester: action.requester,
          });
        }
        return book;
      });

    default:
      return state;
  }
}

export function getBook (state, key) {
  return state.books.find ((a) => a.key === key);
}
