const Ajv = require ('ajv');
const passport = require ('passport');
const db = require ('./db');
const schemaLogin = require ('./schema/login.json');
const schemaRegister = require ('./schema/register.json');
const schemaUpdateProfile = require ('./schema/updateProfile.json');

// object holding validator instance and pre-compiled schemas
const validator = {};

// Initialize listeners
function init () {
  validator.ajv = new Ajv ();
  validator.login = validator.ajv.compile (schemaLogin);
  validator.register = validator.ajv.compile (schemaRegister);
  validator.updateProfile = validator.ajv.compile (schemaUpdateProfile);
}

// Login, authenticating user and creating a session
function login (req, res, next) {
  console.log ('INFO login');
  if (validator.login (req.body) === false) {
    console.log ('ERROR login (400) invalid body', validator.login.errors);
    res.status (400).json ({});
  } else {
    passport.authenticate ('local', (err, user) => {
      if (err) {
        return next (err);
      }
      // if not a valid user, return 401 auth error
      if (!user) {
        console.log ('ERROR login (401) unauthenticated');
        return res.status (401).json ({});
      }
      return req.login (user, (err2) => {
        if (err2) {
          return next (err2);
        }
        console.log ('INFO login ok', user.username);
        const result = {
          id: user.id,
          username: user.username,
          name: req.user.name,
          city: req.user.city,
          state: req.user.state,
          theme: req.user.theme,
        };
        return res.status (200).json (result);
      });
    }) (req, res, next);
  }
}

// logout, closing session
function logout (req, res) {
  console.log ('INFO logout', (req.user) ? req.user.username : '');
  req.logout ();
  res.status (200).json ({});
}

// if already logged in, return user information
// allows continuation of session
function verifyLogin (req, res) {
  console.log ('INFO verifyLogin');
  let message = { authenticated: false, user: null };
  if (req.isAuthenticated ()) {
    message = {
      authenticated: true,
      user: {
        id: req.user.id,
        username: req.user.username,
        name: req.user.name,
        city: req.user.city,
        state: req.user.state,
        theme: req.user.theme,
      },
    };
    console.log ('INFO verified', req.user.username);
  } else {
    console.log ('INFO not verified (no username)');
  }
  res.status (200).json (message);
}

// register new user. If already existing user, return 403 (Forbidden)
async function register (req, res) {
  console.log ('INFO register');
  if (validator.register (req.body) === false) {
    console.log ('ERROR register (400) invalid body', validator.register.errors);
    res.status (400).json ({});
  } else {
    try {
      await db.insertUser (req.body.username, req.body.password);
      console.log ('INFO register ok', req.body.username);
      res.status (200).json ({});
    } catch (err) {
      console.log ('ERROR register', err);
      res.status (403).json ({});
    }
  }
}

function getProfile (req, res) {
  console.log ('INFO getProfile', req.user.username);
  res.status (200).json ({
    name: req.user.name,
    city: req.user.city,
    state: req.user.state,
    theme: req.user.theme,
  });
}

async function updateProfile (req, res) {
  console.log ('INFO updateProfile', req.user.username);
  if (validator.updateProfile (req.body) === false) {
    console.log ('ERROR updateProfile (400) invalid body', validator.updateProfile.errors);
    res.status (400).json ({});
  } else {
    try {
      const { name, city, state, theme } = req.body;
      await db.updateUser (req.user.username, name, city, state, theme);
      console.log ('INFO updateProfile ok');
      res.status (200).json ({});
    } catch (err) {
      console.log ('ERROR updateProfile (500)', err);
      res.status (500).json ({});
    }
  }
}

exports.init = init;
exports.login = login;
exports.logout = logout;
exports.verifyLogin = verifyLogin;
exports.register = register;
exports.getProfile = getProfile;
exports.updateProfile = updateProfile;
