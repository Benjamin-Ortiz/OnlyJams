'use strict';

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
      await queryInterface.bulkInsert('Comments', [{
        userId: 4,
        songId: 2,
        body: 'This song sucks',

      },
      {
        userId: 5,
        songId: 1,
        body: 'DM me',

    },
    {
      userId: 6,
      songId: 5,
      body: 'perfect',

  },
  {
    userId: 7,
    songId: 3,
    body: 'reminds me to shower',

},
{
  userId: 8,
  songId: 4,
  body: 'reminds me of Ben',
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
     await queryInterface.bulkDelete('Comments', {
      userId: { [Op.in]: [4,5,6,7,8] }
     }, {});
  }
};
