const express = require("express")
const BankAcc = require("../../controller/user/bank_account-controller")
const auth = require("../../helper/authentication").verify

const router = express.Router()

router.get("/", BankAcc.GetAllBankAcc)
router.post("/", auth, BankAcc.addBankAccount)

//TODO: please test update and delete bank account data
router.put("/:id", auth, BankAcc.updateBankAcc)
router.delete("/:id", auth, BankAcc.deleteBankAcc)

module.exports = router


