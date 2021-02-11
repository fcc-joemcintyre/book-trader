import { combineReducers, createStore, applyMiddleware } from 'redux';
import thunk from 'redux-thunk';
import books from './books';
import user from './user';

export default function configureStore (initialState) {
  return createStore (combineReducers ({ user, books }), initialState, applyMiddleware (thunk));
}
