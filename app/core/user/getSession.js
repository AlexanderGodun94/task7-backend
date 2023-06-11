const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const {Op} = require('sequelize');


async function getSessions(user, sessionId) {
  try {

    const models = db.getModels();
    const session = await models.Session.findOne({
      where: {id: sessionId},
      include: [
        {
          model: models.User,
          as: 'creator',

        },
        {
          model: models.GameType,
          as: 'gameType',
        },
      ]
    });


    let sessionObj = session.toJSON();

    sessionObj.gameType = session.gameType.name;

    return sessionObj;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getSessions;

