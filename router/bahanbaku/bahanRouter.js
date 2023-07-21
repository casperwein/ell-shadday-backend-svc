const express = require("express")
const Bahan = require("../../controller/bahanbaku/bahanController")
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")
const { FindKodeBahan } = require("../../middleware/find-ID")

const router = express.Router()

// router.use(verify, admin)

router.get("/", Bahan.GetBahan)
router.get("/kode-bahan", Bahan.GetKodeBahan)
router.get("/filter", Bahan.GetDataWithFilter)
router.post("/add", Bahan.AddBahan)
router.get("/:kodebahan", Bahan.GetBahanByKodebahan)
router.delete("/:kodebahan", Bahan.DeleteBahanBaku)
router.put("/:kodebahan", Bahan.EditBahanBaku)


module.exports = router