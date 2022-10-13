'use strict';
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  up: async (queryInterface, Sequelize) => {
    return queryInterface.bulkInsert('Users', [
      {
        firstName : 'f',
        lastName: 'd',
        email: null,
        username: 'Demo-lition-fake',
        hashedPassword: bcrypt.hashSync('password')
      },

    ], {}); //* empty opject is to add
  },

  down: async (queryInterface, Sequelize) => {
    const Op = Sequelize.Op;
    return queryInterface.bulkDelete('Users', {
      username: { [Op.in]: ['Demo-lition-fake'] }
    }, {});
  }
};
