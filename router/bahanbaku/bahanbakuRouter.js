const express = require("express")
const Baku = require("../../controller/bahanbaku/bahanbakuController")
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")
const { FindKodeBahan } = require("../../middleware/find-ID")
const router = express.Router()

// router.use(verify, admin)

router.post("/add", Baku.AddBahanBaku)
router.get("/", Baku.GetAllBahanBaku)
router.get("/:kodebahan", FindKodeBahan, Baku.FindBahanBakuByID)


module.exports = router