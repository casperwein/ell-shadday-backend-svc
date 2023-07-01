const express = require("express")
const dataForDashboard = require ("../../controller/others/DataForDashboard")
const router = express.Router()
// const { verify } = require("../../helper/authentication")
// const { admin } = require("../../middleware/access-controll")

router.get("/", dataForDashboard.GetDataForDashboard)

module.exports = router
