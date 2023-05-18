'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bahan extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.bahanbaku, {
        as: "bahanbaku",
        foreignKey: "kodebahan",
      });
      this.hasMany(models.produk, {
        as: "bahanbaku_produksi",
        foreignKey: "kodebahan",
      })
      this.hasMany(models.pemakaian, {
        as: "bahan_pemakaian",
        foreignKey: "kodebahan",
      })
      this.hasMany(models.reorder_point_log, {
        as: "kodebahan_reorder",
        foreignKey: "kodebahan"
      })
    }
  }
  bahan.init({
    kodebahan: DataTypes.STRING,
    nama: DataTypes.STRING,
    warna: DataTypes.STRING,
    gambar: DataTypes.STRING,
    roll_ball_quantity: DataTypes.INTEGER,
    total_yard_kg: DataTypes.FLOAT,
    yard_kg_clean: DataTypes.FLOAT,
    yard_kg_sisa: DataTypes.FLOAT,
    satuan: DataTypes.STRING,
    ukuran: DataTypes.STRING,
    kategori: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'bahan',
  });
  return bahan;
};