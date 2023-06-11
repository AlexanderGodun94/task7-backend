module.exports = function (sequelize, DataTypes) {
  const TicTacToeMove = sequelize.define('TicTacToeMove', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    sessionId: {type: DataTypes.BIGINT, allowNull: false},

    move: {
      type: DataTypes.STRING(DataTypes.ENUM({values: ['X', 'O']})),
    },
    cellNumber: {
      type: DataTypes.INTEGER(DataTypes.ENUM({values: [0, 1, 2, 3, 4, 5, 6, 7, 8, 9]})),
    },
    lastMove: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},

  }, {
    paranoid: true,
    tableName: 'ticTacToeMoves'
  });


  TicTacToeMove.associate = function (models) {
    TicTacToeMove.belongsTo(models.Session, {foreignKey: 'sessionId', onDelete: 'CASCADE', as: 'session'});


  };

  TicTacToeMove.prototype.toJSON = function () {

    return {
      id: this.id,
      sessionId: this.sessionId,
      cellNumber: this.cellNumber,
      move: this.move,
      lastMove: this.lastMove,
    };
  };

  return TicTacToeMove;
};
