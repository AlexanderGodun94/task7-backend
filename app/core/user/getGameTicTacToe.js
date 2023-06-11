const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const calculateWinner = require('./calculateWinnerTicTacToe');

const models = db.getModels();

async function getGameTicTacToe(user, sessionId) {
  try {
    const session = await models.Session.findOne({where: {id: sessionId}});
    if (!session) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});
    if (session.creatorId !== user.id && session.opponentId !== user.id) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});


    let board = {
      board:
        [null, null, null, null, null, null, null, null, null]};


    const ticTacToeMoves = await models.TicTacToeMove.findAll({where: {sessionId: sessionId}});

    for (let i = 0; i < ticTacToeMoves.length; i++) {
      board.board[ticTacToeMoves[i].cellNumber] = ticTacToeMoves[i].move;
    }
    const newWinner = await calculateWinner(board.board);

    board.winner = newWinner;
    if (newWinner === 'X' && (user.id === session.creatorId)) board.result = 'You Win';
    else if (newWinner === 'O' && (user.id === session.creatorId)) board.result = 'You lose';
    else if (newWinner === 'O' && (user.id === session.opponentId)) board.result = 'You Win';
    else if (newWinner === 'X' && (user.id === session.opponentId)) board.result = 'You lose';
    else if (ticTacToeMoves.length === 9) board.result = 'Draw';


    return board;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getGameTicTacToe;

