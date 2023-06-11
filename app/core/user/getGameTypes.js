const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

const models = db.getModels();

async function getGameTypes() {
  try {
    return await models.GameType.findAll({where: {}});

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getGameTypes;

