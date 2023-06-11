module.exports = function (sequelize, DataTypes) {
  const User = sequelize.define('User', {
    id: {type: DataTypes.BIGINT, autoIncrement: true, primaryKey: true},
    username: {type: DataTypes.STRING, allowNull: false, unique: true},
    role: {
      type: new DataTypes.VIRTUAL(DataTypes.STRING), get: () => {
        return 'investor';
      }
    },
  }, {
    paranoid: true,
    tableName: 'users'
  });


  User.associate = function (models) {
  };

  User.prototype.toJSON = function () {

    return {
      id: this.id,
      role: this.role,
      username: this.username,
      createdAt: this.createdAt,
      updatedAt: this.updatedAt
    };
  };

  return User;
};
