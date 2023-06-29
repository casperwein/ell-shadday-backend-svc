'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class reorder_point_log extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.purchase_order, {
        as: "id_reorder_pembelian",
        foreignKey: "id_rop"
      })
      this.belongsTo(models.bahan, {
        as: "kodebahan_reorder",
        foreignKey: "kodebahan"
      });
    }
  }
  reorder_point_log.init({
    kodebahan: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    warna: DataTypes.STRING,
    tanggal_reorder_point: DataTypes.DATE,
    status: DataTypes.STRING,
    revisiDesc: DataTypes.STRING,
    lastUser: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'reorder_point_log',
  });
  return reorder_point_log;
};