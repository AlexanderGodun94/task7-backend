const fs = require('fs');
const path = require('path');
const logger = require('../services/logger');
let db = [];

fs
.readdirSync(__dirname)
.filter(file => (file.split('.').pop() === 'js') && (file !== 'index.js'))
.forEach(file => db.push(path.join(__dirname, file)));

db.forEach(file => {
  logger.info(file);
});

module.exports = db;