import { processCommand } from './cmd.js';
import { start } from './server.js';

main ();

// Process command line to start server.
function main () {
  const command = processCommand (process.argv.slice (2));
  if (command.exit) {
    process.exit (command.code);
  }

  const port = process.env.PORT || command.port;
  const uri = process.env.MONGODB_URI || 'mongodb://localhost:27017/booktrader';
  start (port, uri);
}
