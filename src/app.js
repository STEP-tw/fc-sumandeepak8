const fs = require('fs');

const getContent = function (req, res, content) {
  let filesPaths = {
    '/': './src/flowerCatalog.html',
    '/main.css': './src/main.css',
  };
  let imagesPaths = {
    '/freshorigins.jpg': './images/freshorigins.jpg',
    '/animated-flower-image-0021.gif': './images/animated-flower-image-0021.gif',
  }
  if (filesPaths[req.url]) {
    return fs.readFileSync(filesPaths[req.url], 'utf-8');
  }
  if (imagesPaths[req.url]) {
    return fs.readFileSync(imagesPaths[req.url]);
  }
};


const app = (req, res) => {
  let content = '';
  content = getContent(req, res, content);
  if (content) {
    res.write(content);
    res.statusCode = 200;
    res.end();
    return;
  }
  res.write('wrong request');
  res.statusCode = 404;
  res.end();
};

// Export a function that can act as a handler

module.exports = app;
