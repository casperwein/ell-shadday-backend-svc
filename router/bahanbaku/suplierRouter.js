const express = require("express")
const suplierController = require("../../controller/bahanbaku/supllierController")
const router = express.Router()
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")

router.get("/", suplierController.GetSuplierData)
router.post("/add", suplierController.AddSuplier)
router.put("/edit/:id", suplierController.UpdateSuplier)
router.delete("/:id", suplierController.DeleteSuplier)
router.get("/:id", suplierController.GetDataKategoriByID)

module.exports = router