import { SET_AUTHENTICATED, SET_PROFILE } from './constants';
import request from 'request';

export function register (username, password) {
  return () => {
    return new Promise ((resolve, reject) => {
      let form = { form: {username: username, password: password}};
      request.post (location.origin + '/api/register', form, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          resolve ();
        }
      });
    });
  };
}

export function login (username, password) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let form = { form: {username: username, password: password}};
      request.post (location.origin + '/api/login', form, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          let user = JSON.parse (body);
          dispatch (setAuthenticated (true, user.id, user.username, user.name, user.city, user.state));
          resolve ();
        }
      });
    });
  };
}

export function logout () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.post (location.origin + '/api/logout', (err, res, body) => {
        dispatch (setAuthenticated (false, '', ''));
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          resolve ();
        }
      });
    });
  };
}

export function verifyLogin () {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      request.get (location.origin + '/api/verifylogin', (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          body = JSON.parse (body);
          let id = body.authenticated ? body.user.id : '';
          let username = body.authenticated ? body.user.username : '';
          let name = body.authenticated ? body.user.name : '';
          let city = body.authenticated ? body.user.city : '';
          let state = body.authenticated ? body.user.state : '';
          dispatch (setAuthenticated (body.authenticated, id, username, name, city, state));
          resolve (body.authenticated);
        }
      });
    });
  };
}

export function setAuthenticated (authenticated, id, username, name, city, state) {
  return { type: SET_AUTHENTICATED, authenticated, id, username, name, city, state };
}

export function updateProfile (name, city, state) {
  return dispatch => {
    return new Promise ((resolve, reject) => {
      let data = {
        name: name,
        city: city,
        state: state
      };
      request.post ({url: location.origin + '/api/profile', json: data}, (err, res, body) => {
        if (err) {
          reject (err);
        } else if (res.statusCode !== 200) {
          reject (res.statusCode);
        } else {
          dispatch (setProfile (name, city, state));
          resolve ();
        }
      });
    });
  };
}

export function setProfile (name, city, state) {
  return { type: SET_PROFILE, name, city, state};
}
