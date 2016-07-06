'use strict';
const processCommand = require ('./cmd').processCommand;
const server = require ('./server');

if (require.main === module) {
  main ();
}

// Process command line to start server.
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  let port = process.env.PORT || command.port;
  let dbUri = process.env.MONGODB_URI || 'mongodb://localhost:27017/booktrader';
  server.start (port, dbUri);
}
