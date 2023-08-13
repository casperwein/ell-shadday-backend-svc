'use strict';

const { hashPassword } = require("../helper/bcrypt")
const password = hashPassword("william")

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            id: "231002",
            full_name: "william",
            username: "william",
            email: "william@gmail.com",
            password: password,
            role: "pimpinan",
            gender: "pria",
            phone_number: "+6281235832239",
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