'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
const bcrypt = require("bcryptjs");

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Users';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert(options, [{
        firstName: 'Calvin',
        username : 'Snoop Dogg',
        lastName: 'Broadus',
        email: 'theDoggFather@gmail.com',
        hashedPassword: bcrypt.hashSync('woof123')
      },
      {
        firstName: 'Stephanie',
      username : 'Lady Gaga',
      lastName: 'iForgot',
      email: 'gaga@gmail.com',
      hashedPassword: bcrypt.hashSync('notGoodRomance')
    },
    {
      firstName: 'Micheal',
      username : 'Micheal Jackson',
      lastName: 'Jackson',
      email: 'TheKing@gmail.com',
      hashedPassword: bcrypt.hashSync('H33H33')
    },
    {
    firstName: 'Justin',
    username : 'Justin Timberlake',
    lastName: 'Timberlake',
    email: 'fckNsync@gmail.com',
    hashedPassword: bcrypt.hashSync('itsMay')
    },
    {
      firstName: 'Helen',
      username : 'Sade',
      lastName: 'Adu',
      email: 'sade@gmail.com',
      hashedPassword: bcrypt.hashSync('1stTime')
      },

    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Users';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, {
      username: { [Op.in]: ['Snoop Dogg',
      'Lady Gaga',
      'Micheal Jackson',
      'Justin Timberlake',
      'Sade'] }
     }, {});
  }
};
