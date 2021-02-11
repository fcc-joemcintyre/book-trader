import { SET_AUTHENTICATED, SET_PROFILE } from './userConstants';
import { get, post } from './jsonFetch';

export async function register (username, password) {
  await post ('/api/register', { username, password });
}

export function login (username, password) {
  return async (dispatch) => {
    const res = await post ('/api/login', { username, password });
    if (res.ok) {
      const user = res.data;
      dispatch (setAuthenticated (true, user.id, user.username));
      dispatch (setProfile (user.name, user.email, user.theme));
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
        dispatch (setProfile (res.data.user.name, res.data.user.email, res.data.user.theme));
        return true;
      } else {
        dispatch (setAuthenticated (false, '', ''));
        dispatch (setProfile ('', '', 'base'));
        return false;
      }
    }
    throw res;
  };
}

export function setAuthenticated (authenticated, id, username) {
  return { type: SET_AUTHENTICATED, authenticated, id, username };
}

export function updateProfile (name, email, theme) {
  return async (dispatch) => {
    const res = await post ('/api/profile', { name, email, theme });
    if (res.ok) {
      dispatch (setProfile (name, email, theme));
      return;
    }
    throw res;
  };
}

export function setProfile (name, email, theme) {
  return { type: SET_PROFILE, name, email, theme };
}
