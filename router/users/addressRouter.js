const express = require("express")

const addressController = require("../../controller/user/address-controller")
const { verify } = require("../../helper/authentication")

const router = express.Router()

// router.use(verify)
router.post("/add", addressController.addUserAddress)
router.get("/", addressController.getDataAddress)   
router.get("/id/:userID", addressController.getDataAddress)   

//TODO: please test update and delete ADDRESS FUNCTION
router.put("/", addressController.updateAddress)
router.delete("/", addressController.deleteAddress)

module.exports = router
