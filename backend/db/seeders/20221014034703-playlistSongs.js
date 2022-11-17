"use strict";
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    options.tableName = "PlaylistSongs";
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */
    await queryInterface.bulkInsert(
      options,
      [
        {
          playlistId: 1,
          songId: 1,
        },
        {
          playlistId: 2,
          songId: 2,
        },
        {
          playlistId: 3,
          songId: 3,
        },
        {
          playlistId: 4,
          songId: 4,
        },
        {
          playlistId: 5,
          songId: 5,
        },
      ],
      {}
    );
  },

  async down(queryInterface, Sequelize) {
    options.tableName = "PlaylistSongs";
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      options,
      {
        songId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
