const errorMessages = require('../services/errorMessages');
const AppError = require('../services/error');
const respond = require('../middlewares/respond');
const reqAuth = require('../middlewares/reqAuth');
const reqUser = require('../middlewares/reqUser');

const createOrGetUser = require('../core/user/createOrGetUser');
const createSession = require('../core/user/createSession');
const getGameTypes = require('../core/user/getGameTypes');
const getSessions = require('../core/user/getSessions');
const connectSession = require('../core/user/connectSession');
const getGameTicTacToe = require('../core/user/getGameTicTacToe');
const createGameTicTacToeMove = require('../core/user/createGameTicTacToeMove');
const getSession = require('../core/user/getSession');
const getGameTicTacToe5x5 = require('../core/user/getGameTicTacToe5x5');
const createGameTicTacToe5x5Move = require('../core/user/createGameTicTacToe5x5Move');



module.exports = function () {

  const app = this.app;

  app.route('/api/v1/user')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, req.user);
    })
    .post((req, res) => {
      if (!req.body.username)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createOrGetUser(req.body.username));
    });

  app.route('/api/v1/user/gameTypes')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, getGameTypes());
    });

  app.route('/api/v1/user/session')
    .get(reqAuth, reqUser,(req, res) => {
      if (!req.query.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, getSession(req.user, req.query.sessionId));
    })
    .post(reqAuth, reqUser, (req, res) => {
      if (!req.body.gameTypeId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createSession(req.user, req.body.gameTypeId));
    });

  app.route('/api/v1/user/sessions')
    .get(reqAuth, reqUser,(req, res) => {
      respond(res, 200, getSessions(req.user));
    });

  app.route('/api/v1/user/session/connect')
    .post(reqAuth, reqUser, (req, res) => {
      if (!req.body.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, connectSession(req.user, req.body.sessionId));
    });


  app.route('/api/v1/user/game/ticTacToe')
    .get(reqAuth, reqUser,(req, res) => {
      if (!req.query.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, getGameTicTacToe(req.user, req.query.sessionId));
    });

  app.route('/api/v1/user/game/ticTacToe/move')
    .post(reqAuth, reqUser,(req, res) => {
      if (!req.body.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createGameTicTacToeMove(req.user, req.body.sessionId, req.body.cellNumber));
    });

  app.route('/api/v1/user/game/ticTacToe5x5')
    .get(reqAuth, reqUser,(req, res) => {
      if (!req.query.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, getGameTicTacToe5x5(req.user, req.query.sessionId));
    });

  app.route('/api/v1/user/game/ticTacToe5x5/move')
    .post(reqAuth, reqUser,(req, res) => {
      if (!req.body.sessionId)
        return res.status(400).json(new AppError({status: 400, message: errorMessages.BAD_DATA}));
      respond(res, 200, createGameTicTacToe5x5Move(req.user, req.body.sessionId, req.body.cellNumber));
    });




};

