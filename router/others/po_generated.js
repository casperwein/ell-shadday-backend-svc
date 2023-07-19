const express = require("express")
const PO = require ("../../controller/others/po-generated")
const router = express.Router()
// const { verify } = require("../../helper/authentication")
// const { admin } = require("../../middleware/access-controll")

router.get("/", PO.GetDataPurchaseOrder)

module.exports = router
