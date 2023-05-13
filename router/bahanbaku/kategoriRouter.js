const express = require("express")
const Kategori = require("../../controller/bahanbaku/kategori_bahanbakuController")
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")

const router = express.Router()

// router.use(verify, admin)

router.get("/", Kategori.GetAllKategori)
router.post("/add", Kategori.AddKategori)
router.delete("/:id", Kategori.DeleteKategori)

module.exports = router