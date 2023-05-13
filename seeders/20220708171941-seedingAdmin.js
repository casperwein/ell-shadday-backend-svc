'use strict';

const { hashPassword } = require("../helper/bcrypt")
const password = hashPassword("diana")

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            userID: "23494",
            full_name: "diana",
            username: "diana",
            email: "diana@gmail.com",
            password: password,
            role: "admin",
            gender: "wanita",
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