import { SET_AUTHENTICATED } from './userConstants';

const initialState = {
  authenticated: false,
  id: '',
  username: '',
  name: '',
  email: '',
  theme: '',
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return ({
        ...state,
        authenticated: action.authenticated,
        id: action.id,
        username: action.username,
      });

    default:
      return state;
  }
}
