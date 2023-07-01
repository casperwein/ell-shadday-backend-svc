'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('reorder_point_logs', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      quantity: {
        type: Sequelize.INTEGER
      },
      warna: {
        type: Sequelize.STRING
      },
      tanggal_reorder_point: {
        type: Sequelize.DATE
      },
      status: {
        type: Sequelize.STRING
      },
      revisiDesc: {
        type: Sequelize.STRING
      },
      supplier: {
        type: Sequelize.STRING
      },
      lastUser: {
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
    await queryInterface.addConstraint('reorder_point_logs', {
      fields: ["kodebahan"],
      type: "foreign key",
      name: "kodebahan_reorder_fk",
      references: {
          table: "bahans",
          field: "kodebahan"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("reorder_point_logs", "kodebahan_reorder_fk");
    await queryInterface.removeColumn("reorder_point_logs", "kodebahan");
    await queryInterface.dropTable('reorder_point_logs');
  }
};