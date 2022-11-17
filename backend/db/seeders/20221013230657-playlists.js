'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
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

        userId: 4,
        name: 'get High and Cry',

        imageUrl: "image url"
      },
      {

        userId: 5,
        name: 'stupid outfit songs',

        imageUrl: "image url"
    },
    {

      userId: 6,
      name: 'Goat Songs',

      imageUrl: "image url"
  },
  {

    userId: 7,
    name: 'F Backstreet Boys',

    imageUrl: "image url"
},
{
  userId: 8,
  name: 'Songs to make love to Ben to',

  imageUrl: "image url"
},


    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Playlists';
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
     await queryInterface.bulkDelete(options, {
      userId: { [Op.in]: [4,5,6,7,8] }
     }, {});
  }
};
