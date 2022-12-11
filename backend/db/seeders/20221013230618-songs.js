'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Songs';
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
    */
      await queryInterface.bulkInsert(options, [
        {
        albumId: 1,
        userId: 4,
        title: 'Beautiful',
        description: "Snoop Dogg letting you know you're special, and other daily affirmations",
        imageUrl: 'https://onlyjamsbucket.s3.amazonaws.com/images/songImg/snoopSingle.jpg',
        url: 'url'
      },
      {
        albumId: 2,
        userId: 5,
        title: 'Just Dance',
        description: 'People Doing the Macarena, Idk Ive never left the house',
        imageUrl: "https://onlyjamsbucket.s3.amazonaws.com/images/songImg/1-just-dance.jpg",
        url: 'url'
    },
    {
      albumId: 3,
      userId: 6,
      title: 'Dirty Diana',
      description: 'A song about using soap or something, I dont know, Ive only listened to the clean version of this song',
      imageUrl: "https://onlyjamsbucket.s3.amazonaws.com/images/songImg/mjSingle.jpg",
      url: 'url'
  },
  {
    albumId: 4,
    userId: 7,
    title: 'Senorita',
    description: 'A song about seniors citizens saying "He aint know any better, hes just boy" ',
    imageUrl: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7954/7954662_so.jpg",
    url: 'url'
},
{
  albumId: 5,
  userId: 8,
  title: 'Hang On To Your Love',
  description: 'Damn girl, Im trying!',
  imageUrl: "https://onlyjamsbucket.s3.amazonaws.com/images/songImg/sadeSingle.jpg",
  url: 'url'
},


    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Songs';
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
