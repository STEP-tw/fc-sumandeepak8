const { send } = require('./util');

const withTag = function (content, tag) {
  return `<${tag}>${content}<${tag}/>`;
};

const createRowElement = function (element) {
  return withTag(element, 'td');
};

const createTable = function (comments) {
  let rows = comments.map((x) => {
    let rowData =
      `${createRowElement(x.name)}
       ${createRowElement(x.comment)}
       ${createRowElement(x.date)}`;
    return withTag(rowData, 'tr');
  }).join('');
  return withTag(rows, 'table');
};

const renderGuestData = function (res, table, fs) {
  fs.readFile('./public/guestBook.html', (err, data) => {
    data += table;
    send(res, 200, data);
  });
};

module.exports = {
  createTable,
  renderGuestData,
};