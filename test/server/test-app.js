'use strict';
const request = require ('request');
const baseUrl = require ('./test-main').url;

let amyBookIds = [];
let bobBookIds = [];
before (function (done) {
  request.get (`${baseUrl}api/books`, (err, res, body) => {
    if (err) { return done (err); }
    let books = JSON.parse (body);
    for (let book of books) {
      if (book.ownerId === 'l-amy') {
        amyBookIds.push (book._id);
      } else {
        bobBookIds.push (book._id);
      }
    }
    done ();
  });
});

describe ('unauthenticated', function () {
  describe ('valid search all request', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/books`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let books = JSON.parse (body);
          if (books.length === 6) {
            return done ();
          } else {
            return done (new Error (`wrong number of books: ${books.length}`));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific owner)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/books?id=l-amy`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let books = JSON.parse (body);
          if (books.length === 4) {
            return done ();
          } else {
            return done (new Error ('wrong number of books: ', books.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific book)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/books/${amyBookIds[0]}`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('invalid search request (specific book)', function () {
    it ('should return list', function (done) {
      let url = `${baseUrl}api/books/000000000000000000000000`;
      request.get ({url: url}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add book', function () {
    it ('should fail (unauthenticated)', function (done) {
      let url = `${baseUrl}api/books`;
      let data = { category: 'Gg', title: 'Ggg', author: 'Hhh', cover: 'http://example.com/image10.png' };
      request.post ({url: url, json: data}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 401) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('authenticated', function () {
  let cookie;
  before (function (done) {
    let form = { form: {username:'amy', password:'test'}};
    request.post (`${baseUrl}api/login`, form, (err, res, body) => {
      if (err) { return done (err); }
      if (res.statusCode === 200) {
        cookie = res.headers['set-cookie'][0];
        return done ();
      }
      return done (new Error (`Invalid status code ${res.statusCode}`));
    });
  });

  after (function (done) {
    request.post (`${baseUrl}api/logout`, (err, res, body) => {
      done ();
    });
  });

  describe ('valid search all request', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books`;
      request.get ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let books = JSON.parse (body);
          if (books.length === 6) {
            return done ();
          } else {
            return done (new Error ('wrong number of books: ', books.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific user)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books?id=l-amy`;
      request.get ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let books = JSON.parse (body);
          if (books.length === 4) {
            return done ();
          } else {
            return done (new Error ('wrong number of books: ', books.length));
          }
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('valid search request (specific book)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${amyBookIds[0]}`;
      request.get ({url: url, jar:jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('invalid search request (specific book)', function () {
    it ('should return list', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/000000000000000000000000`;
      request.get ({url: url, jar:jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('add book', function () {
    it ('should succeed', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books`;
      let data = { category: 'Gg', title: 'Ggg', author: 'Hhh', cover: 'http://example.com/image10.png' };
      request.post ({url: url, jar:jar, json: data}, (err, res, book) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('update book', function () {
    it ('should contain updated data', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${amyBookIds[0]}`;
      let data = {
        category: 'UCategory',
        title: 'UTitle',
        author: 'UAuthor',
        cover: 'http://u.u/u.png'
      };
      request.post ({url: url, jar: jar, json: data}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get (`${baseUrl}api/books/${amyBookIds[0]}`, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              body = JSON.parse (body);
              if ((body.category === 'UCategory') && (body.title === 'UTitle') &&
                  (body.author === 'UAuthor') && (body.cover === 'http://u.u/u.png')) {
                return done ();
              } else {
                return done (new Error (`Invalid update ${JSON.stringify (body)}`));
              }
            } else {
              return done (new Error (`(Second) Invalid status code ${res.statusCode}`));
            }
          });
        } else {
          return done (new Error (`(First) Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('delete book', function () {
    it ('should remove book from database', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${amyBookIds[3]}`;
      request.del ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          request.get (`${baseUrl}api/books/${amyBookIds[3]}`, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 404) {
              return done ();
            } else {
              return done (new Error (`(Second) Invalid status code ${res.statusCode}`));
            }
          });
        } else {
          return done (new Error (`(First) Invalid status code ${res.statusCode}`));
        }
      });
    });
  });
});

function login (id, password) {
  return new Promise ((resolve, reject) => {
    let form = { form: {username: id, password: password}};
    request.post (`${baseUrl}api/login`, form, (err, res, body) => {
      if (err) { return reject (err); }
      if (res.statusCode === 200) {
        let cookie = res.headers['set-cookie'][0];
        return resolve (cookie);
      }
      return reject (new Error (`Invalid status code ${res.statusCode}`));
    });
  });
}

function logout () {
  return new Promise ((resolve, reject) => {
    request.post (`${baseUrl}api/logout`, (err, res, body) => {
      resolve ();
    });
  });
}

describe ('trade requests', function () {
  let cookie;
  before (function (done) {
    login ('amy', 'test').then (result => {
      cookie = result;
      done ();
    }).catch (err => {
      done (err);
    });
  });

  after (function (done) {
    logout ().then (done ()).catch (err => done (err));
  });

  describe ('create trade request', function () {
    it ('should have requester for book', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${bobBookIds[0]}/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let url = `${baseUrl}api/books/${bobBookIds[0]}`;
          request.get ({url: url, jar:jar}, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              let result = JSON.parse (body);
              if ((result.requesterId === 'l-amy') && (result.requester === 'amy')) {
                return done ();
              } else {
                return done (new Error (`Invalid requesters ${JSON.stringify (result)}`));
              }
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  // duplicate request
  describe ('trade request (duplicate)', function () {
    it ('should accept book request', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${bobBookIds[0]}/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          let url = `${baseUrl}api/books/${bobBookIds[0]}`;
          request.get ({url: url, jar:jar}, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              let result = JSON.parse (body);
              if ((result.requesterId === 'l-amy') && (result.requester === 'amy')) {
                return done ();
              } else {
                return done (new Error (`Invalid requesters ${JSON.stringify (result)}`));
              }
            }
          });
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  // delete request
  describe ('delete request', function () {
    it ('should leave no requester', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${bobBookIds[0]}/request`;
      request.delete ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          if (res.statusCode === 200) {
            let url = `${baseUrl}api/books/${bobBookIds[0]}`;
            request.get ({url: url, jar:jar}, (err, res, body) => {
              if (err) { return done (err); }
              if (res.statusCode === 200) {
                let result = JSON.parse (body);
                if ((result.requesterId === '') && (result.requester === '')) {
                  return done ();
                } else {
                  return done (new Error (`Invalid requesters ${JSON.stringify (result)}`));
                }
              }
            });
          } else {
            return done (new Error (`Invalid status code ${res.statusCode}`));
          }
        }
      });
    });
  });

  // cannot request own book
  describe ('request own book', function () {
    it ('should not add to requesters', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${amyBookIds[0]}/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 400) {
          return done ();
        } else {
          return done (new Error (`Invalid status code ${res.statusCode}`));
        }
      });
    });
  });

  describe ('request unknown book (_id does not exist)', function () {
    it ('should receive 404 response', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/000000000000000000000000/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        }
        return done (new Error (`Invalid status code ${res.statusCode}`));
      });
    });
  });

  describe ('get list of books user has requested', function () {
    it ('should receive array of books (2)', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${bobBookIds[0]}/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        let url2 = `${baseUrl}api/books/${bobBookIds[1]}/request`;
        request.post ({url: url2, jar: jar}, (err, res, body) => {
          if (err) { return done (err); }
          let url3 = `${baseUrl}api/requests`;
          request.get ({url: url3, jar: jar}, (err, res, body) => {
            if (err) { return done (err); }
            if (res.statusCode === 200) {
              body = JSON.parse (body);
              if (body.length === 2) {
                return done ();
              } else {
                return done (new Error (`Wrong number of requests ${body.length}`));
              }
            }
            return done (new Error (`(Third) Invalid status code ${res.statusCode}`));
          });
        });
      });
    });
  });

  describe ('execute trade', function () {
    it ('should change owner, remove requester', function (done) {
      let jar = request.jar ();
      jar.setCookie (cookie, 'http://localhost:3000');
      let url = `${baseUrl}api/books/${bobBookIds[1]}/request`;
      request.post ({url: url, jar: jar}, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 200) {
          logout ().then (() => {
            login ('bob', 'test').then ((cookie) => {
              jar.setCookie (cookie, 'http://localhost:3000');
              url = `${baseUrl}api/books/${bobBookIds[1]}/trade`;
              request.post ({url: url, jar:jar}, (err, res, body) => {
                if (err) { return done (err); }
                if (res.statusCode === 200) {
                  let book = JSON.parse (body);
                  if ((book.ownerId === 'l-amy') && (book.owner === 'amy') &&
                      (book.requesterId === '') && (book.requester === '')) {
                    return done ();
                  } else {
                    return done (new Error (`Invalid trade ${JSON.stringify (book)}`));
                  }
                } else {
                  return done (new Error (`Invalid status code (2) ${res.statusCode}`));
                }
              });
            });
          });
        } else {
          return done (new Error (`Invalid status code (1) ${res.statusCode}`));
        }
      });
    });
  });
});

describe ('REST call validation', function () {
  describe ('invalid REST URL', function () {
    it ('should fail with 404', function (done) {
      request.get (`${baseUrl}api/invalid`, (err, res, body) => {
        if (err) { return done (err); }
        if (res.statusCode === 404) {
          return done ();
        }
        return done (new Error (`Invalid statusCode ${res.statusCode}`));
      });
    });
  });
});
