'use strict';
module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.createTable('users', {
            id: {
                primaryKey: true,
                type: Sequelize.INTEGER
            },
            // userID: {
            //     type: Sequelize.INTEGER,
            // },
            full_name: {
                type: Sequelize.STRING
            },
            username: {
                type: Sequelize.STRING,
            },
            email: {
                type: Sequelize.STRING
            },
            password: {
                type: Sequelize.STRING
            },
            place_dob: {
                type: Sequelize.STRING
            },
            dob: {
                type: Sequelize.DATE
            },
            gender: {
                type: Sequelize.STRING
            },
            role: {
                type: Sequelize.STRING
            },
            status: {
                type: Sequelize.STRING
            },
            gambar: {
                type: Sequelize.STRING
            },
            phone_number: {
                type: Sequelize.STRING
            },
            createdAt: {
                allowNull: false,
                type: Sequelize.DATE
            },
            updatedAt: {
                allowNull: false,
                type: Sequelize.DATE
            }
        });
    },
    async down(queryInterface, Sequelize) {
        await queryInterface.dropTable('users');
    }
};