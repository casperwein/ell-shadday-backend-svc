'use strict';

const { hashPassword } = require("../helper/bcrypt")
const password = hashPassword("william")

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            userID: "23224",
            full_name: "william",
            username: "william",
            email: "william@gmail.com",
            password: password,
            role: "leader",
            gender: "pria",
            phone_number: 923940523,
            createdAt: new Date(),
            updatedAt: new Date()
        }], {});
    },

    async down(queryInterface, Sequelize) {
        /**
         * Add commands to revert seed here.
         *
         * Example:
         * await queryInterface.bulkDelete('People', null, {});
         */
    }
};