const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

async function connectSession(user, sessionId) {
  try {
    const models = db.getModels();
    const session = await models.Session.findOne({where: {id: sessionId}});
    if (!session) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});

    if (user.id === session.creatorId) throw new AppError({status: 400, message: errorMessages.USER_CREATOR});
    if (user.id === session.opponentId) throw new AppError({status: 400, message: errorMessages.USER_OPPONENT});
    if (session.opponentId !== null) throw new AppError({status: 400, message: errorMessages.OPPONENT_EXIST});
    session.set('opponentId', user.id);
    session.set('status', 'ACTIVE');
    return await session.save();
  } catch (err) {

    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = connectSession;

