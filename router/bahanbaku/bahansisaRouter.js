const express = require("express")
const BahanSisa = require("../../controller/bahanbaku/bahansisaController")
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")
const { FindKodeBahan } = require("../../middleware/find-ID")

const router = express.Router()

// router.use(verify, admin)

router.get("/", BahanSisa.GetAllBahanSisa)


module.exports = router