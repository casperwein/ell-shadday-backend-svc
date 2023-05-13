'use strict';
module.exports = {
  async up(queryInterface, Sequelize) {
    await queryInterface.createTable('pemakaians', {
      id: {
        allowNull: false,
        primaryKey: true,
        type: Sequelize.STRING
      },
      po_produk: {
        type: Sequelize.INTEGER,
      },
      kodebahan: {
        type: Sequelize.STRING
      },
      cutterId: {
        type: Sequelize.INTEGER
      },
      ukuran: {
        type: Sequelize.STRING
      },
      panjang_berat: {
        type: Sequelize.FLOAT
      },
      jumlah_gambar: {
        type: Sequelize.FLOAT
      },
      jumlah_lembar: {
        type: Sequelize.FLOAT
      },
      yard_kg: {
        type: Sequelize.STRING
      },
      total_yard_kg: {
        type: Sequelize.FLOAT
      },
      yard_kg_pemakaian: {
        type: Sequelize.FLOAT
      },
      jumlah_roll_ball: {
        type: Sequelize.INTEGER
      },
      sisa_flag: {
        type: Sequelize.STRING
      },
      total_potongan_pakaian: {
        type: Sequelize.INTEGER
      },
      total_yard_kg_sisa: {
        type: Sequelize.FLOAT
      },
      lusin: {
        type: Sequelize.FLOAT
      },
      tanggal_pemakaian: {
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
    await queryInterface.addConstraint('pemakaians', {
      fields: ["po_produk"],
      type: "foreign key",
      name: "produksi_po_fk",
      references: {
          table: "produks",
          field: "po"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
    await queryInterface.addConstraint('pemakaians', {
      fields: ["kodebahan"],
      type: "foreign key",
      name: "bahan_pemakaian_fk",
      references: {
          table: "bahans",
          field: "kodebahan"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    });
    await queryInterface.addConstraint('pemakaians', {
      fields: ["cutterId"],
      type: "foreign key",
      name: "cutter_pemakaian_fk",
      references: {
          table: "users",
          field: "id"
      },
      onDelete: "cascade",
      onUpdate: "cascade"
    })
  },
  async down(queryInterface, Sequelize) {
    await queryInterface.removeConstraint("pemakaians", "cutter_pemakaian_fk")
    await queryInterface.removeColumn("pemakaians", "cutterId")
    await queryInterface.removeConstraint("pemakaians", "produksi_po_fk")
    await queryInterface.removeColumn("pemakaians", "po_produk")
    await queryInterface.removeConstraint("pemakaians", "bahan_pemakaian_fk")
    await queryInterface.removeColumn("pemakaians", "kodebahan")
    await queryInterface.dropTable('pemakaians');
  }
};