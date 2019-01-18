const fs = require('fs');
const AppData = require('./appData.js');
const app = new AppData();

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const getPath = function (url) {
  if (url == '/') return './public/flowerCatalog.html';
  return './public' + url;
};

const getContent = function (req, res) {
  let path = getPath(req.url);
  fs.readFile(path, (err, content) => {
    if (err) {
      send(res, 404, 'File Not Found,404');
      return;
    }
    send(res, 200, content);
  });
};

const logRequest = function (req, res, next) {
  console.log('req.headers', req.headers);
  console.log('method', req.method, req.url);
  next();
};

// Export a function that can act as a handler

app.use(logRequest);
app.get('/', getContent);
app.get('/main.css', getContent);
app.get('/controller.js', getContent);
app.get('/guestBook.html', getContent);
app.get('/images/freshorigins.jpg', getContent);
app.get('/images/animated-flower-image-0021.gif', getContent);
app.get('/favicon.ico', getContent);

module.exports = app.handleRequest.bind(app);