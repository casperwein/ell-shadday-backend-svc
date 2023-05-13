'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bahansisas', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      warna: {
        type: Sequelize.STRING
      },
      kodepemakaian: {
        type: Sequelize.STRING
      },
      cutter_id: {
        type: Sequelize.INTEGER
      },
      tanggal_pemakaian: {
        type: Sequelize.DATE
      },
      yard_kg_sisa: {
        type: Sequelize.FLOAT
      },
      keterangan: {
        type: Sequelize.STRING
      },
      createdAt: {
        allowNull: false,
        type: Sequelize.DATE
      },
      updatedAt: {
        allowNull: false,
        type: Sequelize.DATE
      }
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.dropTable('bahansisas');
  }
};