'use strict';
const {
    Model
} = require('sequelize');
module.exports = (sequelize, DataTypes) => {
    class user extends Model {
        /**
         * Helper method for defining associations.
         * This method is not a part of Sequelize lifecycle.
         * The `models/index` file will call this method automatically.
         */
        static associate(models) {
            this.hasMany(models.bank_account, {
                as: "bank",
                foreignKey: "userID",
            }),
            this.hasMany(models.address, {
                as: "address",
                foreignKey: "userID",
            }),
            this.hasMany(models.produk, {
                as: "cutter",
                foreignKey: "cutter_id",
            });
            this.hasMany(models.produk, {
                as: "cmt",
                foreignKey: "cmt_id",
            });
            this.hasMany(models.pemakaian, {
                as: "cutter_pemakaian",
                foreignKey: "cutterId",
            });
        }
    }
     //* user id 
     //userID: {
        //     type: DataTypes.INTEGER,
        //     unique: {
        //         args: true,
        //         msg: "userID duplicated"
        //     },
        //     validate: {
        //         notEmpty: {
        //             args: true,
        //         }
        //     }
        // },
    user.init({
        full_name: {
            type: DataTypes.STRING,
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Full Name is required"
                }
            }
        },
        username: {
            type: DataTypes.STRING,
            unique: {
                args: true,
                msg: "Username address already in use. Try another one!",
            },
            validate: {
                notEmpty: {
                    args: true,
                    msg: "Username is required"
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
        password: {
            type: DataTypes.STRING,
            validate: {
                len: {
                    args: [6, 100],
                    msg: "The password length should be between 6 and 100 characters.",
                },
                notEmpty: {
                    args: true,
                    msg: "Password is required",
                },
            },
        },
        gender: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [
                        "Male", "Female"
                    ],
                    msg: "gender must be Male or Female",
                }
            },
        },
        place_dob: {
            type: DataTypes.DATE,
        },
        role: {
            type: DataTypes.STRING,
            validate: {
                isIn: {
                    args: [
                        ["Admin", "Superadmin", "Pimpinan", "CMT", "Designer"]
                    ],
                    msg: "role must be Admin, Superadmin, Pimpinan, CMT, Designer",
                },
            },
        },
        dob: {
            type: DataTypes.STRING,
        },
        phone_number: {
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
        },
        status: DataTypes.STRING,
        gambar: DataTypes.STRING,
    }, {
        sequelize,
        modelName: 'user',
    });
    return user;
};