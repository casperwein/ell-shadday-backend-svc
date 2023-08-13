'use strict';

const { hashPassword } = require("../helper/bcrypt")
const password = hashPassword("diana")
const passwordiwan = hashPassword("iwan")

module.exports = {
    async up(queryInterface, Sequelize) {
        await queryInterface.bulkInsert('users', [{
            id: "232002",
            full_name: "diana",
            username: "diana",
            email: "diana@gmail.com",
            password: password,
            role: "admin",
            gender: "wanita",
            phone_number: "+6281235832239",
            createdAt: new Date(),
            updatedAt: new Date()
        },{
            
            id: "232003",
            full_name: "iwan",
            username: "iwan",
            email: "iwan@gmail.com",
            password: passwordiwan,
            role: "cutter",
            gender: "pria",
            phone_number: "+6281235832239",
            createdAt: new Date(),
            updatedAt: new Date()
        }
        ], {});
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