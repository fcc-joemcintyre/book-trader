import { SET_AUTHENTICATED, SET_PROFILE } from './constants';

let initialState = {
  authenticated: false,
  id: '',
  username: '',
  name: '',
  city: '',
  state: ''
};

export default function user (state = initialState, action) {
  switch (action.type) {
    case SET_AUTHENTICATED:
      return Object.assign ({}, state, {
        authenticated: action.authenticated,
        id: action.id,
        username: action.username,
        name: (action.name) ? action.name : '',
        city: (action.city) ? action.city : '',
        state: (action.state) ? action.state : ''
      });

    case SET_PROFILE:
      return Object.assign ({}, state, {
        name: (action.name) ? action.name : '',
        city: (action.city) ? action.city : '',
        state: (action.state) ? action.state : ''
      });

    default:
      return state;
  }
}
