const fs = require('fs');
const AppData = require('./appData.js');
const app = new AppData();

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const prefixPublic = (url) => './public' + url;

const getPath = function (url) {
  if (url == '/') return prefixPublic('/index.html');
  return prefixPublic(url);
};

const getDate = function () {
  return new Date().toLocaleString();
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

const createTableRows = function (comments) {
  return comments.map((x) => {
    return `<tr>
    <td>${x['name']}</td>
    <td>${x['comment']}</td>
    <td>${x['date']}</td>
    </tr>`;
  }).join('');
};

const getTotalComments = function (req) {
  let comments = fs.readFileSync('./nameComments.json');
  comments = JSON.parse(comments);
  comments.unshift(readArgs(req.body));
  return comments;
};

const renderGuestData = function (res, comments, table) {
  fs.writeFile('./nameComments.json', comments, err => {
    if (err) {
      send(res, 404, 'File Not Found,404');
      return;
    };
    fs.readFile('./public/guestBook.html', 'utf-8', (err, data) => {
      data = data.split(`</table>`);
      let book = `${data[0]} ${table} </table> ${data[1]}`;
      send(res, 200, book);
    });
  });
};

const renderGuestBook = function (req, res) {
  let comments = getTotalComments(req);
  let table = createTableRows(comments);
  comments = JSON.stringify(comments);
  renderGuestData(res, comments, table);
};

const readArgs = text => {
  let args = {};
  const splitKeyValue = pair => pair.split('=');
  const assignKeyValueToArgs = ([key, value]) => args[key] = value;
  text.split('&').map(splitKeyValue).forEach(assignKeyValueToArgs);
  args['date'] = getDate();
  return args;
};

const readBody = function (req, res, next) {
  let data = '';
  req.on('data', chunk => {
    data += chunk;
  });
  req.on('end', () => {
    req.body = data;
    next();
  });
};

const logRequest = function (req, res, next) {
  console.log('request headers', req.headers);
  console.log('request method', req.method);
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