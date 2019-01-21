const { send } = require('./util');

const createTable = function (comments) {
  let rows = comments.map((x) => {
    return `<tr>
    <td>${x['name']}</td>
    <td>${x['comment']}</td>
    <td>${x['date']}</td>
    </tr>`;
  }).join('');
  return `<table>${rows}</table>`;
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