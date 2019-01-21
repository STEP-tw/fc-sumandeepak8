const fs = require('fs');
const { send, sendNotFound, getPath, readBody, readArgs } = require('../public/util');
const { createTable, renderGuestData } = require('../public/comments');
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
  fs.readFile('./nameComments.json', (err, comments) => {
    comments = JSON.parse(comments);
    comments.unshift(readArgs(req.body))
    let table = createTable(comments);
    comments = JSON.stringify(comments);
    fs.writeFile('./nameComments.json', comments, err => {
      renderGuestData(res, table, fs)
    });
  });
};

const logRequest = function (req, res, next) {
  console.log('request url', req.url);
  next();
};

app.use(logRequest);
app.use(readBody);
app.post('/guestBook.html', renderGuestBook);
app.get('/guestBook.html', getContent);
app.use(getContent);
module.exports = app.handleRequest.bind(app);