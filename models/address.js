'use strict';
const {
  Model
} = require('sequelize');
const user = require('./user');
module.exports = (sequelize, DataTypes) => {
  class address extends Model {
    static associate(models) {
        this.belongsTo(models.user, {
            as: "address",
            foreignKey: "userID"
        });
    }
  }
  address.init({
    userID: {
        type: DataTypes.INTEGER,
        validate: {
            notEmpty: {
                args: true,
                msg: "UserID is required"
            }
        },
    },
    jalan: {
      type: DataTypes.STRING,
      validate: {
          notEmpty: {
              args: true,
              msg: "Jalan is required"
          }
      },
      references: {
        model: "user",
        key: "userID"
      }
      
    },
    no_rumah: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "Home Number is required"
            }
        }
    },
    rt_rw: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "RT/RW is required"
            }
        }
    },
    kelurahan: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "kelurahan is required"
            }
        }
    },
    kecamatan: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "kecamatan is required"
            }
        }
    },
    kota: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "kota is required"
            }
        }
    },
    provinsi: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "provinsi is required"
            }
        }
    },
    negara: {
        type: DataTypes.STRING,
        validate: {
            notEmpty: {
                args: true,
                msg: "Address is required"
            }
        }
    },
  }, {
    sequelize,
    modelName: 'address',
  });
  return address;
};