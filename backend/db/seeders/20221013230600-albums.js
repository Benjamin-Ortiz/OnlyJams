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
        title: 'Merry Snoopys Christmas!',
        description: 'featuring Pitbull',
        imageUrl: "https://cdn.shopify.com/s/files/1/0314/3834/0227/products/snoopyrecordalbum1a_1024x1024.jpg?v=1608390779"
      },
      {
        userId: 5,
        title: 'Monster',
        description: 'fa-shun as the kids say',
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
{
  userId: 8,
  title: 'Poodietootin',
  description: 'an album by Sade and Aventura',
  imageUrl: ""
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
