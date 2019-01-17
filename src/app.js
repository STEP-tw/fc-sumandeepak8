const fs = require('fs');

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

const logRequest = function (req) {
  console.log('req.headers', req.headers)
  console.log(req.method, req.url);
};

const app = (req, res) => {
  let data = '';
  req.on('data', (chunk) => {
    data += chunk;
  });
  req.on('end', () => {
    res.write(data);
  })
  logRequest(req);
  getContent(req, res);
}

// Export a function that can act as a handler

module.exports = app;
