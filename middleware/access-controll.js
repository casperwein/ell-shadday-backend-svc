const {invalidRequestRespon} = require("../helper/response")

const superadmin = async(req, res, next) => {
    const userRole = req.role
    const username = req.username
    const access = "superadmin"

    if (userRole !== access) {
        const ress = `${username} unauthorized`
        invalidRequestRespon(401, "unauthorized", ress, res)
    } else {
        next()
    }
}

const admin = async(req, res, next) => {
    const userRole = req.role
    const username = req.username
    const access = "admin"

    if (userRole !== access) {
        const ress = `${username} unauthorized`
        invalidRequestRespon(401, "unauthorized", ress, res)
    } else {
        next()
    }
}


module.exports = {
    superadmin,
    admin
}