import { SET_AUTHENTICATED } from './userConstants';

const initialState = {
  authenticated: false,
  key: 0,
  username: '',
  email: '',
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return ({
        ...state,
        authenticated: action.authenticated,
        key: action.key,
        username: action.username,
        email: action.email,
      });

    default:
      return state;
  }
}
