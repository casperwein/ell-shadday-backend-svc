const express = require("express")
const pemakaianController = require ("../../controller/produksi/pemakaianController")

const router = express.Router()
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")

router.post("/add", pemakaianController.AddPemakaianBarang)
router.get("/", pemakaianController.GetAllDataPemakaian)
router.get("/:id", pemakaianController.GetPemakaianBahanByIDPemakaian)
router.get("/produksi-pemakaian/:po_produk", pemakaianController.GetPemakaianByPOProduksi)
router.put("/edit/:id", pemakaianController.EditPemakaian)

module.exports = router