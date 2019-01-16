const getContent = require('./reponseData');

const app = (req, res) => {
  getContent(req, res);
}

// Export a function that can act as a handler

module.exports = app;
