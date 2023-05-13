const bcrypt = require("bcrypt");

function hashPassword(userpassword) {
    const salt = bcrypt.genSaltSync(10);
    const hash = bcrypt.hashSync(userpassword, salt);
    return hash;
}

function comparePassword(userPassword, hashedPassword) {
    return bcrypt.compareSync(userPassword, hashedPassword);
}

module.exports = {
    hashPassword,
    comparePassword,
};