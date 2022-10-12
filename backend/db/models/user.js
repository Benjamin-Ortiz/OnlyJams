'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      User.hasMany(models.Album, {
        foreignKey:'userId'
      }),
      User.hasMany(models.Song, {
        foreignKey:'userId'
      }),
      User.hasMany(models.Comment, {
        foreignKey:'userId'
      }),
      User.hasMany(models.Playlist, {
        foreignKey:'userId'
      })
    }
  }
  User.init({
    firstName: DataTypes.STRING,
    lastName: DataTypes.STRING,
    email: DataTypes.STRING,
    username: DataTypes.STRING,
    hasedPassword: DataTypes.STRING,
    token: DataTypes.BOOLEAN
  }, {
    sequelize,
    modelName: 'User',
  });
  return User;
};
