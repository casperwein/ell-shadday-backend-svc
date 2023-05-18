'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bahanbaku extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.bahan, {
        as: "bahanbaku",
        foreignKey: "kodebahan"
    });
    }
  }
  bahanbaku.init({
    suplierId: DataTypes.STRING,
    warna: DataTypes.STRING,
    kodebahan: DataTypes.STRING,
    bahan_bahu_desc: DataTypes.STRING,
    tanggal_terima: DataTypes.DATE,
    tempat_penyimpanan: DataTypes.STRING,
    roll_ball_quantity: DataTypes.INTEGER,
    kg_yard_meter_quantity: DataTypes.FLOAT,
    is_return: DataTypes.STRING,
    roll_ball_return: DataTypes.INTEGER,
    yard_kg_meter_return: DataTypes.FLOAT,
    penerima: DataTypes.STRING,
    kurir: DataTypes.STRING,
    note: DataTypes.STRING,
    gambar: DataTypes.STRING,
    faktur: DataTypes.STRING,
    list: DataTypes.STRING,
    list_return: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bahanbaku',
  });
  return bahanbaku;
};