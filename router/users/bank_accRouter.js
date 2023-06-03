const express = require("express")
const BankAcc = require("../../controller/user/bank_account-controller")
const auth = require("../../helper/authentication").verify

const router = express.Router()

router.get("/", BankAcc.GetAllBankAcc)
router.get("/id/:userID", BankAcc.GetDataBankByUserID)
router.post("/", BankAcc.addBankAccount)

//TODO: please test update and delete bank account data
router.put("/:id", auth, BankAcc.updateBankAcc)
router.delete("/:id", auth, BankAcc.deleteBankAcc)

module.exports = router


