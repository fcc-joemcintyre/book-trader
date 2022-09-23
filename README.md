# Booktrader - Put some Mileage on your Books

Everyone loves a good book, but the best way to enjoy a book is to read and
share your experience with friends. Let your friends know what books you
love, and trade them to get the conversations going.

## Live instance

The application can be used at https://booktrader-jm.onrender.com

## Development setup

Clone the *Github* repo, then install the dependencies using *npm*.

```
git clone https://github.com/fcc-joemcintyre/booktrader.git
cd booktrader
npm i
```

The database supported is *MongoDB*. This can be a local or hosted instance (you
can also choose to use a local instance for dev/test and a hosted instance for
deployment). The database name for the application is *booktrader*. The database
name used by the test runner is *booktraderTest*.

### Build (Development)

Development build is separated into server and client build steps, each running
continuously. Each runs in its own terminal to provide easy monitoring for build
issues.

In a terminal, run the server build

```
npm run dev:server
```

In a second terminal, run the client build

```
npm run dev:client
```

## Build (Production)

A single build command for production is provided that runs both server and
client production builds as a single discrete build.

```
npm run build
```

## Testing

Testing can be run for both server and client,

```
npm test
```

Or client and server individually,

```
npm run test:server
npm run test:client
```

### Server Runtime

In a terminal, continuous server operation, updating on changes, can be activated with

```
npm dev:start
```

The *nodemon* utility provides restart on update.

### Client Runtime

After starting a server instance, open a browser and then access the
application at http://localhost:3000

## Deployment

The build process creates the *dist* directory containing all the deployment
files. A Procfile is also provided for Heroku deployment.

The entry point for the server is *main.js*.
The port number for the server can be passed on the command (-p/--port) or using
the PORT environment variable. For hosted environments, the PORT environment
variable provided by the hosting service is used.

The application also uses the following environment variables,

- SESSION_SECRET

HTTP Session secret (any text string).

## License
MIT
