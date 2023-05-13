const express = require("express")
const suplierController = require("../../controller/bahanbaku/supllierController")
const router = express.Router()
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")

router.get("/", suplierController.GetSuplierData)
router.post("/add", suplierController.AddSuplier)

//TODO: please test update and delete Suplier FUNCTION

router.put("/", suplierController.AddSuplier)
router.delete("/", suplierController.AddSuplier)


module.exports = router