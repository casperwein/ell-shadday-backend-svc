'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bahanbakus', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      suplierId: {
        type: Sequelize.STRING
      },
      warna: {
        type: Sequelize.STRING
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      baku_desc: {
        type: Sequelize.STRING
      },
      tanggal_terima: {
        type: Sequelize.DATE
      },
      tempat_penyimpanan: {
        type: Sequelize.STRING
      },
      type_bahan: {
        type: Sequelize.STRING
      },
      roll_ball: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      yard: {
        type: Sequelize.FLOAT
      },
      kg: {
        type: Sequelize.FLOAT
      },
      is_return: {
        type: Sequelize.STRING
      },
      jumlah_return: {
        type: Sequelize.INTEGER
      },
      yard_return: {
        type: Sequelize.FLOAT
      },
      kg_return: {
        type: Sequelize.FLOAT
      },
      penerima: {
        type: Sequelize.STRING
      },
      kurir: {
        type: Sequelize.STRING
      },
      note: {
        type: Sequelize.STRING
      },
      picture: {
        type: Sequelize.STRING
      },
      faktur: {
        type: Sequelize.STRING
      },
      list: {
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
    await queryInterface.addConstraint('bahanbakus', {
      fields: ["kodebahan"],
      type: "foreign key",
      name: "bahan_fk",
      references: {
          table: "bahans",
          field: "kodebahan"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("bahanbakus", "bahan_fk")
    await queryInterface.removeColumn("bahanbakus", "kodebahan")
    await queryInterface.dropTable('bahanbakus');
  }
};