const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const config = require('../../../config');
const jwt = require('jsonwebtoken');

async function createSession(user, gameTypeId) {
  try {
    const models = db.getModels();
    const gameType = await models.GameType.findOne({
      where: {id: gameTypeId}
    });
    if (!gameType) throw new AppError({status: 400, message: errorMessages.GAME_TYPE_NOT_FOUND});

    return await models.Session.create({
      gameTypeId: gameTypeId,
      creatorId: user.id,
    });

  } catch (err) {

    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createSession;

