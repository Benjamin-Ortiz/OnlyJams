'use strict';

const bcrypt = require("bcryptjs");
const {Model, Validator} = require('sequelize');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class Song extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */

    static async getAllSongs(){
      return await Song.findAll()
    }

    static associate(models) {
      // define association here
      Song.belongsTo(models.User, {
        foreignKey: 'userId',
        // as:"Artist"
      }),
      Song.belongsTo(models.Album, {
        foreignKey: 'albumId',
        onDelete: 'cascade'
      }),
      Song.hasMany(models.Comment,{
        foreignKey: 'songId',
        onDelete: 'cascade'
      }),
      Song.belongsToMany(models.Playlist,{
        through: models.PlaylistSong,
        foreignKey: 'songId'
      })
    }
  }
  Song.init({
    albumId: {
      type: DataTypes.INTEGER,
      allowNull:true,

  },
    userId: {
      type: DataTypes.INTEGER,
      allowNull: false
  },
    title: {
      type: DataTypes.STRING,
      allowNull: false

  },
    description: {
      type: DataTypes.STRING,

  },
    url: {
      type: DataTypes.STRING
  },
    imageUrl: {
      type: DataTypes.STRING
  }
  }, {
    sequelize,
    modelName: 'Song',
  });
  return Song;
};
