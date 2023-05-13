'use strict';
const {
  Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
  class bank_account extends Model {
    /**
     * Helper method for defining associations.
     * This method is not a part of Sequelize lifecycle.
     * The `models/index` file will call this method automatically.
     */
    static associate(models) {
      this.belongsTo(models.user, {
        as: "Bank",
        foreignKey: "userID",
      });
    }
  }
  bank_account.init({
    userID: {
      type: DataTypes.INTEGER,
      allowNull: false,
      references: {
        model: "user",
        key: "userID"
      }
    },
    bank_code: {
      type: DataTypes.STRING
    },
    bank_name: {
        type: DataTypes.STRING
    },
    no_rek: {
        type: DataTypes.STRING
    },
    owner_name: {
        type: DataTypes.STRING
    },
  }, {
    sequelize,
    modelName: 'bank_account',
  });
  return bank_account;
};