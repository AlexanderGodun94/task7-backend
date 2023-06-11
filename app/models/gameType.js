module.exports = function (sequelize, DataTypes) {

  const GameType = sequelize.define('GameType', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    name: {type: DataTypes.STRING, allowNull: false, unique: true},
  }, {
    paranoid: true,
    tableName: 'gameType'
  });


  GameType.associate = function (models) {
    GameType.hasMany(models.Session, {foreignKey: 'senderId', as: 'sender'});
  };

  GameType.prototype.toJSON = function () {

    return {
      id: this.id,
      name: this.name,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };

  return GameType;
};
