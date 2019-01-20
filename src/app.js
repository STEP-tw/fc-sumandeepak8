const fs = require('fs');
const { send, sendNotFound, getPath, readBody } = require('../public/util');
const { createTableRows, getTotalComments, renderGuestData } = require('../public/comments');
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

  let comments = getTotalComments(req, fs);
  let table = createTableRows(comments);
  comments = JSON.stringify(comments);
  renderGuestData(res, comments, table, fs);
};

const logRequest = function (req, res, next) {
  // console.log('request headers', req.headers);
  // console.log('request method', req.method);
  console.log('request url', req.url);
  next();
};

// Export a function that can act as a handler

app.use(logRequest);
app.use(readBody);
app.get('/', getContent);
app.get('/main.css', getContent);
app.get('/controller.js', getContent);
app.get('/guestBook.html', getContent);
app.get('/guestBook.html', getContent);
app.post('/guestBook.html', renderGuestBook);
app.get('/abeliophyllum.html', getContent);
app.get('/images/pbase-agerantum.jpg', getContent);
app.get('/ageratum.html', getContent);
app.get('/images/freshorigins.jpg', getContent);
app.get('/images/pbase-Abeliophyllum.jpg', getContent);
app.get('/images/animated-flower-image-0021.gif', getContent);
app.get('/favicon.ico', getContent);

module.exports = app.handleRequest.bind(app);