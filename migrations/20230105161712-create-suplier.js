'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('supliers', {
      id: {
        allowNull: false,
        type: Sequelize.INTEGER,
        primaryKey: true,
        autoIncrement: true
      },
      nama: {
        type: Sequelize.STRING,
      },
      email: {
        type: Sequelize.STRING
      },
      telepon: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      alamat: {
        type: Sequelize.STRING
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('supliers');
  }
};