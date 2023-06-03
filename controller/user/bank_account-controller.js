const BankAcc = require("../../models/index").bank_account
const {response, resError} = require("../../helper/response")


const msgISE = "internal server error"

const GetAllBankAcc = async(req, res) => {
    await BankAcc.findAll().then(banck_acc => {
        return response(200, "SUCCESS", banck_acc, res)
    }).catch(error => {
        return resError(500, msgISE, error, res)
    })
}

const addBankAccount = async(req, res)=> {
    const userID = req.id

    const {bank_code, bank_name, no_rek, owner_name} = req.body.bank

    await BankAcc.create({
        userID, bank_code, bank_name, no_rek, owner_name
    }).then(bank_acc => {
        return response(201, "SUCCESS", bank_acc, res)
    }).catch(error => {
        return resError(500, msgISE, error, res)
    })
}

const updateBankAcc = async(req, res) => {
    const id = req.params.id
    const data = {bank_code, bank_name, no_rek, owner_name} = req.body.bank
    
    await BankAcc.update(data, {where: {id}, returning: true}).then(bank_acc => {
        return response(200, "Updated Success", bank_acc, res)
    }).catch(error => {
        console.log(error)
        return resError(500, msgISE, error, res)
    })
}

const deleteBankAcc =async(req, res) => {
    const id = req.params.id

    await BankAcc.destroy({where: {id}}).then(()=> {
        return response(200, "Deleted Succesfully", [], res)
    }).catch(error => {
        console.log(error)
        return resError(500, msgISE, error, res)
    })
}

const GetDataBankByUserID = async(req, res) => {
    const userID = req.params.userID

    await BankAcc.findOne({where: {userID}}).then( data => {
        return response(200, "Updated Success", data, res)
    }).catch(error => {
        console.log(error)
        return resError(500, msgISE, error, res)
    })
}

module.exports = {
    GetAllBankAcc,
    addBankAccount,
    updateBankAcc,
    deleteBankAcc,
    GetDataBankByUserID
}
