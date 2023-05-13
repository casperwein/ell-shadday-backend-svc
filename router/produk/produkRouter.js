const express = require("express")
const produkController = require ("../../controller/produksi/produkController")

const router = express.Router()
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")

router.post("/add", produkController.AddProduk)
router.get("/", produkController.GetAllProduk)


module.exports = router