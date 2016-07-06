import {combineReducers} from 'redux';
import user from '../account/store/user';
import books from '../main/store/books';

const rootReducer = combineReducers ({
  user,
  books
});

export default rootReducer;
