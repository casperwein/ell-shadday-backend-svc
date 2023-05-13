'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class produk extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.pemakaian, {
        as: "po_produksi_pemakaian",
        foreignKey: "po_produk",
    });
      this.belongsTo(models.user, {
        as: "cmt",
        foreignKey: "cmt_id"
      });
      this.belongsTo(models.user, {
        as: "cutter",
        foreignKey: "cutter_id"
      });
      this.belongsTo(models.bahan, {
        as: "bahanbaku_produksi",
        foreignKey: "kodebahan"
    });
    }
  }
  produk.init({
    po: DataTypes.INTEGER,
    nama_produk: DataTypes.STRING,
    kodebahan: DataTypes.STRING,
    attributes: DataTypes.STRING,
    cutter_id: DataTypes.INTEGER,
    cmt_id: DataTypes.INTEGER,
    entity: DataTypes.FLOAT,
    proggress: DataTypes.STRING,
    gambar: DataTypes.STRING,
    tanggal_produksi: DataTypes.DATE
  }, {
    sequelize,
    modelName: 'produk',
  });
  return produk;
};