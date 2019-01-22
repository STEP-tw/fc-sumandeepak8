const fs = require('fs');
const { send, sendNotFound, getPath, readBody, readArgs, toString, parser } = require('../public/util');
const GuestBook = require('../public/guestBook');
const book = new GuestBook();
const AppData = require('./appData');
const app = new AppData();

const getContent = function (req, res) {
  let path = getPath(req.url);
  fs.readFile(path, (err, content) => {
    if (err) {
      sendNotFound(res);
      return;
    }
    send(res, 200, content);
  });
};

const updateComments = function (req, res, comments) {
  let comment = readArgs(req.body);
  comments.unshift(comment);
  getGuestPage(res, comments);
  fs.writeFile('./comments.json', toString(comments), err => { });
};

const getGuestPage = function (res, comments) {
  const table = book.getTable(comments);
  book.renderGuestBookData(res, table);
};

const renderGuestPage = function (req, res) {
  fs.readFile('./comments.json', 'utf-8', (err, comments) => {
    comments = parser(comments);
    if (req.method == 'POST') {
      updateComments(req, res, comments);
      return;
    };
    getGuestPage(res, comments);
  });
};

const logRequest = function (req, res, next) {
  console.log('request url', req.url);
  console.log('request method', req.method);
  next();
};

app.use(logRequest);
app.use(readBody);
app.post('/guestBook.js', renderGuestPage);
app.get('/guestBook.js', renderGuestPage);
app.use(getContent);
module.exports = app.handleRequest.bind(app);