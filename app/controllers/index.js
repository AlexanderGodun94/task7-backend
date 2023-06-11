const fs = require('fs');
const path = require('path');
let controllers = [];

fs
  .readdirSync(__dirname)
  .filter(file => (file.split(".").pop() === 'js') && (file !== 'index.js'))
  .forEach(file => controllers.push(require(path.join(__dirname, file))));

module.exports = controllers;
