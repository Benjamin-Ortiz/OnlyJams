'use strict';
const bcrypt = require("bcryptjs");

let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}

//const albumImg = require('../../../assests/images/albumImg')
//?use real url for photos

/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up (queryInterface, Sequelize) {
    options.tableName = 'Albums';
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
        title: 'Rhythm & Gangsta',
        description: 'Millenial Sunday cleaning music',
        imageUrl: "https://en.wikipedia.org/wiki/R%26G_%28Rhythm_%26_Gangsta%29:_The_Masterpiece#/media/File:R_and_G_(Rhythm_and_Gangsta)_The_Masterpiece_(Snoop_Dog_album)_coverart.jpg"
      },
      {
        userId: 5,
        title: 'Monster',
        description: 'rawr amirite?',
        imageUrl: "https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcRva23iJHLD4q1iJXcf0E9uvf5uyzJL3Bo_E5NMTO-mpQT2hcoonxPQSisHDsvquk242vc&usqp=CAU"
    },
    {
      userId: 6,
      title: 'Invincible',
      description: 'This title did not age well',
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg"
  },
  {
    userId: 7,
    title: 'Future/Sex/LoveSounds',
    description: 'the uncool little brother of album titles',
    imageUrl: "https://upload.wikimedia.org/wikipedia/en/1/16/Justin_Timberlake_-_FutureSex_LoveSounds.png"
},
{
  userId: 8,
  title: 'Love Deluxe',
  description: 'Her love is Queen',
  imageUrl: "https://media.pitchfork.com/photos/5929c366eb335119a49ed6d3/1:1/w_600/d74062df.jpg"
},


    ], {});
  },

  async down (queryInterface, Sequelize) {
    options.tableName = 'Albums';
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
