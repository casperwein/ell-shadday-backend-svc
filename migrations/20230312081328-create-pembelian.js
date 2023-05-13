'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pembelians', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      po_pembelian: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      id_reorder: {
        type: Sequelize.INTEGER
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      warna: {
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
    await queryInterface.addConstraint('pembelians', {
      fields: ["kodebahan"],
      type: "foreign key",
      name: "kodebahan_pembelian_fk",
      references: {
          table: "bahans",
          field: "kodebahan"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("pembelians", "kodebahan_pembelian_fk")
    await queryInterface.removeColumn("pembelians", "kodebahan")
    await queryInterface.dropTable('pembelians');
  }
};