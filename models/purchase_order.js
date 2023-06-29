'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class purchase_order extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.reorder_point_log, {
        as: "id_reorder_pembelian",
        foreignKey: "id_rop"
      });
    }
  }
  purchase_order.init({
    po: DataTypes.INTEGER,
    id_rop: DataTypes.STRING,
    json_data: DataTypes.STRING,
  }, {
    sequelize,
    modelName: 'purchase_order',
  });
  return purchase_order;
};