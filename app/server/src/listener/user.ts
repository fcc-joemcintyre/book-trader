import { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import * as db from '../db/index.js';
import { validateLogin, validateRegister } from './validators.js';

// Login, authenticating user and creating a session
export function login (req: Request, res: Response, next: NextFunction) {
  console.log ('INFO login', req.body);
  if (validateLogin (req.body) === false) {
    console.log ('ERROR login (400) invalid body', validateLogin.errors);
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
          key: user.key,
          username: user.username,
          email: user.email,
        };
        return res.status (200).json (result);
      });
    }) (req, res, next);
  }
}

// logout, closing session
export function logout (req: Request, res: Response) {
  const user = req.user as db.User;
  console.log ('INFO logout', user?.username);
  req.logout ();
  res.status (200).json ({});
}

// if already logged in, return user information
// allows continuation of session
export function verifyLogin (req: Request, res: Response) {
  console.log ('INFO verifyLogin');
  let message: {
    authenticated: boolean,
    user: { key: number, username: string, email: string} | null
  } = { authenticated: false, user: null };
  if (req.isAuthenticated ()) {
    const user = req.user as db.User;
    message = {
      authenticated: true,
      user: {
        key: user.key,
        username: user.username,
        email: user.email,
      },
    };
    console.log ('INFO verified', user.username);
  } else {
    console.log ('INFO not verified (no username)');
  }
  res.status (200).json (message);
}

// register new user. If already existing user, return 403 (Forbidden)
export async function register (req: Request, res: Response) {
  console.log ('INFO register');
  if (validateRegister (req.body) === false) {
    console.log ('ERROR register (400) invalid body', validateRegister.errors);
    res.status (400).json ({});
  } else {
    const t = await db.createUser (req.body.email, req.body.username, req.body.password);
    if (t.status === 200) {
      console.log ('INFO register ok', req.body.username);
      res.status (200).json ({});
    } else {
      console.log ('ERROR register', t.status);
      res.status (t.status).json ({});
    }
  }
}
