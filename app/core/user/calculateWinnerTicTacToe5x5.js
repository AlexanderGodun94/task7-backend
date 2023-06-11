const AppError = require('../../services/error');
const errorMessages = require('../../services/errorMessages');
const db = require('../../../app/services/db');

const combinations = [
  [ 0, 1, 2 ],
  [ 1, 2, 3 ],
  [ 2, 3, 4 ],

  [ 5, 6, 7 ],
  [ 6, 7, 8 ],
  [ 7, 8, 9 ],

  [ 10, 11, 12 ],
  [ 11, 12, 13 ],
  [ 12, 13, 14 ],

  [ 15, 16, 17 ],
  [ 16, 17, 18 ],
  [ 17, 18, 19 ],

  [ 20, 21, 22 ],
  [ 21, 22, 23 ],
  [ 22, 23, 24 ],

  [ 0, 5, 10 ],
  [ 5, 10, 15 ],
  [ 10, 15, 20 ],

  [ 1, 6, 11 ],
  [ 6, 11, 16 ],
  [ 11, 16, 21 ],

  [ 2, 7, 12 ],
  [ 7, 12, 17 ],
  [ 12, 17, 22 ],

  [ 3, 8, 13 ],
  [ 8, 13, 18 ],
  [ 13, 18, 23 ],

  [ 4, 9, 14 ],
  [ 9, 14, 19 ],
  [ 14, 19, 24 ],

  [ 0, 6, 12 ],
  [ 6, 12, 18 ],
  [ 12, 18, 24 ],

  [ 1, 7, 13 ],
  [ 7, 13, 19 ],

  [ 2, 8, 14 ],

  [ 5, 11, 17 ],
  [ 11, 17, 23 ],

  [ 10, 16, 22 ],

  [ 4, 8, 12 ],
  [ 8, 12, 16 ],
  [ 12, 16, 20 ],

  [ 3, 7, 11 ],
  [ 7, 11, 15 ],

  [ 2, 6, 10 ],

  [ 9, 13, 17 ],
  [ 13, 17, 21 ],

  [ 14, 18, 23 ],


];

async function calculateWinner(board) {
  try {
    let matrix = [];
    for (let i = 0; i < 5; i++) {
      let row = [];
      for (let j = 0; j < 5; j++) {
        row.push(i * 5 + j);
      }
      matrix.push(row);
    }


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

