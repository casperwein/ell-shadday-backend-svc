'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bahans', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      kodebahan: {
        type: Sequelize.STRING,
        primaryKey: true,
      },
      nama: {
        type: Sequelize.STRING
      },
      warna: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      roll_ball_quantity: {
        type: Sequelize.INTEGER
      },
      total_yard_kg: {
        type: Sequelize.FLOAT,
      },
      yard_kg_clean: {
        type: Sequelize.FLOAT,
      },
      yard_kg_sisa: {
        type: Sequelize.FLOAT,
      },
      satuan: {
        type: Sequelize.STRING
      },
      ukuran: {
        type: Sequelize.STRING
      },
      kategori: {
        type: Sequelize.STRING
      },
      safety_stock: {
        type: Sequelize.INTEGER
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
    await queryInterface.dropTable('bahans');
  }
};