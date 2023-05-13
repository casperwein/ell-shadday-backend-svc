'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pemakaian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.produk, {
        as: "po_produksi_pemakaian",
        foreignKey: "po_produk"
      });
      this.belongsTo(models.user, {
        as: "cutter_pemakaian",
        foreignKey: "cutterId"
      });
      this.belongsTo(models.bahan, {
        as: "bahan_pemakaian",
        foreignKey: "kodebahan"
    })
    }
  }
  pemakaian.init({
    po_produk: DataTypes.INTEGER,
    kodebahan: DataTypes.STRING,
    cutterId: DataTypes.INTEGER,
    ukuran: DataTypes.STRING,
    panjang_berat: DataTypes.FLOAT,
    jumlah_gambar: DataTypes.FLOAT,
    jumlah_lembar: DataTypes.FLOAT,
    yard_kg: DataTypes.STRING,
    total_yard_kg: DataTypes.FLOAT,
    yard_kg_pemakaian: DataTypes.FLOAT,
    jumlah_roll_ball: DataTypes.INTEGER,
    total_potongan_pakaian: DataTypes.INTEGER,
    sisa_flag: DataTypes.STRING,
    total_yard_kg_sisa: DataTypes.FLOAT,
    lusin: DataTypes.FLOAT,
    tanggal_pemakaian: DataTypes.DATE,
  }, {
    sequelize,
    modelName: 'pemakaian',
  });
  return pemakaian;
};