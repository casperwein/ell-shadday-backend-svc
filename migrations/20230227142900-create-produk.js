'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('produks', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      po: {
        type: Sequelize.INTEGER,
        primaryKey: true
      },
      nama_produk: {
        type: Sequelize.STRING
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      attributes: {
        type: Sequelize.STRING
      },
      cutter_id: {
        type: Sequelize.INTEGER
      },
      cmt_id: {
        type: Sequelize.INTEGER
      },
      entity: {
        type: Sequelize.FLOAT
      },
      proggress: {
        type: Sequelize.STRING
      },
      gambar: {
        type: Sequelize.STRING
      },
      tanggal_produksi: {
        type: Sequelize.DATE
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
    await queryInterface.addConstraint('produks', {
      fields: ["kodebahan"],
      type: "foreign key",
      name: "bahan_produksi_fk",
      references: {
          table: "bahans",
          field: "kodebahan"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint('produks', {
      fields: ["cutter_id"],
      type: "foreign key",
      name: "cutter_fk",
      references: {
          table: "users",
          field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint('produks', {
      fields: ["cmt_id"],
      type: "foreign key",
      name: "cmt_fk",
      references: {
          table: "users",
          field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("produks", "cmt_fk")
    await queryInterface.removeColumn("produks", ["cmt_id"])
    await queryInterface.removeConstraint("produks", "cutter_fk")
    await queryInterface.removeColumn("produks", ["cutter_id"])
    await queryInterface.removeConstraint("produks", "bahan_produksi_fk")
    await queryInterface.removeColumn("produks", "kodebahan")
    await queryInterface.dropTable('produks');
  }
};