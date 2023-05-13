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
    baku_desc: DataTypes.STRING,
    tanggal_terima: DataTypes.DATE,
    tempat_penyimpanan: DataTypes.STRING,
    type_bahan: DataTypes.STRING,
    roll_ball: DataTypes.STRING,
    quantity: DataTypes.INTEGER,
    yard: DataTypes.FLOAT,
    kg: DataTypes.FLOAT,
    is_return: DataTypes.STRING,
    jumlah_return: DataTypes.INTEGER,
    yard_return: DataTypes.FLOAT,
    kg_return: DataTypes.FLOAT,
    penerima: DataTypes.STRING,
    kurir: DataTypes.STRING,
    note: DataTypes.STRING,
    picture: DataTypes.STRING,
    faktur: DataTypes.STRING,
    list: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bahanbaku',
  });
  return bahanbaku;
};