'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class pembelian extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.reorder_point_log, {
        as: "id_reorder_pembelian",
        foreignKey: "id_reorder"
      });
    }
  }
  pembelian.init({
    po_pembelian: DataTypes.INTEGER,
    kodebahan: DataTypes.STRING,
    id_reorder: DataTypes.INTEGER,
    quantity: DataTypes.INTEGER,
    warna: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'pembelian',
  });
  return pembelian;
};