const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');
const calculateWinner = require('./calculateWinnerTicTacToe5x5');

const models = db.getModels();

async function createGameTicTacToeMove(user, sessionId, cellNumber) {
  try {
    const session = await models.Session.findOne({where: {id: sessionId}});
    if (!session) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});
    if (session.creatorId !== user.id && session.opponentId !== user.id) throw new AppError({status: 400, message: errorMessages.SESSION_NOT_FOUND});

    let move;
    if (session.creatorId === user.id) move = 'X';
    if (session.opponentId === user.id) move = 'O';

    let ticTacToeMoves = await models.TicTacToeMove5x5.findAll({
      where: {
        sessionId: sessionId,
      }});
    if (ticTacToeMoves.length > 0){
      if (ticTacToeMoves[ticTacToeMoves.length - 1].move === move) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});
    }
    else if ('O' === move) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});

    ticTacToeMoves = ticTacToeMoves.filter(ticTacToeMove => ticTacToeMove.winningElement === false);

    let board = [];
    for (let i = 0; i < 24; i++) {
      board.push(null);
    }


    for (let i = 0; i < ticTacToeMoves.length; i++) {
      board[ticTacToeMoves[i].cellNumber] = ticTacToeMoves[i].move;
      if (ticTacToeMoves[i].cellNumber === cellNumber) throw new AppError({status: 400, message: errorMessages.BAD_MOVE});
    }

    // let winner = await calculateWinner(board);
    // if (winner) throw new AppError({status: 400, message: errorMessages.NOT_YOUR_MOVE});





    const ticTacToeMove = await models.TicTacToeMove5x5.create({
      sessionId: sessionId,
      move: move,
      cellNumber: cellNumber,

    });
    board[cellNumber] = move;

    let winner = await calculateWinner(board);
    console.log('winner', winner)
    if (winner && winner.length > 0 ) {
      // session.set('status', 'COMPLETED');
      // await session.save();


      for (let i = 0; i < winner.length; i++) {
        let ticTacToeMove = await models.TicTacToeMove5x5.findOne({
          where:{
            sessionId: sessionId,
            move: move,
            cellNumber: winner[i],
          }
        });
        ticTacToeMove.set('winningElement', true);
        await ticTacToeMove.save();
      }
    }

    return ticTacToeMove;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = createGameTicTacToeMove;

