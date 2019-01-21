const prefixPublic = (url) => './public' + url;

const parser = function (data) {
  return JSON.parse(data);
};

const toString = function (object) {
  return JSON.stringify(object);
};

const getDate = function () {
  return new Date().toLocaleString();
};

const getPath = function (url) {
  if (url == '/') return prefixPublic('/index.html');
  return prefixPublic(url);
};

const send = function (res, statusCode, content) {
  res.statusCode = statusCode;
  res.write(content);
  res.end();
};

const sendNotFound = function (res) {
  res.statusCode = 404;
  res.write('File not found, Error 404');
  res.end();
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

module.exports = {
  getDate,
  getPath,
  send,
  sendNotFound,
  readBody,
  readArgs,
  parser,
  toString,
}