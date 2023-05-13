'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('bank_accounts', {
      id: {
        allowNull: false,
        autoIncrement: true,
        primaryKey: true,
        type: Sequelize.INTEGER
      },
      userID: {
        type: Sequelize.INTEGER
      },
      bank_code: {
        type: Sequelize.STRING
      },
      bank_name: {
        type: Sequelize.STRING
      },
      no_rek: {
          type: Sequelize.STRING
      },
      owner_name: {
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
    await queryInterface.addConstraint('bank_accounts', {
      fields: ["userID"],
      type: "foreign key",
      name: "user_fk",
      references: {
          table: "users",
          field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("bank_accounts", "user_fk")
    await queryInterface.removeColumn("bank_accounts", "userID")
    await queryInterface.dropTable('bank_accounts');
  }
};