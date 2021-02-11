import express from 'express';
import cookieSession from 'cookie-session';
// import helmet from 'helmet';
import fs from 'fs';
import http from 'http';
import path from 'path';
import passport from 'passport';
import * as auth from './auth.js';
import * as routes from './routes.js';
import * as db from './db.js';

// server instance
let server;

// the secret for the session, should be set in an environment variable
// some random text used as a placeholder for dev
const sessionSecret = process.env.SESSION_SECRET || 'randomtext_aseroja';

// ensure HTTPS is used for all interactions
const httpsOnly = (req, res, next) => {
  if (req.headers['x-forwarded-proto'] &&
    req.headers['x-forwarded-proto'] !== 'https') {
    res.redirect (['https://', req.hostname, req.url].join (''));
  } else {
    next ();
  }
};

// Start the server.
export async function start (port, dbLocation) {
  try {
    console.log ('INFO Starting server');
    await db.init (dbLocation);

    // set up static HTML serving
    const app = express ();

    // if production deployment, only allow https connections
    if (process.env.NODE_ENV === 'production') {
      app.use (httpsOnly);
    }

    // Express security best practices
    // app.use (helmet ());

    // set up HTTP parsers and session manager
    app.use (express.json ());
    app.use (express.urlencoded ({ extended: true }));
    app.use (cookieSession ({
      name: 'session',
      secret: sessionSecret,
    }));

    // set up passport authentication, attach to express session manager
    auth.init ();
    app.use (passport.initialize ());
    app.use (passport.session ());

    // create server with HTML and REST routes
    routes.init (app);

    app.get ('*.js', (req, res) => {
      const file = path.join (process.cwd (), `public${req.path}.gz`);
      if (req.acceptsEncodings ('gzip') && fs.existsSync (file)) {
        res.set ({
          'content-type': 'text/javascript',
          'content-encoding': 'gzip',
        });
        res.sendFile (file);
      } else {
        res.set ({
          'content-type': 'text/javascript',
        });
        res.sendFile (path.join (process.cwd (), `public${req.path}`));
      }
    });

    // static file handling
    app.use (express.static (path.join (process.cwd (), 'public')));

    // for not explicitly handled REST routes, return 404 message
    app.use ('/api/*', (req, res) => {
      res.status (404).json ({});
    });
    // for all other routes, let client react-router handle them
    app.get ('*', (req, res) => {
      res.sendFile (path.join (process.cwd (), 'public/index.html'));
    });

    server = http.createServer (app);
    server.listen (port, () => {
      console.log (`INFO Server listening on port ${port}`);
    });
  } catch (err) {
    console.log ('ERROR Server startup', err);
    process.exit (1);
  }
}

export function stop () {
  if (server) {
    return new Promise ((resolve) => {
      server.close (() => {
        db.close ()
          .then (() => { resolve (); })
          .catch (() => { resolve (); });
      });
    });
  } else {
    return Promise.resolve ();
  }
}
