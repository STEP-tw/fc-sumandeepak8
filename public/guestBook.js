const { send } = require('./util');


const guestBookTemplate = function (comments = '') {
  const html = `
<html>
<head>
<title>Form page</title>
<link rel="stylesheet" type="text/css" media="screen" href="/main.css" />
</head>

<body>
<div>
  <h1 class="top_heading">
    <a href="/"> &lt;&lt;</a>Guest Book
  </h1>
  </div>
  <h1>Leave a comment</h1>
  <form action="/guestBook.js" method="post">
    Name: <input name="name">
    <div>
    Comments:<textarea name="comment"></textarea>
    </div>
    <div>
    <input type="submit" value="Submit">
    </div>
  </form>
</div>
<hr>
<div>
${comments}
</div>
</body>
</html>  
`
  return html;
};

class GuestBook {

  withTag(content, tag) {
    return `<${tag}>${content}</${tag}>`;
  };

  createCell(data) {
    return this.withTag(data, 'td');
  };

  createHeadingCell(heading) {
    return this.withTag(heading, 'th');
  };

  createRow(rowData) {
    return this.withTag(rowData, 'tr');
  };

  createRows(comments) {
    return comments.map((x) => {
      let rowData =
        `${this.createCell(x.name)}
       ${this.createCell(x.comment)}
       ${this.createCell(x.date)}`;
      return this.createRow(rowData);
    }).join('');
  };

  createHeading() {
    let headerData =
      `${this.createHeadingCell('Name')}
    ${this.createHeadingCell('Comment')}
    ${this.createHeadingCell('Date')}`;
    return this.createRow(headerData);
  };

  createTable(rows) {
    return this.withTag(rows, 'table');
  };

  getTable(comments) {
    let heading = this.createHeading();
    let rows = `${heading}${this.createRows(comments)}`;
    return this.createTable(rows);
  };

  renderGuestBookData(res, table) {
    let data = guestBookTemplate(table);
    send(res, 200, data);
  };

}

module.exports = GuestBook;