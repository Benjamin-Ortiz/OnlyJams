'use strict';
let options = {};
if (process.env.NODE_ENV === 'production') {
  options.schema = process.env.SCHEMA;  // define your schema in options object
}
/** @type {import('sequelize-cli').Migration} */
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('Songs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      albumId: {
        type: Sequelize.INTEGER,
        allowNull: true,
          references: {
            model: 'Albums',
            key: 'id'
          },
          onDelete: 'cascade'
    },
      userId: {
        type: Sequelize.INTEGER,
        allowNull: false,
          references: {
            model: 'Users',
            key: 'id'
          }
    },
      title: {
        type: Sequelize.STRING,
      allowNull: false
      },
      description: {
        type: Sequelize.STRING
      },
      url: {
        type: Sequelize.URL
      },
      imageUrl: {
        type: Sequelize.STRING,
        allowNull: true
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE,
        defaultValue: Sequelize.literal('CURRENT_TIMESTAMP')
      }
    },options);
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('Songs',options);
  }
};
