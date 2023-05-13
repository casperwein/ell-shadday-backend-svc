'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bahansisa extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {

    }
  }
  bahansisa.init({
    kodebahan: DataTypes.STRING,
    warna: DataTypes.STRING,
    kodepemakaian: DataTypes.STRING,
    cutter_id: DataTypes.INTEGER,
    tanggal_pemakaian: DataTypes.DATE,
    yard_kg_sisa: DataTypes.FLOAT,
    keterangan: DataTypes.STRING
  }, {
    sequelize,
    modelName: 'bahansisa',
  });
  return bahansisa;
};