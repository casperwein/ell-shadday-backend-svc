'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('addresses', {
      id: {
        allowNull: false,
        autoIncrement: true,
        type: Sequelize.INTEGER,
        primaryKey: true,
      },
      userID: {
        type: Sequelize.INTEGER,
      },
      jalan: {
        type: Sequelize.STRING
      },
      no_rumah: {
          type: Sequelize.STRING
      },
      rt_rw: {
          type: Sequelize.STRING
      },
      kelurahan: {
          type: Sequelize.STRING
      },
      kecamatan: {
          type: Sequelize.STRING
      },
      kota: {
          type: Sequelize.STRING
      },
      provinsi: {
          type: Sequelize.STRING
      },
      negara: {
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

    await queryInterface.addConstraint('addresses', {
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
    await queryInterface.removeConstraint("addresses", "user_fk")
    await queryInterface.removeColumn("addresses", "userID")
    await queryInterface.dropTable('addresses');
  }
};