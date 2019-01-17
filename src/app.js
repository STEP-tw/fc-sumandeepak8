const fs = require('fs');

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const getPath = function (path) {
  if (path == '/') return './public/flowerCatalog.html';
  return './public' + path;
};

const getContent = function (req, res) {
  let path = getPath(req.url);
  if (path) {
    fs.readFile(path, (err, content) => {
      send(res, 200, content);
    });
    return;
  }
  send(res, 404, 'wrong request');
};

const logRequest = function (req) {
  console.log(req.method, req.url);
};

const app = (req, res) => {
  logRequest(req);
  getContent(req, res);
}


// Export a function that can act as a handler

module.exports = app;
