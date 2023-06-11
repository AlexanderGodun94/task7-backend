const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

async function createUser(username) {
  try {
    const models = db.getModels();
    const user = await models.User.findOrCreate({where: {username: username}});
    let userObj = user[0].toJSON();
    userObj.accessToken = jwt.sign(userObj, config.server.secret, {expiresIn: config.server.expiresIn});
    return userObj;
  } catch (err) {

    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createUser;

