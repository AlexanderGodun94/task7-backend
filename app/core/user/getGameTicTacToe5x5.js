const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const calculateWinner = require('./calculateWinnerTicTacToe');

const models = db.getModels();

async function getGameTicTacToe(user, sessionId) {
  try {
    const session = await models.Session.findOne({where: {id: sessionId}});
    if (!session) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});
    if (session.creatorId !== user.id && session.opponentId !== user.id) throw new AppError({
      status: 400,
      message: errorMessages.SESSION_NOT_FOUND
    });

    let boardNull = [];
    for (let i = 0; i < 24; i++) {
      boardNull.push(null);
    }

    let board = {board: boardNull};


    const ticTacToeMoves = await models.TicTacToeMove5x5.findAll({
      where: {
        sessionId: sessionId,
      }
    });



    for (let i = 0; i < ticTacToeMoves.length; i++) {
      board.board[ticTacToeMoves[i].cellNumber] = ticTacToeMoves[i].move;
    }

    const countWinX = ticTacToeMoves.filter(ticTacToeMove => ticTacToeMove.winningElement === true && ticTacToeMove.move === 'X').length;
    const countWinO = ticTacToeMoves.filter(ticTacToeMove => ticTacToeMove.winningElement === true && ticTacToeMove.move === 'O').length;

 

    if (ticTacToeMoves.length === 25 && countWinX === countWinO) board.result = 'Draw';
    if (ticTacToeMoves.length === 25 && countWinX > countWinO && user.id === session.creatorId) {board.result = 'You Win'; board.winner = 'X'}
    if (ticTacToeMoves.length === 25 && countWinX < countWinO && user.id === session.creatorId) {board.result = 'You lose'; board.winner = 'O'}
    if (ticTacToeMoves.length === 25 && countWinX > countWinO && user.id === session.opponentId) {board.result = 'You lose'; board.winner = 'X'}
    if (ticTacToeMoves.length === 25 && countWinX < countWinO && user.id === session.opponentId) {board.result = 'You Win'; board.winner = 'O'}

    board.countWinX = countWinX / 3;
    board.countWinO = countWinO / 3;


    return board;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = getGameTicTacToe;

