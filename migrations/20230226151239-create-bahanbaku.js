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
      bahan_bahu_desc: {
        type: Sequelize.STRING
      },
      tanggal_terima: {
        type: Sequelize.DATE
      },
      tempat_penyimpanan: {
        type: Sequelize.STRING
      },
      roll_ball_quantity: {
        type: Sequelize.INTEGER
      },
      kg_yard_meter_quantity: {
        type: Sequelize.INTEGER
      },
      is_return: {
        type: Sequelize.STRING
      },
      roll_ball_return: {
        type: Sequelize.INTEGER
      },
      yard_kg_meter_return: {
        type: Sequelize.FLOAT
      },
      penerima: {
        type: Sequelize.STRING
      },
      kurir: {
        type: Sequelize.STRING
      },
      harga_satuan: {
        type: Sequelize.FLOAT
      },
      total_harga: {
        type: Sequelize.FLOAT
      },
      gambar: {
        type: Sequelize.STRING
      },
      faktur: {
        type: Sequelize.STRING
      },
      list: {
        type: Sequelize.STRING
      },
      list_return: {
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