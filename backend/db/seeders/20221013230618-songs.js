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
      await queryInterface.bulkInsert('Songs', [
        {
        albumId: 1,
        userId: 4,
        title: 'whoopdidtty woop, poopity Snoop',
        description: 'Smoke Weed idk',
        imageUrl: 'image url',
        url: 'url'
      },
      {
        albumId: 2,
        userId: 5,
        title: 'Bad romance',
        description: 'I want your design',
        imageUrl: "image url",
        url: 'url'
    },
    {
      albumId: 3,
      userId: 6,
      title: 'Heaven can wait',
      description: 'because they dont want me yet',
      imageUrl: "image url",
      url: 'url'
  },
  {
    albumId: 4,
    userId: 7,
    title: 'Suit and Tie?',
    description: 'stupid beatbox noises',
    imageUrl: "image url",
    url: 'url'
},
{
  albumId: 5,
  userId: 8,
  title: 'Your Love is King',
  description: 'I know helen, now marry me',
  imageUrl: "image url",
  url: 'url'
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
     await queryInterface.bulkDelete('Songs', {
      userId: { [Op.in]: [4,5,6,7,8] }
     }, {});
  }
};
