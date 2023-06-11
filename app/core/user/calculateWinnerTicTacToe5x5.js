const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');


async function calculateWinner(board) {
  try {
    const combinations = [];
    let matrix = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(i * 5 + j);
      }
      matrix.push(row);
    }

    for (let i = 0; i < matrix.length - 2; i++) {
      for (let j = 0; j < matrix[i].length - 2; j++) {
        const horizontal = [matrix[i][j], matrix[i][j + 1], matrix[i][j + 2]];
        const vertical = [matrix[i][j], matrix[i + 1][j], matrix[i + 2][j]];
        const diagonal1 = [matrix[i][j], matrix[i + 1][j + 1], matrix[i + 2][j + 2]];
        const diagonal2 = [matrix[i][j + 2], matrix[i + 1][j + 1], matrix[i + 2][j]];
        combinations.push(horizontal, vertical, diagonal1, diagonal2);
      }}

    for (let i = 0; i < combinations.length; i++) {
      const [a, b, c] = combinations[i];
      if (board[a] && board[a] === board[b] && board[a] === board[c]) {

        let elementsWiner = [];
        elementsWiner.push(a, b, c);
        return elementsWiner;
      }
    }

    return null;

  } catch (err) {
    if (err instanceof AppError) throw err;
    throw new AppError({err: err});
  }
}

module.exports = calculateWinner;

