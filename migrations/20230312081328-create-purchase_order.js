'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('purchase_orders', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER
      },
      po: {
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      id_rop: {
        type: Sequelize.INTEGER
      },
      json_data: {
        type: Sequelize.STRING(1000)
      },
      path: {
        type: Sequelize.STRING(1000)
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
    // await queryInterface.addConstraint('purchase_orders', {
    //   fields: ["kodebahan"],
    //   type: "foreign key",
    //   name: "kodebahan_purchase_order_fk",
    //   references: {
    //     table: "bahans",
    //     field: "kodebahan"
    //   },
    //   onDelete: "cascade",
    //   onUpdate: "cascade"
    // });
  },
  async down(queryInterface, Sequelize) {
    // await queryInterface.removeConstraint("purchase_orders", "kodebahan_purchase_order_fk")
    // await queryInterface.removeColumn("purchase_orders", "kodebahan")
    await queryInterface.dropTable('purchase_orders');
  }
};