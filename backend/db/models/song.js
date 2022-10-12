'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Song.belongsTo(models.Album, {
        foreignKey
      })
    }
  }
  Song.init({
    userId: DataTypes.INTEGER,
    albumId: DataTypes.INTEGER,
    title: DataTypes.STRING,
    description: DataTypes.STRING,
    url: DataTypes.STRING,
    createdAt: DataTypes.DATE,
    updatedAt: DataTypes.DATE,
    previewImage: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
