const readArgs = require('./util');

const createTableRows = function (comments) {
  return comments.map((x) => {
    return `<tr>
    <td>${x['name']}</td>
    <td>${x['comment']}</td>
    <td>${x['date']}</td>
    </tr>`;
  }).join('');
};

const getTotalComments = function (req, fs) {
  let comments = fs.readFileSync('./nameComments.json');
  comments = JSON.parse(comments);
  comments.unshift(readArgs(req.body));
  return comments;
};

const renderGuestData = function (res, comments, table, fs) {
  fs.writeFile('./nameComments.json', comments, err => {
    if (err) {
      sendNotFound(res);
      return;
    };
    fs.readFile('./public/guestBook.html', 'utf-8', (err, data) => {
      data = data.split(`</table>`);
      let book = `${data[0]} ${table} </table> ${data[1]}`;
      send(res, 200, book);
    });
  });
};

module.exports = {
  createTableRows,
  getTotalComments,
  renderGuestData,
}