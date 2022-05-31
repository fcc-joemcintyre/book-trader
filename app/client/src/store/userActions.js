import { SET_AUTHENTICATED } from './userConstants';
import { get, post } from './jsonFetch';

export function register (email, username, password) {
  return async () => {
    const res = await post ('/api/register', { email, username, password });
    if (res.ok) {
      return;
    }
    throw res;
  };
}

export function login (username, password) {
  return async (dispatch) => {
    const res = await post ('/api/login', { username, password });
    if (res.ok) {
      const user = res.data;
      dispatch (setAuthenticated (true, user.id, user.username));
      return;
    }
    throw res;
  };
}

export function logout () {
  return async (dispatch) => {
    dispatch (setAuthenticated (false, ''));
    try {
      await post ('/api/logout');
    } catch (err) {
      // ignore error
    }
  };
}

export function verifyLogin () {
  return async (dispatch) => {
    const res = await get ('/api/verifylogin');
    if (res.ok) {
      if (res.data.authenticated) {
        dispatch (setAuthenticated (true, res.data.user.id, res.data.user.username));
        return true;
      } else {
        dispatch (setAuthenticated (false, '', ''));
        return false;
      }
    }
    throw res;
  };
}

export function setAuthenticated (authenticated, id, username) {
  return { type: SET_AUTHENTICATED, authenticated, id, username };
}
