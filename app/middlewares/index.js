const fs = require('fs');
const path = require('path');
let middlewares = [];

fs
  .readdirSync(__dirname)
  .filter(file => (file.split(".").pop() === 'js') && (file !== 'index.js'))
  .forEach(file => middlewares.push(require(path.join(__dirname, file))));

module.exports = middlewares;
