# Booktrader Design

The *Booktrader* application is a full stack application project defined by
FreeCodeCamp.

## License
This document is licensed under a Creative Commons Attribution 4.0
International License (CC-BY).

The source code for the project is made available under a MIT license,
https://www.github.com/fcc-joemcintyre/booktrader/LICENSE.txt

# Overview

Browse books available for trading, add your own books, and make trade
requests. As a book poster, you can approve or decline trade requests.

An instance of the application is hosted on Heroku at
https://booktrader-jm/herokuapp.com

# Design

## Functional Requirements

When not logged in,

- all posted books can be browsed, but no trade actions are
available.
- browse by category and owner available by clicking links on books.
- About page available describing application.
- register and login actions are available.

When logged in,

- trade actions are available on the front page to request or cancel a trade.
- Requests page available to change requests, approve / decline others requests
for your books.
- Manage page available to add, edit and delete your books.
- Profile page available to update name, city and state of user.

Client Loading:

- The server will serve a web application to a connecting browser

Data Exchange:

- The server will accept REST calls for,
  - register
  - login, logout, verifyLogin (for continuing session)
  - request book list (individual and all)
  - create, update, delete book
  - query, request, cancel, approve, decline book trade

## Data Definitions

#### User

| Field    | Description |
| -------- | ----------- |
| id       | Unique, indexed. Assigned to each user, with prefix indicating source. Prefixes: l- locally created user, t- : Twitter user |
| username | Short text name for user |
| hash     | Password hash (only for local users)|
| salt     | Password salt (only for local users)|
| name     | Full name |
| city     | Home city |
| state    | Home state |

#### Books

| Field       | Description |
| ----------- | ----------- |
| ownerId     | FKey users.id. Book owner. |
| owner       | Book owner short name. |
| category    | Book category. |
| title       | Book title. |
| author      | Book author. |
| cover       | Book cover image URL. |
| requesterId | Id of user requesting book trade. |
| requester   | Username of user requesting book trade. |

## Non-Functional Requirements

The application processor, memory and storage requirements will fit within the
constraints to be hosted on a free Heroku dyno.

No redundancy or scaling features are implemented.

The Heroku instance uses HTTPS for transport security between the browser and
application. Other deployments of this application must also use HTTPS since
authentication and sessions are essential to the applications function.

## Technology Selections

The server is implemented with Node.js and uses ES2015+ Javascript. Data is stored
in MongoDB (4.x).

The client interface is implemented with React 16.x using ES2015+ Javascript
as supported by Babel. React-redux, react-router and styled-components are also used.

Webpack is uses for build.
