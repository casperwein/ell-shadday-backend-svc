'use strict';

const { hashPassword } = require("../helper/bcrypt")
const password = hashPassword("juviana")

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            userID: "23434",
            full_name: "juviana",
            username: "juviana",
            email: "juviana@gmail.com",
            password: password,
            role: "superadmin",
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