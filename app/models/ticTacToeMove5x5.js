module.exports = function (sequelize, DataTypes) {
  const TicTacToeMove = sequelize.define('TicTacToeMove5x5', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    sessionId: {type: DataTypes.BIGINT, allowNull: false},

    move: {
      type: DataTypes.STRING(DataTypes.ENUM({values: ['X', 'O']})),
    },
    cellNumber: {type: DataTypes.INTEGER,},
    lastMove: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},
    winningElement: {type: DataTypes.BOOLEAN, allowNull: false, defaultValue: false},

  }, {
    paranoid: true,
    tableName: 'ticTacToeMoves5x5'
  });


  TicTacToeMove.associate = function (models) {
    TicTacToeMove.belongsTo(models.Session, {foreignKey: 'sessionId', onDelete: 'CASCADE', as: 'session'});


  };

  TicTacToeMove.prototype.toJSON = function () {

    return {
      id: this.id,
      sessionId: this.sessionId,
      cellNumber: this.cellNumber,
      winningElement: this.winningElement,
      move: this.move,
    };
  };

  return TicTacToeMove;
};
