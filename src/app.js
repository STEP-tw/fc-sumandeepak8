const fs = require('fs');
const { send, sendNotFound, getPath, readBody, readArgs, parser, toString } = require('../public/util');

const GuestBook = require('../public/guestBook');
const book = new GuestBook();

const AppData = require('./appData.js');
const app = new AppData();

const getContent = function (req, res) {
  let path = getPath(req.url);
  fs.readFile(path, (err, content) => {
    if (err) {
      sendNotFound(res);
      return;
    };
    send(res, 200, content);
  });
};

const renderGuestBook = function (req, res) {
  fs.readFile('./comments.json', (err, data) => {
    let comments = parser(data);
    let comment = readArgs(req.body);
    comments.unshift(comment);
    const table = book.getTable(comments);
    comments = toString(comments);
    fs.writeFile('./comments.json', comments, err => {
      book.renderGuestBookData(res, table);
    });
  });
};

const getGuestPage = function (req, res) {
  book.renderGuestBookData(res, '');
};

const logRequest = function (req, res, next) {
  console.log('request url', req.url);
  next();
};

app.use(logRequest);
app.use(readBody);
app.post('/guestBook.js', renderGuestBook);
app.get('/guestBook.js', getGuestPage);
app.use(getContent);
module.exports = app.handleRequest.bind(app);