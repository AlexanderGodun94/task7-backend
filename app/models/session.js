module.exports = function (sequelize, DataTypes) {
  const Session = sequelize.define('Session', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    gameTypeId: {type: DataTypes.BIGINT, allowNull: false},
    creatorId: {type: DataTypes.BIGINT, allowNull: false},
    opponentId: {type: DataTypes.BIGINT, allowNull: true},
    status: {
      type: DataTypes.STRING(DataTypes.ENUM({values: ['PENDING', 'ACTIVE', 'COMPLETED']})),
      defaultValue: 'PENDING'
    },

  }, {
    paranoid: true,
    tableName: 'session'
  });


  Session.associate = function (models) {
    Session.belongsTo(models.GameType, {foreignKey: 'gameTypeId', onDelete: 'CASCADE', as: 'gameType'});

    Session.belongsTo(models.User, {foreignKey: 'creatorId', onDelete: 'CASCADE', as: 'creator'});
    Session.belongsTo(models.User, {foreignKey: 'opponentId', onDelete: 'CASCADE', as: 'opponent'});

  };

  Session.prototype.toJSON = function () {

    return {
      id: this.id,
      gameTypeId: this.gameTypeId,
      creatorId: this.creatorId,
      opponentId: this.opponentId,
      status: this.status,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };

  return Session;
};
