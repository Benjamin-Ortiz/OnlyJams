'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class Album extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      // define association here
      Album.belongsTo(models.User, {
        foreignKey: 'userId'
      }),
      Album.hasMany(models.Song,{
        foreignKey: 'albumId',
        onDelete:'cascade'
      })
    }
  }
  Album.init({
    userId: {
      type: DataTypes.INTEGER,
      allowNull:false,
      // references: {
      //   model: 'Users',
      //   key: 'id'
      // }

    },
    title: {
      type: DataTypes.STRING
    },
    description: {
      type: DataTypes.STRING
    },
    imageUrl: {
      type: DataTypes.STRING,
      allowNull:true
    }
  }, {
    sequelize,
    modelName: 'Album',
  });
  return Album;
};
