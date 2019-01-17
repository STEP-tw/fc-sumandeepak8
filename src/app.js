const fs = require('fs');

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const getContent = function (req, res) {
  let paths = {
    '/': './src/flowerCatalog.html',
    '/main.css': './src/main.css',
    '/controller.js': './src/controller.js',
    '/freshorigins.jpg': './images/freshorigins.jpg',
    '/animated-flower-image-0021.gif': './images/animated-flower-image-0021.gif',
  }
  let path = paths[req.url];

  if (path) {
    fs.readFile(path, (err, content) => {
      send(res, 200, content);
    });
    return;
  }
  send(res, 404, 'wrong request');
};

const app = (req, res) => {
  getContent(req, res);
}


// Export a function that can act as a handler

module.exports = app;
