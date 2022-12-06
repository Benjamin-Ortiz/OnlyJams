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
        description: "Snoop Dogg letting you know you're special",
        imageUrl: 'https://upload.wikimedia.org/wikipedia/en/thumb/4/46/Snoop_Dogg_-_Beautiful.jpg/220px-Snoop_Dogg_-_Beautiful.jpg',
        url: 'url'
      },
      {
        albumId: 2,
        userId: 5,
        title: 'Bad romance',
        description: 'I want your design',
        imageUrl: "https://upload.wikimedia.org/wikipedia/en/c/cc/Lady_Gaga_-_Bad_Romance.png",
        url: 'url'
    },
    {
      albumId: 3,
      userId: 6,
      title: 'Heaven can wait',
      description: 'because they dont want me yet',
      imageUrl: "https://upload.wikimedia.org/wikipedia/en/9/98/Mjinvincible.jpg",
      url: 'url'
  },
  {
    albumId: 4,
    userId: 7,
    title: 'Suit and Tie?',
    description: 'stupid beatbox noises',
    imageUrl: "https://pisces.bbystatic.com/image2/BestBuy_US/images/products/7954/7954662_so.jpg",
    url: 'url'
},
{
  albumId: 5,
  userId: 8,
  title: 'Your Love is King',
  description: 'Scientifically a perfect song',
  imageUrl: "https://i.discogs.com/Zm8oEb3Vq0bkBeqfKPS0myDhZ5X3zPpGXwPj0cT0Y0A/rs:fit/g:sm/q:90/h:600/w:587/czM6Ly9kaXNjb2dz/LWRhdGFiYXNlLWlt/YWdlcy9SLTM0NDk0/NzctMTMzMDgxNTA0/NC5qcGVn.jpeg",
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
