const express = require("express")
const Reorder = require("../../controller/reorder/reorderPointController")
const { verify } = require("../../helper/authentication")
const { admin } = require("../../middleware/access-controll")
const { FindKodeBahan } = require("../../middleware/find-ID")

const router = express.Router()

// router.use(verify, admin)

router.put("/update-reorder/:id", Reorder.UpdateStatusApproveReorder)
router.get("/", Reorder.GetAllReorder)
router.get("/:kodebahan", Reorder.GetReorderByKodebahan)
    

module.exports = router