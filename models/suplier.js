'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class suplier extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.hasMany(models.address, {
        as: "addresssuplier",
        foreignKey: "userID",
      })
      this.hasMany(models.bahanbaku, {
        as: "BahanBaku",
        foreignKey: "suplierId",
      })
    }
  }
  suplier.init({
    nama: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "Name is required"
          }
      }
    },
    email: {
      type: DataTypes.STRING,
      unique: {
          args: true,
          msg: "Email address already in use. Try another one!",
      },
      validate: {
          notEmpty: {
              args: true,
              msg: "Email is required"
          },
          isEmail: {
              args: true,
              msg: "email must be valid",
          },
      }
    },
    alamat: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "alamat is required"
          }
      }
    },

    telepon: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "phone number is required",
          },
          isNumeric: {
              args: true,
              msg: "Input valid Phone Number"
          }
      }
    }
  }, {
    sequelize,
    modelName: 'suplier',
  });
  return suplier;
};