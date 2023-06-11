const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const {Op} = require('sequelize');


async function getSessions(user) {
  try {

    const models = db.getModels();
    const sessions = await models.Session.findAll({
      order: [['createdAt', 'DESC']],
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


    let sessionArray = [];
    for (let i = 0; i < sessions.length; i++) {
      let sessionObj = sessions[i].toJSON();
      sessionObj.creator = sessions[i].creator.username;
      sessionObj.gameType = sessions[i].gameType.name;
      (sessions[i].status === 'COMPLETED' && (sessions[i].creatorId !== user.id && sessions[i].opponentId !== user.id)) || (sessions[i].status === 'ACTIVE' && (sessions[i].creatorId !== user.id && sessions[i].opponentId !== user.id))
      ? sessionObj.connect = false : sessionObj.connect = true;
      sessionArray.push(sessionObj);
    }

    return sessionArray;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getSessions;

