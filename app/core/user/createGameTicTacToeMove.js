const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const calculateWinner = require('./calculateWinnerTicTacToe');

const models = db.getModels();

async function createGameTicTacToeMove(user, sessionId, cellNumber) {
  try {
    const session = await models.Session.findOne({where: {id: sessionId}});
    if (!session) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});
    if (session.creatorId !== user.id && session.opponentId !== user.id) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});

    let move;
    if (session.creatorId === user.id) move = 'X';
    if (session.opponentId === user.id) move = 'O';

    const ticTacToeMoves = await models.TicTacToeMove.findAll({where: {sessionId: sessionId}});

    let board = [null, null, null, null, null, null, null, null, null];

    for (let i = 0; i < ticTacToeMoves.length; i++) {
      board[ticTacToeMoves[i].cellNumber] = ticTacToeMoves[i].move;
      if (ticTacToeMoves[i].cellNumber === cellNumber) throw new AppError({status: 400, message: errorMessages.BAD_MOVE});
    }

    let winner = await calculateWinner(board);
    if (winner) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});

    if (ticTacToeMoves.length > 0){
      if (ticTacToeMoves[ticTacToeMoves.length - 1].move === move) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});
    }
    else if ('O' === move) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});

    const ticTacToeMove = await models.TicTacToeMove.create({
      sessionId: sessionId,
      move: move,
      cellNumber: cellNumber,

    });
    board[cellNumber] = move;

    winner = await calculateWinner(board);
    if (winner) {
      session.set('status', 'COMPLETED');
      await session.save();
    }

    return ticTacToeMove;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createGameTicTacToeMove;

