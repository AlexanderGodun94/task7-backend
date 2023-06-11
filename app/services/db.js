const Sequelize = require('sequelize');
const config = require('../../config');
const logger = require('./logger');
const path = require('path');

let models = {};
let sequelize = null;

if (!config.postgres.database) return logger.error(new Error('!config.postgres.database'));
if (!config.postgres.username) return logger.error(new Error('!config.postgres.username'));
if (!config.postgres.password) return logger.error(new Error('!config.postgres.password'));
if (!config.postgres.host) return logger.error(new Error('!config.postgres.host'));

let connection = {
  host: config.postgres.host,
  dialect: 'postgres',
  pool: {
    max: 150,
    min: 0,
    idle: 10000
  },
  minifyAliases: true,
  logging: (msg) => logger.debug(msg),  //config.get('postgres.logging') ? //console.log : null,
  //timezone: config.postgres.timezone
};
if (config.postgres.port) connection.port = config.postgres.port;

sequelize = new Sequelize(config.postgres.database, config.postgres.username, config.postgres.password, connection);

const files = require('./../models');
files.reverse().forEach(file => {
  const model = require(file)(sequelize, Sequelize.DataTypes);
  models[model.name] = model;
});

Object.keys(models).forEach(modelName => {
  if ("associate" in models[modelName]) {
    models[modelName].associate(models);
  }
});

console.log('Database loaded');

function db() {

}

db.getSequelize = function () {
  return sequelize;
};

db.getModels = function () {
  return models;
};

module.exports = db;
