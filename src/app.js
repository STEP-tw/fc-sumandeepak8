const fs = require('fs');
const app = (req, res) => {
  let content = '';
  console.log(req.url)
  if (req.url == '/') {
    content = fs.readFileSync('./src/flowerCatalog.html', 'utf-8');
    res.write(content);
    res.statusCode = 200;
    res.end();
    return;
  }
  if (req.url == '/freshorigins.jpg') {
    content = fs.readFileSync('./images/freshorigins.jpg');
    res.write(content);
    res.statusCode = 200;
    res.end();
    return;
  }
  if (req.url == '/animated-flower-image-0021.gif') {
    content = fs.readFileSync('./images/animated-flower-image-0021.gif');
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
