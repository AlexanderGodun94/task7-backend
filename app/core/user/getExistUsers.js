const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

const models = db.getModels();

async function getExistUsers(user) {
  try {
    return await models.User.findAll({
      order: [['createdAt', 'ASC']],
      where: {}
    });

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getExistUsers;

