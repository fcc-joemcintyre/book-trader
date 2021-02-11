import { ADD_BOOK, SET_BOOKS, SET_BOOK_REQUESTER, UPDATE_BOOK } from './bookConstants';

const initialState = [];

export default function books (state = initialState, action) {
  switch (action.type) {
    case SET_BOOKS:
      return [...action.books];

    case ADD_BOOK:
      return [...state, action.book];

    case UPDATE_BOOK:
      return state.map ((a) => (a._id === action.book._id ? action.book : a));

    case SET_BOOK_REQUESTER:
      return state.map ((book) => {
        if (book._id === action.book._id) {
          return ({
            ...book,
            requesterId: action.requesterId,
            requester: action.requester,
          });
        }
        return book;
      });

    default:
      return state;
  }
}

export function getBook (state, _id) {
  return state.books.find ((a) => a._id === _id);
}
