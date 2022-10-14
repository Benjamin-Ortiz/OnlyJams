'use strict';
const bcrypt = require("bcryptjs");
//const albumImg = require('../../../assests/images/albumImg')
//?use real url for photos

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert('Albums', [{
        userId: 4,
        title: 'Doggy Style',
        description: 'karma sutra recodings',
        imageUrl: "image url"
      },
      {
        userId: 5,
        title: 'Monster',
        description: 'rawr amirite?',
        imageUrl: "image url"
    },
    {
      userId: 6,
      title: 'Invincible',
      description: 'This title did not age well, just like MJ himself',
      imageUrl: "image url"
  },
  {
    userId: 7,
    title: 'Future/Sex/LoveSounds',
    description: 'Like Love Death Robots but worse',
    imageUrl: "image url"
},
{
  userId: 8,
  title: 'Love Deluxe',
  description: 'whatever helen, marry me',
  imageUrl: "image url"
},


    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete('Albums', {
      userId: { [Op.in]: [4,5,6,7,8] }
     }, {});
  }
};
