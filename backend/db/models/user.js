'use strict';
const bcrypt = require("bcryptjs");
const {Model, Validator} = require('sequelize');
const jwt = require("jsonwebtoken");

module.exports = (sequelize, DataTypes) => {
  class User extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
     toSafeObject() {
      const { id, username, email, firstName, lastName } = this;
      //* context will be the User instance
      return { id, firstName, lastName, email, username };
    }

    validatePassword(password) {
      return bcrypt.compareSync(password,
        this.hashedPassword.toString());
    }

    static getCurrentUserById(id) {
      return User.scope("currentUser").findByPk(id);
    }

    static async login({ credential, password }) {
      const { Op } = require('sequelize');
      const user = await User.scope('loginUser').findOne({
        where: {
          [Op.or]: {
            username: credential,
            email: credential
          }
        }
      });
      if (user && user.validatePassword(password)) {
        return await User.scope('currentUser').findByPk(user.id);
      }
    }

    static async signup({ username, email, password, firstName, lastName }) {
      const hashedPassword = bcrypt.hashSync(password);

      const user = await User.create({
        username,
        firstName,
        lastName,
        email,
        hashedPassword
      });
      return await User.scope('currentUser').findByPk(user.id);

     }

    static associate(models) {
      // define association here
      User.hasMany(models.Album, {
        foreignKey: 'userId',
        onDelete: 'cascade'
      }),
      User.hasMany(models.Song, {
        foreignKey: 'userId',
        onDelete: 'cascade'

      }),
      User.hasMany(models.Comment, {
        foreignKey: 'userId',
        onDelete: 'cascade'

      }),
      User.hasMany(models.Playlist, {
        foreignKey: 'userId',
        onDelete: 'cascade'
      })
    }
  }
  User.init({
    username: {
      type: DataTypes.STRING(30),
      allowNull: false,
      unique: true,
      validate: {
        len: [4, 30],
        isNotEmail(val) {
          if (Validator.isEmail(val)) {
            throw new Error("Cannot be an email.");
          }
        },
      },
    },
    firstName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        len: [2, 30],
      }
    },
    lastName: {
      type: DataTypes.STRING,
      allowNull: false,
      validate: {
        // isAlpha: true,
        len: [2, 30],
      }
    },
    hashedPassword: {
      type: DataTypes.STRING.BINARY,
      allowNull: false,
      validate: {
        len: [60, 60],
      },
    },
    email: {
      type: DataTypes.STRING,
      allowNull: false,
      unique: true,
      validate: {
        len: [7,50]
      }
    },
    imageUrl: {
      type: DataTypes.STRING
    }
  }, {
    sequelize,
    modelName: 'User',
    defaultScope:{
      attributes: {
        exclude: ["hashedPassword", "email", "createdAt", "updatedAt"]
      }
    },

    scopes: {
      currentUser: {
        attributes: { exclude: ["hashedPassword", "createdAt", "updatedAt", 'imageUrl'] },
      },
      loginUser: {
        attributes: {},
      },
    },
  });
  return User;
};
