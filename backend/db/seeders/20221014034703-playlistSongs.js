"use strict";

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
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
      "PlaylistSongs",
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
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
    await queryInterface.bulkDelete(
      "PlaylistSongs",
      {
        songId: { [Op.in]: [1, 2, 3, 4, 5] },
      },
      {}
    );
  },
};
