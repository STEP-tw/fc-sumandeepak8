const fs = require('fs');


const app = (req, res) => {
  let content = '';
  console.log(req.url)

  let filesPaths = {
    '/': './src/flowerCatalog.html',
    '/main.css': './src/main.css',
  };

  let imagesPaths = {
    '/freshorigins.jpg': './images/freshorigins.jpg',
    '/animated-flower-image-0021.gif': './images/animated-flower-image-0021.gif',
  }

  if (filesPaths[req.url]) {
    content = fs.readFileSync(filesPaths[req.url], 'utf-8');
    res.write(content);
    res.statusCode = 200;
    res.end();
    return;
  }
  if (imagesPaths[req.url]) {
    content = fs.readFileSync(imagesPaths[req.url]);
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
